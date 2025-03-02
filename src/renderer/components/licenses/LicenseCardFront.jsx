
import React, { useState } from 'react'
import licPlantilla from '../../../assets/licencia_plantilla.png'
import qr from '../../../assets/validar_licencias.png'
import logoGro from '../../../assets/logogro.png'
import logoOme from '../../../assets/logoOme.png'
import fondoImagen from '../../../assets/fondoBanner.png'
import imagenSuperior from '../../../assets/fondocapa.png'
import fondoBanner from '../../../assets/fondoBanner.png'
import fondoBannerGro from '../../../assets/fondoBannergro.png'
import cintoizquierdo from '../../../assets/cintoizquierdo.png'
import cintoDerecho from '../../../assets/cintoderecho.png'
import fondoMontania from '../../../assets/fondoMontania.png'
import logoGuerrero from '../../../assets/logoGuerrero.png'
import logoGobierno from '../../../assets/logoGobierno.png'

const LicenseCardFront = ({
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
  duracion,
  numLicencia,
  tipoTramite
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <div
      className="
        relative
        w-[637px] h-[1012px]
        overflow-hidden
        box-border
      "
      style={{ resolution: '300dpi' }}
    >
      {licPlantilla && (
        <img
          src={licPlantilla}
          alt="Plantilla frontal"
          className="absolute inset-0 w-full h-full object-cover opacity-100"
        />
      )}

      <div className="flex mb-1 mt-8 ml-14 h-3/6 relative">
        <div className="flex w-full relative">
          <div className="flex flex-col w-11/12 items-center justify-center">
            {tipoTramite && tipoTramite === '6meses-menores' ? `rtyh` : `hola`}

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <p className="font-calibri-bold text-[26px] text-right">
              {tipoTramite && tipoTramite === '6meses-menores'
                ? `PARA MAYORES DE 16 Y MENORES DE 18 AÑOS`
                : ``}
            </p>
            <br />

            <div className="w-[229px] h-[315px] border-[10px] border-pantone207C">
              <img
                // OMETEPEC:
                src={`http://192.168.1.64:3000/uploads/${fotografia}`}

                // LOCAL:
                // src={`http://192.168.0.109:3000/uploads/${fotografia}`}
                className="w-[229px] h-[295px] z-50"
                // onLoad={() => console.log('Imagen cargada')}
                onLoad={handleImageLoad}
                crossOrigin="anonymous"
              />
            </div>
            {imageLoaded ? null : <div>Cargando imagen...</div>}

            <div className="pl-4 flex flex-col justify-center mt-2 items-center text-center ">
              <div className="mb-2">
                <p className="font-calibri-bold text-[38px]">
                  C. {nombres} {apellidoPaterno} {apellidoMaterno}
                </p>
              </div>
              <div className="mb-2">
                <p className="font-calibri-bold text-[32px]">{curp}</p>
              </div>
              <div className="mb-2">
                <p className="font-calibri-bold text-[32px]">Nacionalidad Mexicana</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="absolute w-full z-50">
        <div className="flex justify-between">
          <div className="w-full">
            <div class="grid grid-col grid-cols-7 gap-0 border-[3px] border-transparent ">
              <div class="col-span-2  border-[3px] border-transparent ">
                <br />
                <br />
                <p className=" text-pantone207C  flex text-[30px] font-calibri-bold mb-10">
                  {tipoTramite && tipoTramite === '6meses-menores' ? 'APRENDIZ' : ''}
                </p>
              </div>

              <div class="col-span-3  border-[3px] border-transparent "></div>

              <div class="col-span-2  border-[3px] border-transparent ">
                <br />
                <br />
                <div className="flex  mb-10 z-50">
                  <p className=" text-pantone207C  flex text-[30px] font-calibri-bold mb-10">
                    No. {numLicencia}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute w-full z-40">
        <div className="flex justify-between">
          <div className="w-full">
            <div class="grid grid-flow-col grid-cols-7 gap-1.5 border-[3px] border-transparent ">
              <div class="col-span-2 row-span-7 border-[3px] border-transparent ">
                <div class="grid grid-flow-col grid-cols-4 gap-4 h-full w-full">
                  <div class="row-span-5 col-span-3 border-[3px] border-transparent   m-0 leading-none">
                    <br />
                    <div className="font-bold text-[80px] relative">
                      <p className="text-center text-[120px] outline-solid text-[#C19553]">
                        {tipoLicencia}
                      </p>
                    </div>
                  </div>
                  <div class=" border-[3px] border-transparent   m-0 leading-none">
                    <br />
                    <br />
                    <br />
                  </div>
                  <div class=" border-[3px] border-transparent   m-0 leading-none">
                    <br />
                    <br />
                  </div>
                  <div class=" border-[3px] border-transparent   m-0 leading-none -rotate-90">
                    <br />
                    <span className="text-black uppercase font-calibri-bold text-[25px] flex items-end justify-center mb-14 mr-14  ">
                      <p className="scale-y-150 ">{licenciaDe}</p>
                    </span>
                  </div>
                  <div class=" border-[3px] border-transparent  m-0 leading-none"></div>
                  <div class=" border-[3px] border-transparent   m-0 leading-none"></div>
                </div>
              </div>
              <br />
              <br />
              <div class="col-span-3 border-[3px] border-transparent   m-0 leading-3">
                <br />
                <p className=" text-center font-calibri-bold text-[30px] leading-3">
                  Vigencia:
                </p>{' '}
              </div>
              <div className="col-span-3 border-[3px] border-transparent m-0 leading-3 text-[30px] text-center">
                {tipoTramite && tipoTramite === '6meses-menores'
                  ? `${duracion}`
                  : `${duracion} años`}
              </div>

              <div class="col-span-3 border-[3px] border-transparent   m-0 leading-3">
                <p className="font-calibri-bold text-[30px] text-center leading-3">Expedición:</p>{' '}
              </div>
              <div class="col-span-3 border-[3px] border-transparent   m-0 leading-3 text-[30px] text-center">
                {fechaExpedicion}
              </div>
              <div class="col-span-3 border-[3px] border-transparent   m-0 leading-3">
                <p className="font-calibri-bold text-[30px] text-center leading-3 ">Vencimiento:</p>{' '}
              </div>
              <div class="col-span-3 border-[3px] border-transparent   mb-4 leading-3 text-[30px] text-center">
                {fechaVencimiento}
              </div>

              <div class="col-span-2 row-span-7 border-[3px] border-transparent ">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <img src={qr} className="w-[180px] h-[180px] m-1.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LicenseCardFront
