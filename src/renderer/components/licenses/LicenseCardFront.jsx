import React from 'react'
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
  numLicencia
}) => {
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
      {imagenSuperior && (
        <img
          src={imagenSuperior}
          alt="Imagen Superior"
          className="absolute inset-0 w-full h-full object-cover opacity-60 z-40"
        />
      )}
      {fondoImagen && (
        <img
          src={fondoImagen}
          alt="Fondo"
          className="absolute bottom-0 w-full h-2/3 object-cover opacity-90"
        />
      )}
      <div className="flex flex-col relative ">
        <img
          src={fondoMontania}
          alt="Fondo del Encabezado"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative flex flex-row h-full ml-4 mr-2">
          <div className="flex flex-row justify-start w-[96px] h-[164px]">
            {logoGuerrero && <img src={logoGuerrero} className="w-[96px] h-[164px] mt-2" />}
          </div>

          <div className="flex flex-col w-full h-[138px] items-center justify-center">
            <p className="font-calibri-bold text-[35px] text-justify leading-none">
              ESTADOS UNIDOS MEXICANOS
            </p>
            <p className="font-calibri-bold text-[28px] text-justify leading-none">
              GOBIERNO DEL ESTADO DE GUERRERO
            </p>
            <p className="font-calibri-bold text-[28.9px] text-justify leading-none">
              SECRETARÍA DE SEGURIDAD PÚBLICA
            </p>
          </div>
          <div className="flex flex-row w-[99px] h-[124px] justify-start">
            {logoGobierno && <img src={logoGobierno} className="w-[99px] h-[124px] mt-2" />}
          </div>
        </div>

        <div className="flex">
          <div className="relative w-1/3 mt-4 h-10">
            <img
              src={cintoizquierdo}
              alt="Imagen Izquierda"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative w-2/3 h-30">
            <img src={cintoDerecho} alt="Imagen Derecha" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex justify-center items-center text-white font-bold text-2xl">
              LICENCIA PARA CONDUCIR
            </div>
          </div>
        </div>
      </div>
      <div className="flex mb-1 mt-1 ml-14 h-3/6 relative">
        <div className="flex w-full relative">
          <div className="flex flex-col w-11/12 items-center justify-center">
            <div className="w-[236px] h-[328px] border-[8px] border-pantone207C">
              <img src={fotografia} className="w-[229px] h-[314px]" />
            </div>
            <div className="pl-4 flex flex-col justify-center mt-6 items-center text-center">
              <div className="mb-2">
                <p className="font-calibri-bold text-[37px]">
                  C. {nombres} {apellidoPaterno} {apellidoMaterno}
                </p>
              </div>
              <div className="mb-2">
                <p className="font-calibri-bold text-[25px]">{curp}</p>
              </div>
              <div className="mb-2">
                <p className="font-calibri-bold text-[25px]">Nacionalidad Mexicana</p>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-[60px] h-full flex items-center justify-center">
            <p className="-rotate-90 font-calibri-bold text-[20px] whitespace-nowrap text-black">
              VALIDA EN TODA LA REPÚBLICA MEXICANA
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end mb-2">
        <p className=" text-pantone207C w-1/3 justify-start flex text-[25px] font-calibri-bold">
          No. {numLicencia}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full z-40">
        <div className="flex justify-between">
          <div className="flex bg-pantone207C relative w-1/3 items-center justify-center">
            <img src={fondoBannerGro} className="absolute w-24 h-24 object-cover opacity-50 z-10" />
            <div className="flex flex-col  bg-pantone207C items-center justify-center">
              <div className="font-bold text-[80px] relative">
                <span
                  className="absolute top-0 left-0 w-full h-full text-black text-stroke"
                  style={{
                    WebkitTextStroke: '2px black',
                    color: 'transparent'
                  }}
                >
                  {tipoLicencia}
                </span>
                <span className="text-[#C19553]">{tipoLicencia}</span>
              </div>

              <div className="flex items-center">
                <span
                  className="absolute top-0 left-0 w-full h-full text-white text-stroke"
                  style={{
                    WebkitTextStroke: '2px black',
                    color: 'transparent'
                  }}
                ></span>
                <span className="text-white mt-4 text-[41px]">Tipo</span>
              </div>
              <div className=" flex font-bold text-[12px] absolute right-0 -rotate-90">
                <span className="text-[#C19553] uppercase">{licenciaDe}</span>
              </div>
            </div>
          </div>

          <div className="w-1/3">
            <div className="items-center text-center">
              <p className="font-calibri-bold text-[25px]">Vigencia:</p>{' '}
              <p className="text-[25px]">{duracion} años</p>
            </div>
            <div>
              <div className="text-center mb-4">
                <p className="font-calibri-bold text-[25px]">Expedición:</p>
                <p className="text-[25px]">{fechaExpedicion}</p>
                <p className="font-calibri-bold mt-2 mb-2 text-[25px]">Vencimiento:</p>
                <p className="text-[25px] mb-4">{fechaVencimiento}</p>
              </div>
            </div>
          </div>
          <div className="w-1/3 ">
            <div className="flex flex-col items-center bg-pantone207C w-full h-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LicenseCardFront
