import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', {
      insertLicencia: (licencia) => ipcRenderer.invoke('insert-licencia', licencia),
      getLicencias: () => ipcRenderer.invoke('get-licencias'),
      addLicencia: (id) => ipcRenderer.invoke('generar-licencia', { id }),

      historyLicencia: (histLicencia) => ipcRenderer.invoke('complet-licencia', histLicencia),
      updateLicenciaFirst: (
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
      ) =>
        ipcRenderer.invoke('update-licencia', {
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
        }),
      getLicenciasGeneradas: (startDate, endDate) =>
        ipcRenderer.invoke('get-licenciasGeneradas', startDate, endDate),

      addUserSystem: (user) => ipcRenderer.invoke('insert-usersystem', user),
      getUsers: () => ipcRenderer.invoke('get-users'),
      // login: (username, password) => ipcRenderer.invoke('login',{username, password})
      login: (correo, password) => ipcRenderer.invoke('login', { correo, password }),
      addPermiso: (permiso) => ipcRenderer.invoke('generate-permiso', permiso),
      // generatePDF: (tipo, permiso) => ipcRenderer.invoke('generate-pdf', tipo, permiso),
      // openFile: (filePath) => ipcRenderer.invoke('open-file', filePath),
      getPermisos: () => ipcRenderer.invoke('get-permisos')
    })
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
