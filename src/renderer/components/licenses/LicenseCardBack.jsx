import React from 'react'
import licPlantillaBack from '../../../assets/licencia_atras_plantilla.png'

import mask from '../../../assets/recursosLicencia/frente/png/mask.png'
import bannerDos from '../../../assets/recursosLicencia/frente/png/bannerDos.png'
import flor from '../../../assets/recursosLicencia/tracera/png/flor.png'
import logoGro from '../../../assets/recursosLicencia/frente/png/logoGuerrero.png'
import fondoBannerGro from '../../../assets/fondoBannergro.png'
import cintoizquierdo from '../../../assets/cintoizquierdo.png'
import cintoDerecho from '../../../assets/cintoderecho.png'
import fondoMontania from '../../../assets/fondoMontania.png'
import logoOme from '../../../assets/logoOme.png'
import selloOme from '../../../assets/selloome.png'
import firmadirector from '../../../assets/firmadirector.png'
import logoIzquierdo from '../../../assets/logoiztras.png'

import imagenSuperior from '../../../assets/fondocapa.png'

const LicenseCardBack = ({
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
      {licPlantillaBack && (
        <img
          src={licPlantillaBack}
          alt="Plantilla tracera"
          className="absolute inset-0 w-full h-full object-cover opacity-100 z-0"
        />
      )}

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

      <div className="absolute w-full z-50">
        <div className="flex justify-between">
          <div className="w-full">
            <div class="grid grid-flow-col grid-rows-14 grid-cols-14 gap-1 border-transparent border-[3px] m-0">
              <div class="col-span-1 row-span-14  border-transparent border-[3px]"></div>
              <div class="col-span-12 row-span-14 border-transparent border-[3px]">
                <div class="grid grid-cols-1 gap-.5">
                  <div class="">
                    <p className="font-calibri-bold text-[25px] leading-none">Domicilio</p>
                    <p className="font-calibri-regular text-[23px]">{domicilio}</p>
                  </div>
                  <div class="">
                    <p className="font-calibri-bold text-[25px] leading-none">RFC</p>
                    <p className="font-calibri-regular text-[23px]">{rfc}</p>
                  </div>
                  <div class="">
                    <p className="font-calibri-bold text-[25px] leading-none">
                      Restricciones Médicas
                    </p>
                    <p className="font-calibri-regular text-[23px]">{restricMedica}</p>
                  </div>
                  <div class="">
                    <p className="font-calibri-bold text-[25px] leading-none">Donador de órganos</p>
                    <p className="font-calibri-regular text-[23px]">{donadorOrganos}</p>
                  </div>
                  <div class="">
                    <p className="font-calibri-bold text-[25px] leading-none">Alergias</p>
                    <p className="font-calibri-regular text-[23px]">{alergias}</p>
                  </div>
                  <div class="">
                    <p className="font-calibri-bold text-[25px] leading-none">Grupo sanguíneo</p>
                    <p className="font-calibri-regular text-[23px]">{tipoSangre}</p>
                  </div>
                  <div class="">
                    <p className="font-calibri-bold text-[25px] leading-none">
                      Contacto de emergencia
                    </p>
                    <p className="font-calibri-regular text-[23px]">{contactoEmergencia}</p>
                  </div>
                </div>
              </div>
              <div class="col-span-1 row-span-14  border-transparent border-[3px]"></div>
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

      <div className=" absolute w-full h-full z-50 ">
        {/* firma y foto */}
        <div className="flex justify-between">
          <div className="w-full">
            <div class="grid grid-cols-10 grid-rows-1 gap-1  border-transparent border-[3px]">
              <div class="col-span-1  border-transparent border-[3px]"></div>
              <div class="col-span-8  border-transparent border-[3px]">
                <div class="grid grid-flow-col grid-cols-14 gap-1 border-transparent border-[3px]">
                  <div class="col-span-2 border-transparent border-[3px]">
                    <div className="flex w-[90px] h-[101px] border-[4px] border-pantone207C">
                      {fotografia && <img src={`http://192.168.1.64:3000/uploads/${fotografia}`} className="w-[90px] h-[93px]" />}
                    </div>
                  </div>
                  <div class="col-span-12 border-transparent border-[3px]">
                    <div className="flex flex-col w-full justify-center items-center">
                      <div className="flex w-[151px] h-[65px] ">
                        {firma && <img src={`http://192.168.1.64:3000/uploads/${firma}`} className="w-[151px] h-[65px]" />}
                      </div>
                      <p className="font-calibri-bold text-[19px]">
                        C. {nombres} {apellidoPaterno} {apellidoMaterno}{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />

        {/* firma y foto */}
        <div className="flex justify-between">
          <div className="w-full">
            <div class="grid grid-cols-10  gap-1  border-transparent border-[3px]">
              <div class="col-span-1   border-transparent border-[3px]"></div>
              <div class="col-span-8  border-transparent border-[3px]">
                <div class="grid grid-flow-col grid-cols-14 gap-1 border-transparent border-[3px]">
                  <div class="col-span-2  border-transparent border-[3px]">
                    <div className="flex flex-col w-full justify-center items-center">
                      <div className="flex w-[80px] h-[123px]">
                        {selloOme && <img src={selloOme} className="w-[80px] h-[123px]" />}
                      </div>
                    </div>
                  </div>
                  <div class="col-span-12 border-transparent border-[3px]">
                    <div className="flex flex-col w-full justify-center items-center">
                      <div className="flex w-[191px] h-[102px] ">
                        {firmadirector && (
                          <img src={firmadirector} className="w-[191px] h-[102px]" />
                        )}
                      </div>
                      <p className="font-calibri-bold text-[25px] text-center ">
                        C. Arturo García Ramírez
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-span-1   border-transparent border-[3px]"></div>
              <div class="col-span-1   border-transparent border-[3px]"></div>
              <div class="col-span-8  border-transparent border-[3px]">
                <div className="flex flex-col w-full justify-center items-center">
                  <p className="font-calibri-regular text-[25px] leading-none">
                    Coordinador de permisos y licencias del H.
                  </p>
                  <p className="font-calibri-regular text-[25px] leading-none">
                    Ayuntamiento municipal de Ometepec, Gro.
                  </p>
                </div>
              </div>
              <div class="col-span-1   border-transparent border-[3px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LicenseCardBack

// import React from 'react'
// import mask from '../../../assets/recursosLicencia/frente/png/mask.png'
// import bannerDos from '../../../assets/recursosLicencia/frente/png/bannerDos.png'
// import flor from '../../../assets/recursosLicencia/tracera/png/flor.png'
// import logoGro from '../../../assets/recursosLicencia/frente/png/logoGuerrero.png'
// import fondoBannerGro from '../../../assets/fondoBannergro.png'
// import cintoizquierdo from '../../../assets/cintoizquierdo.png'
// import cintoDerecho from '../../../assets/cintoderecho.png'
// import fondoMontania from '../../../assets/fondoMontania.png'
// import logoOme from '../../../assets/logoOme.png'
// import selloOme from '../../../assets/selloome.png'
// import firmadirector from '../../../assets/firmadirector.png'
// import logoIzquierdo from '../../../assets/logoiztras.png'

// import imagenSuperior from '../../../assets/fondocapa.png'

// const LicenseCardBack = ({
//   id,
//   nombres,
//   apellidoPaterno,
//   apellidoMaterno,
//   telefono,
//   sexo,
//   fechaNacimiento,
//   curp,
//   rfc,
//   tipoSangre,
//   alergias,
//   domicilio,
//   contactoEmergencia,
//   donadorOrganos,
//   restricMedica,
//   status,
//   fotografia,
//   created_at,
//   updated_at,
//   firma,
//   fechaExpedicion,
//   fechaVencimiento,
//   licenciaDe,
//   tipoLicencia,
//   numLicencia
// }) => {
//   return (
//     <div
//       className="
//       relative
//       w-[637px] h-[1012px]
//       overflow-hidden
//       box-border
//     "
//       style={{ resolution: '300dpi' }}
//     >
//       {imagenSuperior && (
//         <img
//           src={imagenSuperior}
//           alt="Imagen Superior"
//           className="absolute inset-0 w-full h-full object-cover opacity-60 z-40"
//         />
//       )}
//       <div className="flex flex-col relative ">
//         <div className="relative flex flex-row h-full ml-4 mr-2">
//           <div className="flex flex-row justify-start w-[124px] h-[125px]">
//             {logoOme && <img src={logoIzquierdo} className="w-[124px] h-[125px] mt-2" />}
//           </div>

//           <div className="flex flex-col w-full h-[138px] items-center justify-center">
//             <p className="font-calibri-bold text-[50px] text-justify leading-none">TRÁNSITO </p>
//             <p className="font-calibri-bold text-[50px] text-justify leading-none">MUNICIPAL </p>
//           </div>
//           <div className="flex flex-row justify-start w-[180px] h-[112px]">
//             {logoOme && <img src={logoOme} className="w-[180px] h-[112px] mt-2" />}
//           </div>
//         </div>

//         <div className="flex">
//           <div className="relative w-1/3 mt-4 h-10">
//             <img
//               src={cintoizquierdo}
//               alt="Imagen Izquierda"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <div className="relative w-2/3 h-30">
//             <img src={cintoDerecho} alt="Imagen Derecha" className="w-full h-full object-cover" />
//             <div className="absolute inset-0 flex justify-center items-center text-white font-bold text-2xl">
//               LICENCIA PARA CONDUCIR
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-full h-full">
//         <div className="flex flex-col w-full ml-4 mt-4">
//           <div className="flex flex-col">
//             <p className="font-calibri-bold text-[25px] leading-none">Domicilio</p>
//             <p className="font-calibri-regular text-[20px]">{domicilio}</p>
//           </div>

//           <div>
//             <p className="font-calibri-bold text-[25px] leading-none">RFC</p>
//             <p className="font-calibri-regular text-[20px]">{rfc}</p>
//           </div>

//           <div>
//             <p className="font-calibri-bold text-[25px] leading-none">Restricciones Médicas</p>
//             <p className="font-calibri-regular text-[20px]">{restricMedica}</p>
//           </div>

//           <div>
//             <p className="font-calibri-bold text-[25px] leading-none">Donador de órganos</p>
//             <p className="font-calibri-regular text-[20px]">{donadorOrganos}</p>
//           </div>
//           <div>
//             <p className="font-calibri-bold text-[25px] leading-none">Alergias</p>
//             <p className="font-calibri-regular text-[20px]">{alergias}</p>
//           </div>

//           <div>
//             <p className="font-calibri-bold text-[25px] leading-none">Grupo sanguíneo</p>
//             <p className="font-calibri-regular text-[20px]">{tipoSangre}</p>
//           </div>

//           <div>
//             <p className="font-calibri-bold text-[25px] leading-none">Contacto de emergencia</p>
//             <p className="font-calibri-regular text-[20px]">{contactoEmergencia}</p>
//           </div>
//         </div>

//         <div className="flex flex-row w-full h-[102px] mt-20 justify-center">
//           <div className='flex w-[507px] h-[102px] bg-pantoneCoolGray11C-20'>
//           <div className="flex ">
//             <div className="flex w-[101px] h-[99px] border-[4px] border-pantone207C">
//               {fotografia && <img src={fotografia} className="w-[109px] h-[91px]" />}
//             </div>
//           </div>
//           <div className="flex flex-col bg-pantoneCoolGray11C-20 w-full justify-center items-center">
//             <div className="flex w-[151px] h-[65px] ">
//               {firma && <img src={firma} className="w-[151px] h-[65px]" />}
//             </div>
//             <p className="font-calibri-bold text-[19px]">
//               C. {nombres} {apellidoPaterno} {apellidoMaterno}{' '}
//             </p>
//           </div>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 mb-4 w-full flex flex-col justify-center items-center">
//           <div className="flex flex-row justify-center w-[507¿px] h-[160px]">
//             <div className="flex flex-col justify-end w-[94px] h-[153px] ">
//               {selloOme && <img src={selloOme} className="w-[211px] h-[122px]" />}
//             </div>
//             <div className="flex flex-col ">
//               <div className="flex w-[211px] h-[122px] ">
//                 {firmadirector && <img src={firmadirector} className="w-[211px] h-[122px]" />}
//               </div>
//               <p className="font-calibri-regular text-[25px]">C. Arturo García Ramírez</p>
//             </div>
//           </div>

//           <div>
//             <p className="font-calibri-regular text-[25px] leading-none">
//               Coordinador de permisos y licencias del H.
//             </p>
//             <p className="font-calibri-regular text-[25px] leading-none">
//               Ayuntamiento municipal de Ometepec, Gro.
//             </p>
//             <p className='h-1'></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LicenseCardBack
