import { app, shell, BrowserWindow, ipcMain, protocol } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const path = require('path')
const pool = require('../../db')
const sharp = require('sharp')
import fs from 'fs/promises'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false, // 🔹 Oculta la ventana hasta que esté lista (para evitar parpadeos)
    autoHideMenuBar: true, // 🔹 Oculta la barra de menú
    titleBarStyle: 'default', // 🔹 Mantiene la barra de título con los botones de minimizar, maximizar y cerrar
    fullscreenable: true, // 🔹 Permite que el usuario active/desactive fullscreen
    maximizable: true, // 🔹 Permite maximizar la ventana
    resizable: true, // 🔹 Permite cambiar el tamaño de la ventana
    titleBarOverlay: {
      color: '#ffffff',
      symbolColor: '#ab0033',
      height: 30
    },

    icon: null,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true
    }

    // ...WindowOptions
  })

  mainWindow.setIcon(icon)

  mainWindow.on('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()

    // if (!is.dev) {
    //   mainWindow.webContents.openDevTools()
    // }
    // mainWindow.webContents.openDevTools({ mode: 'detach' })
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const imageDir = path.join(app.getAppPath('../fotografias'), 'fotografias')
  const imageDirFirmas = path.join(app.getAppPath('../firmas'), 'firmas')
  // IPC

  ipcMain.handle('login', async (event, { correo, password }) => {
    let connection

    try {
      connection = await pool.getConnection()
      const [rows] = await connection.execute(
        'SELECT * FROM usuarios WHERE correo = ? AND password = ?',
        [correo, password]
      )
      if (rows.length > 0) {
        console.log('Usuario encontrado:', rows[0])
        return rows[0]
      } else {
        console.log('Usuario o contraseña incorrectos')
        return null
      }
    } catch (error) {
      console.error('Error inesperado en login:', error)
      return null
    } finally {
      if (connection) {
        connection.release()
      }
    }
  })

  ipcMain.handle('generate-permiso', async (event, permiso) => {
    const connection = await pool.getConnection()

    try {
      await connection.beginTransaction() // Iniciar transacción

      await connection.execute(`
        UPDATE secuencias SET valor = valor + 1 WHERE nombre ='placas'
      `)

      const [[{ valor }]] = await connection.execute(`
          SELECT valor FROM secuencias WHERE nombre = 'placas'
        `)

      const folioUnico = `AAA${String(valor).padStart(4, '0')}`
      const status = 'Vigente'

      const permisoStore = { ...permiso, folioUnico: folioUnico, status: status }
      // Insertar en MySQL
      const sql = `
     INSERT INTO placas (
       folioUnico, fechaExpedicion, fechaVencimiento, numSerie, numMotor, marca, yearModelo,
        color, rfcSolicitante, domicilio, nombres, apellidoPaterno, apellidoMaterno, importe, status, rutaIne, rutaEstSanguineo, rutaConstSitFiscal, idUser
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
   `
      const values = [
        permisoStore.folioUnico,
        permisoStore.fechaExpedicion,
        permisoStore.fechaVencimiento,
        permisoStore.numSerie,
        permisoStore.numMotor,
        permisoStore.marca,
        permisoStore.yearModelo,
        permisoStore.color,
        permisoStore.rfcSolicitante,
        permisoStore.domicilio,
        permisoStore.nombres,
        permisoStore.apellidoPaterno,
        permisoStore.apellidoMaterno,
        permisoStore.importe,
        permisoStore.status,
        permisoStore.rutaIne,
        permisoStore.rutaEstSanguineo,
        permisoStore.rutaConstSitFiscal,
        permisoStore.idUser
      ]

      const [rows, fields] = await connection.execute(sql, values)
      await connection.commit()

      console.log('Fields:', fields)
      console.log('Rows:', rows)

      return { success: true, id: rows.insertId }
    } catch (error) {
      await connection.rollback()
      console.error('Error al generar permiso:', error)
      throw error
    } finally {
      connection.release()
    }
  })

  ipcMain.handle('get-permisos', async () => {
    try {
      const sql = `
      SELECT id, folioUnico, fechaExpedicion, fechaVencimiento, numSerie, numMotor, marca, yearModelo, color, rfcSolicitante, domicilio, nombres, apellidoPaterno, apellidoMaterno, importe, status
      FROM placas`
      const [rows, fields] = await pool.execute(sql)

      return { success: true, data: rows }
    } catch (error) {
      console.error('Error al obtener permisos:', error)
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('generar-licencia', async (event, { id }) => {
    if (!id) {
      throw new Error('El ID de la licencia es requerido para generar numLicencia.')
    }
    const connection = await pool.getConnection()
    try {
      await connection.beginTransaction() // Iniciar transacción

      // Verificar si la licencia ya tiene un numLicencia asignado
      const [existing] = await connection.execute(
        'SELECT numLicencia FROM licencias WHERE id = ?',
        [id]
      )

      if (existing.length === 0) {
        throw new Error('No se encontró la licencia con el ID proporcionado.')
      }

      if (existing[0].numLicencia) {
        throw new Error('Esta licencia ya tiene un número de licencia asignado.')
      }

      // Genera numLicencia basado en el id
      const numLicencia = `AA${String(id).padStart(4, '0')}` // Formato: "AA-0001"

      // Asegurar que numLicencia sea único
      const [duplicate] = await connection.execute(
        'SELECT id FROM licencias WHERE numLicencia = ?',
        [numLicencia]
      )

      if (duplicate.length > 0) {
        throw new Error('El número de licencia generado ya existe. Por favor, intente nuevamente.')
      }

      // Actualiza la licencia con numLicencia
      const updateQuery = `UPDATE licencias SET numLicencia = ? WHERE id = ?`
      await connection.execute(updateQuery, [numLicencia, id])

      await connection.commit() // Confirmar transacción

      return numLicencia // Retornar el número de licencia al renderer
    } catch (error) {
      await connection.rollback() // Revertir transacción en caso de error
      console.error('Error al generar numLicencia:', error)
      throw error // Propagar el error al renderer
    } finally {
      connection.release() // Liberar la conexión de vuelta al pool
    }
  })

  ipcMain.handle(
    'update-licencia',
    async (
      event,
      {
        id,
        status,
        fechaExpedicion,
        fechaVencimiento,
        licenciaDe,
        tipoLicencia,
        idPersona,
        costo,
        descPorcentaje,
        costoFinal,
        tipoTramite,
        duracion,
        responsable
      }
    ) => {
      if (!id) {
        throw new Error('El ID de la licencia es requerido')
      }
      const connection = await pool.getConnection()
      try {
        await connection.beginTransaction() // Iniciar transacción

        // Actualiza la licencia con numLicencia
        const updateQuery = `UPDATE licencias SET status=?, fechaExpedicion = ?, fechaVencimiento=?, licenciaDe=?,tipoLicencia=?, idPersona=?, costo=?, descPorcentaje=?, costoFinal=?, tipoTramite=?,duracion=?, responsable=?  WHERE id = ?`
        await connection.execute(updateQuery, [
          status,
          fechaExpedicion,
          fechaVencimiento,
          licenciaDe,
          tipoLicencia,
          idPersona,
          costo,
          descPorcentaje,
          costoFinal,
          tipoTramite,
          duracion,
          responsable,
          id
        ])

        await connection.commit() // Confirmar transacción
      } catch (error) {
        await connection.rollback() // Revertir transacción en caso de error
        console.error('Error al actualizar licencia:', error)
        throw error // Propagar el error al renderer
      } finally {
        connection.release() // Liberar la conexión de vuelta al pool
      }
    }
  )

  ipcMain.handle('insert-licencia', async (event, licencia) => {
    try {
      const sql = `
     INSERT INTO licencias (
       nombres, apellidoPaterno, apellidoMaterno, telefono, sexo, fechaNacimiento,
       curp, rfc, tipoSangre, alergias, domicilio, contactoEmergencia, donadorOrganos, restricMedica, status, fotografia,
       firma, fechaExpedicion, fechaVencimiento, licenciaDe, tipoLicencia, numLicencia, idPersona, costo, tipoTramite, duracion, 
       rutaIne, rutaEstSanguineo, condonacion, observacionCondona
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
   `
      const values = [
        licencia.nombres,
        licencia.apellidoPaterno,
        licencia.apellidoMaterno,
        licencia.telefono,
        licencia.sexo,
        licencia.fechaNacimiento,
        licencia.curp,
        licencia.rfc,
        licencia.tipoSangre,
        licencia.alergias,
        licencia.domicilio,
        licencia.contactoEmergencia,
        licencia.donadorOrganos,
        licencia.restricMedica,
        licencia.status,
        licencia.fotografia, // Ruta del archivo
        licencia.firma,
        licencia.fechaExpedicion || null,
        licencia.fechaVencimiento || null,
        licencia.licenciaDe || null,
        licencia.tipoLicencia || null,
        licencia.numLicencia || null,
        licencia.idPersona || null,
        licencia.costo || null,
        licencia.tipoTramite || null,
        licencia.duracion || null,
        licencia.rutaIne || null,
        licencia.rutaEstSanguineo || null,
        licencia.condonacion || null,
        licencia.observacionCondona || null
      ]

      const [rows, fields] = await pool.execute(sql, values)
      console.log('Fields:', fields)
      console.log('Rows:', rows)

      return { success: true, id: rows.insertId }
    } catch (error) {
      console.log('Error al generar licencia', error)
      return { success: false, error: error.message }
    }
  })
  let rutasRelativaFotografia = ''
  let rutasRelativaFirma = ''
  let rutaReltIne = ''
  let rutaReltEstSanguineo = ''

  ipcMain.handle('get-licencias', async () => {
    try {
      const sql = `
      SELECT id, nombres, apellidoPaterno, apellidoMaterno, telefono, sexo, fechaNacimiento,
             curp, rfc, tipoSangre, alergias, domicilio,
             contactoEmergencia, donadorOrganos, restricMedica, status, fotografia,
             created_at, updated_at, firma, fechaExpedicion, fechaVencimiento, licenciaDe, tipoLicencia, numLicencia, costo, tipoTramite, 
             duracion, rutaIne, rutaEstSanguineo, condonacion, observacionCondona, responsable
      FROM licencias`
      const [rows, fields] = await pool.execute(sql)

      const processedRows = await Promise.all(
        rows.map(async (row) => {
          rutasRelativaFotografia = row.fotografia
          rutasRelativaFirma = row.firma
          rutaReltIne = row.rutaIne
          rutaReltEstSanguineo = row.rutaEstSanguineo
          // if (row.fotografia && fs.existsSync(row.fotografia)) {
          if (row.fotografia && (await fs.stat(row.fotografia).catch(() => false))) {
            console.log('Ruta de la fotografia:', row.fotografia)

            // const imageBuffer = fs.readFileSync(row.fotografia)
            const imageBuffer = await fs.readFile(row.fotografia)
            const mimeType =
              path.extname(row.fotografia).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg'
            // const base64Image = `data:${mimeType};base64,${imageBuffer.toString('base64')}`
            row.fotografia = `data:${mimeType};base64,${imageBuffer.toString('base64')}`

            // return { ...row, fotografia: base64Image }
          }

          // if (row.firma && fs.existsSync(row.firma)) {
          if (row.firma && (await fs.stat(row.firma).catch(() => false))) {
            console.log('Ruta de la firma:', row.firma)

            // const firmaBuffer = fs.readFileSync(row.firma)
            const firmaBuffer = await fs.readFile(row.firma)
            const mimeTypeFirma =
              path.extname(row.firma).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg'
            // const base64ImageFirma = `data:${mimeTypeFirma};base64,${firmaBuffer.toString('base64')}`
            row.firma = `data:${mimeTypeFirma};base64,${firmaBuffer.toString('base64')}`

            // return { ...row, firma: base64ImageFirma }
          }

          return row
        })
      )

      return { success: true, data: processedRows }
    } catch (error) {
      console.error('Error al obtener licencias:', error)
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('complet-licencia', async (event, licenciaCompleta) => {
    try {
      const licenciaToStoreGenerated = {
        ...licenciaCompleta,
        fotografia: rutasRelativaFotografia,
        firma: rutasRelativaFirma,
        rutaIne: rutaReltIne,
        rutaEstSanguineo: rutaReltEstSanguineo
      }
      console.log('LICENCIA TO STORE:', licenciaToStoreGenerated)

      // Insertar en MySQL
      const sql = `
     INSERT INTO licenciasgeneradas (
       nombres, apellidoPaterno, apellidoMaterno, telefono, sexo, fechaNacimiento,
       curp, rfc, tipoSangre, alergias, domicilio, contactoEmergencia, donadorOrganos, restricMedica, status, fotografia,
       firma, fechaExpedicion, fechaVencimiento, licenciaDe, tipoLicencia, numLicencia, idPersona, costo, descPorcentaje, costoFinal, tipoTramite, duracion, 
       rutaIne, rutaEstSanguineo, condonacion, observacionCondona, responsable, idUsuario
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
   `
      const values = [
        licenciaToStoreGenerated.nombres,
        licenciaToStoreGenerated.apellidoPaterno,
        licenciaToStoreGenerated.apellidoMaterno,
        licenciaToStoreGenerated.telefono,
        licenciaToStoreGenerated.sexo,
        licenciaToStoreGenerated.fechaNacimiento,
        licenciaToStoreGenerated.curp,
        licenciaToStoreGenerated.rfc,
        licenciaToStoreGenerated.tipoSangre,
        licenciaToStoreGenerated.alergias,
        licenciaToStoreGenerated.domicilio,
        licenciaToStoreGenerated.contactoEmergencia,
        licenciaToStoreGenerated.donadorOrganos,
        licenciaToStoreGenerated.restricMedica,
        licenciaToStoreGenerated.status,
        licenciaToStoreGenerated.fotografia, // Ruta del archivo
        licenciaToStoreGenerated.firma,
        licenciaToStoreGenerated.fechaExpedicion,
        licenciaToStoreGenerated.fechaVencimiento,
        licenciaToStoreGenerated.licenciaDe,
        licenciaToStoreGenerated.tipoLicencia,
        licenciaToStoreGenerated.numLicencia,
        licenciaToStoreGenerated.idPersona,
        licenciaToStoreGenerated.costo,
        licenciaToStoreGenerated.descPorcentaje,
        licenciaToStoreGenerated.costoFinal,
        licenciaToStoreGenerated.tipoTramite,
        licenciaToStoreGenerated.duracion,
        licenciaToStoreGenerated.rutaIne,
        licenciaToStoreGenerated.rutaEstSanguineo,
        licenciaToStoreGenerated.condonacion,
        licenciaToStoreGenerated.observacionCondona,
        licenciaToStoreGenerated.responsable,
        licenciaToStoreGenerated.idUsuario
      ]

      const [rows, fields] = await pool.execute(sql, values)
      console.log('Fields:', fields)
      console.log('Rows:', rows)

      return { success: true, id: rows.insertId }
    } catch (error) {
      console.log('Error al generar licencia', error)
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('insert-usersystem', async (event, user) => {
    try {
      if (user.rolUsuario !== 'administrador') {
        return {
          success: false,
          error: 'Acceso denegado: Solo los administradores pueden agregar usuarios.'
        }
      }

      const sql = `
     INSERT INTO usuarios (
       nombre, apellidoPaterno, apellidoMaterno, curp, numEmpleado, rfc, edad, domicilio, genero, rolUsuario, correo, password
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
   `
      const values = [
        user.nombre,
        user.apellidoPaterno,
        user.apellidoMaterno,
        user.curp,
        user.numEmpleado,
        user.rfc,
        user.edad,
        user.domicilio,
        user.genero,
        user.rolUsuario,
        user.correo,
        user.password
      ]

      const [rows, fields] = await pool.execute(sql, values)
      console.log('Fields:', fields)
      console.log('Rows:', rows)

      return { success: true, id: rows.insertId }
    } catch (error) {
      console.log('Error al agregar al usuario', error)
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('get-users', async () => {
    try {
      const sql = `
      SELECT id, nombre, apellidoPaterno, apellidoMaterno, curp, numEmpleado, rfc, edad, domicilio, genero, rolUsuario, correo
      FROM usuarios`

      const [rows, fields] = await pool.execute(sql)
      console.log(rows)

      // return rows;

      return { success: true, data: rows }
    } catch (error) {
      console.error('Error al obtener licencias:', error)
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('get-licenciasGeneradas', async (event, startDate, endDate) => {
    try {
      const sql = `
       SELECT 
  l.numLicencia AS NumeroLicencia,
  CONCAT(l.nombres, ' ', l.apellidoPaterno, ' ', l.apellidoMaterno) AS Nombre,
  l.fechaExpedicion AS FechaExpedicion,
  CONCAT(u.nombre, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno) AS ExpedidaPor,
  l.condonacion AS Condonacion,
  l.observacionCondona AS Observacion,
  l.costo AS Costo
FROM licenciasgeneradas AS l
JOIN usuarios AS u ON l.idUsuario = u.id
WHERE l.fechaExpedicion BETWEEN ? AND ?;
    `

      // Ejecutamos la consulta usando los parámetros de fecha.
      const [rows] = await pool.execute(sql, [startDate, endDate])
      console.log(rows)
      console.log('Datos recibidos de la base:', rows)
      return { success: true, data: rows }
    } catch (error) {
      console.error('Error al obtener licencias:', error)
      return { success: false, error: error.message }
    }
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
