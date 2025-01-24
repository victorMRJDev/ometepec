import React, { useState, useEffect } from 'react'

import logoGro from '../../../assets/recursosLicencia/frente/png/logoGuerrero.png'
import logoOme from '../../../assets/recursosLicencia/frente/png/logoOmetepec.png'
import mask from '../../../assets/recursosLicencia/frente/png/mask.png'
import mountain from '../../../assets/recursosLicencia/frente/png/montain.png'
import iglesia from '../../../assets/recursosLicencia/frente/png/iglesia.png'

import bannerUno from '../../../assets/recursosLicencia/frente/png/bannerUno.png'
import bannerDos from '../../../assets/recursosLicencia/frente/png/bannerDos.png'
import bannerTres from '../../../assets/recursosLicencia/frente/png/bannerTres.png'
import bannerCuatro from '../../../assets/recursosLicencia/frente/png/bannerCuatro.png'

import flor from '../../../assets/recursosLicencia/tracera/png/flor.png'

const LicenseCard = ({
  id,
  nombres,
  apellidoPaterno,
  apellidoMaterno,
  telefono,
  sexo,
  fechaNacimiento,
  curp,
  rfc,
  tipoSangre,
  alergias,
  domicilio,
  contactoEmergencia,
  donadorOrganos,
  restricMedica,
  status,
  fotografia,
  created_at,
  updated_at,
  firma,
  fechaExpedicion,
  fechaVencimiento,
  licenciaDe,
  tipoLicencia,
  numLicencia
  // props
}) => {
  // console.log('Props recibidas', props)
  return (
    <div className="flex space-x-4">
      {/* ======================== FRONTAL ======================== */}
      <div
        className="
          relative w-[325px] h-[205px]
          overflow-hidden
          border border-gray-300
        "
      >
        <img src={iglesia} className="absolute inset-0 w-full h-full object-cover" />

        <img
          src={mountain}
          className="absolute bottom-0 left-0 w-44 h-24 object-cover mix-blend-multiply"
        />

        <img src={mask} alt="Fondo Cover" className="absolute inset-0 w-full h-full object-cover" />

        <div className="relative w-full h-full flex flex-col">
          <div className="flex justify-between items-center px-2 py-1">
            <img src={logoGro} alt="Logo Izquierdo" className="w-16 h-auto" />

            <img src={logoOme} alt="Logo Derecho" className="w-16 h-auto" />
          </div>

          <div className="flex flex-row px-2">
            <div className="flex-shrink-0 mr-2">
              <img src={fotografia} className="w-16 h-20 border border-gray-500" />
              <div className="flex items-center mt-5">
                <strong className="mr-1 font-calibri-bold text-[1rem]">Tipo:</strong>
                <div className="border border-black px-1">
                  <span className="font-calibri-bold text-[1.5rem]">{tipoLicencia}</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] leading-tight space-y-1 justify-center">
              <p className="font-calibri-regular leading-tight mb-0">
                <strong className="font-calibri-bold">NOMBRE: </strong>
                {nombres} {apellidoPaterno} {apellidoMaterno}
              </p>
              <p className="font-calibri-regular">
                <strong className="font-calibri-bold">LICENCIA DE: </strong> {licenciaDe}
              </p>
              <p>
                <strong className="font-calibri-bold">EXPEDICIÓN: </strong> {fechaExpedicion}
              </p>
              <p className="font-calibri-regular">
                <strong className="font-calibri-bold">LICENCIA NUM: </strong> {numLicencia}
              </p>
            </div>

            <div className="flex ml-6  justify-center items-center">
              <p className="text-[10px]">
                <strong className="font-calibri-bold">Vencimiento: </strong> <p></p>{' '}
                {fechaVencimiento}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <p className="text-center text-[10px] font-calibri-bold">
              Subsecretario de Tránsito y Movilidad
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-6">
            <img src={bannerDos} alt="Footer Gobierno" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* PARTE TRASERA */}

      <div
        className="
          relative w-[325px] h-[205px]
          overflow-hidden
          border border-gray-300
        "
      >
        <div className="relative w-full h-full flex flex-col p-2 text-[8px]">
          <img
            src={mask}
            alt="Fondo Cover"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="flex justify-end">
            <img src={logoOme} alt="Logo Superior Derecha" className="w-16 h-auto" />
          </div>

          <div className="flex flex-row mt-1 gap-4">
            <div className="space-y-1 w-1/2">
              <p className="text-black">
                <strong>CURP:</strong> {curp}
              </p>
              <p>
                <strong>RFC:</strong> {rfc}
              </p>
              <p>
                <strong>Domicilio:</strong> {domicilio}
              </p>
            </div>

            <div className="space-y-1 w-1/2">
              <p>
                <strong>Grupo Sanguíneo:</strong> {tipoSangre}
              </p>
              <p>
                <strong>Restricciones Médicas:</strong> {restricMedica}
              </p>
              <p>
                <strong>Donador de Órganos:</strong> {donadorOrganos}
              </p>
              <p>
                <strong>Alergias:</strong> {alergias}
              </p>
              <p>
                <strong>Contacto de Emergencia:</strong> {contactoEmergencia}
              </p>
            </div>
          </div>

          <div className="relative flex items-center justify-center bg-yellow-500">
            <img src={flor} className="absolute left-0 w-28 h-auto object-cover opacity-90" />
            <img src={logoGro} className="absolute left-0 top-4 w-28 h-auto" />
          </div>

          <div className='mt-6'>
            {firma && (
              <div className="flex justify-center">
                <img src={firma} className="w-16 h-auto border-b border-gray-300 mt-1" />
              </div>
            )}
            <p className="text-[7px] z-10 text-center">FIRMA DEL INTERESADO</p>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-3">
            <img src={bannerDos} alt="Footer Gobierno" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LicenseCard
