import { app, shell, BrowserWindow, ipcMain, protocol } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
// import icon from '../../resources/icon.png?asset'
import icon from '../../resources/icon.jpg?asset'
const path = require('path')
// const fs = require('fs')
const pool = require('../../db')
const sharp = require('sharp')
import fs from 'fs/promises'
// const PDFDocument = require('pdfkit')
// const SftpClient = require('ssh2-sftp-client')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    titleBarStyle: 'hiddenInset',
    // show: false,
    autoHideMenuBar: true,
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
  })

  
  mainWindow.setIcon(icon)
  
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const imageDir = path.join(app.getAppPath('../fotografias'), 'fotografias')
  const imageDirFirmas = path.join(app.getAppPath('../firmas'), 'firmas')

  // if (!fs.existsSync(imageDir)) {
  //   fs.mkdirSync(imageDir, { recursive: true })
  // }
  // const imageDirStat = await fs.stat(imageDir).catch(() => false)
  // if (!imageDirStat) {
  //   await fs.mkdir(imageDir, { recursive: true })
  // }

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
        color, rfcSolicitante, domicilio, nombres, apellidoPaterno, apellidoMaterno, importe, status
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        permisoStore.status
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
        tipoTramite,
        duracion
      }
    ) => {
      if (!id) {
        throw new Error('El ID de la licencia es requerido')
      }
      const connection = await pool.getConnection()
      try {
        await connection.beginTransaction() // Iniciar transacción

        // Actualiza la licencia con numLicencia
        const updateQuery = `UPDATE licencias SET status=?, fechaExpedicion = ?, fechaVencimiento=?, licenciaDe=?,tipoLicencia=?, idPersona=?, costo=?, tipoTramite=?,duracion=?  WHERE id = ?`
        await connection.execute(updateQuery, [
          status,
          fechaExpedicion,
          fechaVencimiento,
          licenciaDe,
          tipoLicencia,
          idPersona,
          costo,
          tipoTramite,
          duracion,
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
    // const sftp = new SftpClient()

    try {
      // await sftp.connect({
      //   host:'192.168.0.117',
      //   port: port || 22,
      //   username: 'OmeTeam',
      //   password: 'Ome1234'
      // })

      let fotoPath = null
      let fotoFirm = null

      if (licencia.fotografia) {
        const mimeMatch = licencia.fotografia.match(/^data:(image\/\w+);base64,/)
        if (mimeMatch && ['image/jpeg', 'image/png'].includes(mimeMatch[1])) {
          const mimeType = mimeMatch[1]
          const extension = mimeType.split('/')[1]

          // Validar y sanitizar la CURP
          const curp = licencia.curp.toUpperCase().trim()
          const sanitizedCurp = curp.replace(/[^A-Z0-9]/g, '')

          // Nombre de archivo basado en CURP
          const uniqueName = `${sanitizedCurp}.${extension}`
          fotoPath = path.join(imageDir, uniqueName)

          const buffer = Buffer.from(
            licencia.fotografia.replace(/^data:image\/\w+;base64,/, ''),
            'base64'
          )

          // Optimizar la imagen
          const optimizedBuffer = await sharp(buffer)
            .resize(300, 300) // Ajusta según tus necesidades
            .toFormat(extension)
            .toBuffer()

          // Guardar la imagen en el sistema de archivos
          await fs.writeFile(fotoPath, optimizedBuffer)
          // const fotoPathNormalized = fotoPath.replace(/\\/g, '/')
          // fotoUrl = `file:///${fotoPathNormalized}`
        } else {
          throw new Error('Tipo de archivo de fotografía no permitido.')
        }
      }

      if (licencia.firma) {
        const mimeMatchFirm = licencia.firma.match(/^data:(image\/\w+);base64,/)
        if (mimeMatchFirm && ['image/png', 'image/jpeg'].includes(mimeMatchFirm[1])) {
          const mimeTypeFirm = mimeMatchFirm[1]
          const extensionFirm = mimeTypeFirm.split('/')[1]

          // Validar y sanitizar la CURP
          const curpF = licencia.curp.toUpperCase().trim()
          const sanitizedCurpF = curpF.replace(/[^A-Z0-9]/g, '')

          // Nombre de archivo basado en CURP
          const uniqueNameFirm = `${sanitizedCurpF}.${extensionFirm}`
          fotoFirm = path.join(imageDirFirmas, uniqueNameFirm)

          const bufferFirm = Buffer.from(
            licencia.firma.replace(/^data:image\/\w+;base64,/, ''),
            'base64'
          )

          // Optimizar la imagen
          const optimizedBufferFirm = await sharp(bufferFirm)
            // .resize(400, 150) // Ajusta según tus necesidades
            .toFormat(extensionFirm)
            .toBuffer()

          // Guardar la imagen en el sistema de archivos
          await fs.writeFile(fotoFirm, optimizedBufferFirm)
          // const fotoPathNormalized = fotoPath.replace(/\\/g, '/')
          // fotoUrl = `file:///${fotoPathNormalized}`
        } else {
          throw new Error('Tipo de archivo de firma no permitido.')
        }
      }

      // Modificar la licencia para almacenar la ruta de la fotografía
      const licenciaToStore = { ...licencia, fotografia: fotoPath, firma: fotoFirm }
      // Insertar en MySQL
      const sql = `
     INSERT INTO licencias (
       nombres, apellidoPaterno, apellidoMaterno, telefono, sexo, fechaNacimiento,
       curp, rfc, tipoSangre, alergias, domicilio, contactoEmergencia, donadorOrganos, restricMedica, status, fotografia,
       firma, fechaExpedicion, fechaVencimiento, licenciaDe, tipoLicencia, numLicencia, idPersona, costo, tipoTramite, duracion
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
   `
      const values = [
        licenciaToStore.nombres,
        licenciaToStore.apellidoPaterno,
        licenciaToStore.apellidoMaterno,
        licenciaToStore.telefono,
        licenciaToStore.sexo,
        licenciaToStore.fechaNacimiento,
        licenciaToStore.curp,
        licenciaToStore.rfc,
        licenciaToStore.tipoSangre,
        licenciaToStore.alergias,
        licenciaToStore.domicilio,
        licenciaToStore.contactoEmergencia,
        licenciaToStore.donadorOrganos,
        licenciaToStore.restricMedica,
        licenciaToStore.status,
        licenciaToStore.fotografia, // Ruta del archivo
        licenciaToStore.firma,
        licenciaToStore.fechaExpedicion || null,
        licenciaToStore.fechaVencimiento || null,
        licenciaToStore.licenciaDe || null,
        licenciaToStore.tipoLicencia || null,
        licenciaToStore.numLicencia || null,
        licenciaToStore.idPersona || null,
        licenciaToStore.costo || null,
        licenciaToStore.tipoTramite || null,
        licenciaToStore.duracion || null
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

  ipcMain.handle('get-licencias', async () => {
    try {
      const sql = `
      SELECT id, nombres, apellidoPaterno, apellidoMaterno, telefono, sexo, fechaNacimiento,
             curp, rfc, tipoSangre, alergias, domicilio,
             contactoEmergencia, donadorOrganos, restricMedica, status, fotografia,
             created_at, updated_at, firma, fechaExpedicion, fechaVencimiento, licenciaDe, tipoLicencia, numLicencia, costo, tipoTramite, duracion
      FROM licencias`
      const [rows, fields] = await pool.execute(sql)

      const processedRows = await Promise.all(
        rows.map(async (row) => {
          // if (row.fotografia && fs.existsSync(row.fotografia)) {
          if (row.fotografia && (await fs.stat(row.fotografia).catch(() => false))) {
            // console.log('Ruta de la fotografia:', row.fotografia)

            rutasRelativaFotografia = row.fotografia
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
            // console.log('Ruta de la firma:', row.firma)
            rutasRelativaFirma = row.firma

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
        firma: rutasRelativaFirma
      }
      console.log('LICENCIA TO STORE:', licenciaToStoreGenerated)

      // Insertar en MySQL
      const sql = `
     INSERT INTO licenciasgeneradas (
       nombres, apellidoPaterno, apellidoMaterno, telefono, sexo, fechaNacimiento,
       curp, rfc, tipoSangre, alergias, domicilio, contactoEmergencia, donadorOrganos, restricMedica, status, fotografia,
       firma, fechaExpedicion, fechaVencimiento, licenciaDe, tipoLicencia, numLicencia, idPersona, costo, tipoTramite, duracion
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        licenciaToStoreGenerated.tipoTramite,
        licenciaToStoreGenerated.duracion
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

  ipcMain.handle('insert-usersystem', async (event, user, currentUser) => {
    try {
      if (currentUser.rolUsuario !== 'Administrador') {
        return {
          success: false,
          error: 'Acceso denegado: Solo los administradores pueden agregar usuarios.'
        }
      }

      const sql = `
     INSERT INTO licencias (
       nombre, apellidoPaterno, apellidoMaterno, curp, numEmpleado, rfc, edad, domicilio, genero, rolUsuario
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
   `
      const values = [
        licenciaToStore.nombre,
        licenciaToStore.apellidoPaterno,
        licenciaToStore.apellidoMaterno,
        licenciaToStore.curp,
        licenciaToStore.numEmpleado,
        licenciaToStore.rfc,
        licenciaToStore.edad,
        licenciaToStore.rfc,
        licenciaToStore.domicilio,
        licenciaToStore.genero,
        licenciaToStore.rolUsuario
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

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
