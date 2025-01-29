import React from 'react'
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
            <div className="w-[229px] h-[315px] border-[10px] border-pantone207C">
              <img
                src={`http://192.168.1.64:3000/uploads/${fotografia}`}
                className="w-[229px] h-[295px]"
              />
            </div>

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
      <br />
      <br />
      <br />
      <br />

      <div className="absolute w-full z-50">
        <div className="flex justify-between">
          <div className="w-full">
            <div class="grid grid-col grid-cols-7 gap-0 border-[3px] border-transparent ">
              <div class="col-span-2  border-[3px] border-transparent "></div>

              <div class="col-span-3  border-[3px] border-transparent "></div>

              <div class="col-span-2  border-[3px] border-transparent ">
                <div className="flex  mb-0 z-50">
                  <p className=" text-pantone207C  flex text-[20px] font-calibri-bold">
                    No. {numLicencia}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className="absolute w-full z-40">
        <div className="flex justify-between">
          <div className="w-full">
            <div class="grid grid-flow-col grid-cols-7 gap-1.5 border-[3px] border-transparent ">
              <div class="col-span-2 row-span-7 border-[3px] border-transparent ">
                <div class="grid grid-flow-col grid-cols-5 gap-4 h-full w-full">
                  <div class="row-span-5 col-span-4 border-[3px] border-transparent   m-0 leading-none">
                    <div className="font-bold text-[80px] relative">
                      <p
                        className="text-center text-[120px] absolute top-0 left-0 w-full h-full border-transparent  text-stroke"
                        style={{
                          WebkitTextStroke: '2px black',
                          color: 'transparent'
                        }}
                      >
                        {tipoLicencia}
                      </p>
                      <p className="text-center text-[120px] outline-solid text-[#C19553]">
                        {tipoLicencia}
                      </p>
                    </div>
                  </div>
                  <div class=" border-[3px] border-transparent   m-0 leading-none"></div>
                  <div class=" border-[3px] border-transparent   m-0 leading-none"></div>
                  <div class=" border-[3px] border-transparent   m-0 leading-none -rotate-90">
                    <span className="text-[#C19553] uppercase font-calibri-bold text-[25px] flex items-center justify-center">
                      {licenciaDe}
                    </span>
                  </div>
                  <div class=" border-[3px] border-transparent  m-0 leading-none"></div>
                  <div class=" border-[3px] border-transparent   m-0 leading-none"></div>
                </div>
              </div>

              <div class="col-span-3 border-[3px] border-transparent   m-0 leading-none">
                <p className="font-calibri-bold text-[25px] leading-none">Vigencia:</p>{' '}
              </div>
              <div class="col-span-3 border-[3px] border-transparent   m-0 leading-none text-[20px]">
                {duracion} años
              </div>
              <div class="col-span-3 border-[3px] border-transparent   m-0 leading-none">
                <p className="font-calibri-bold text-[25px] leading-none">Expedición:</p>{' '}
              </div>
              <div class="col-span-3 border-[3px] border-transparent   m-0 leading-none text-[20px]">
                {fechaExpedicion}
              </div>
              <div class="col-span-3 border-[3px] border-transparent   m-0 leading-none">
                <p className="font-calibri-bold text-[25px] leading-none ">Vencimiento:</p>{' '}
              </div>
              <div class="col-span-3 border-[3px] border-transparent   m-0 leading-none text-[20px]">
                {fechaVencimiento}
              </div>

              <div class="col-span-2 row-span-7 border-[3px] border-transparent ">
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

// import React from 'react'
// import licPlantilla from '../../../assets/licencia_plantilla.png'

// import logoGro from '../../../assets/logogro.png'
// import logoOme from '../../../assets/logoOme.png'
// import fondoImagen from '../../../assets/fondoBanner.png'
// import imagenSuperior from '../../../assets/fondocapa.png'
// import fondoBanner from '../../../assets/fondoBanner.png'
// import fondoBannerGro from '../../../assets/fondoBannergro.png'
// import cintoizquierdo from '../../../assets/cintoizquierdo.png'
// import cintoDerecho from '../../../assets/cintoderecho.png'
// import fondoMontania from '../../../assets/fondoMontania.png'
// import logoGuerrero from '../../../assets/logoGuerrero.png'
// import logoGobierno from '../../../assets/logoGobierno.png'

// const LicenseCardFront = ({
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
//   duracion,
//   numLicencia
// }) => {
//   return (
//     <div
//       className="
//         relative
//         w-[637px] h-[1012px]
//         overflow-hidden
//         box-border
//       "
//       style={{ resolution: '300dpi' }}
//     >
//       {licPlantilla && (
//         <img
//           src={licPlantilla}
//           alt="Plantilla frontal"
//           className="absolute inset-0 w-full h-full object-cover opacity-100"
//         />
//       )}

//       <div className="flex mb-1 mt-8 ml-14 h-3/6 relative">
//         <div className="flex w-full relative">
//           <div className="flex flex-col w-11/12 items-center justify-center">
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />

//             <div className="w-[229px] h-[315px] border-[10px] border-pantone207C">
//               <img src={`http://192.168.0.109:3000/uploads/${fotografia}`} className="w-[229px] h-[295px]" />
//             </div>

//             <div className="pl-4 flex flex-col justify-center mt-2 items-center text-center ">
//               <div className="mb-2">
//                 <p className="font-calibri-bold text-[38px]">
//                   C. {nombres} {apellidoPaterno} {apellidoMaterno}
//                 </p>
//               </div>
//               <div className="mb-2">
//                 <p className="font-calibri-bold text-[32px]">{curp}</p>
//               </div>
//               <div className="mb-2">
//                 <p className="font-calibri-bold text-[32px]">Nacionalidad Mexicana</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-row justify-end mb-2">
//         <p className=" text-pantone207C w-1/3 justify-start flex text-[25px] font-calibri-bold">
//           No. {numLicencia}
//         </p>
//       </div>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />

//       <div className="absolute w-full z-40">
//         <div className="flex justify-between">
//           <div className="w-full">
//             <div class="grid grid-flow-col grid-cols-7 gap-1.5 border-[3px] border-transparent ">
//               <div class="col-span-2 row-span-7 border-[3px] border-transparent ">
//                 <div class="grid grid-flow-col grid-cols-5 gap-4 h-full w-full">
//                   <div class="row-span-5 col-span-4 border-[3px] border-transparent   m-0 leading-none">
//                     <div className="font-bold text-[80px] relative">
//                       <p
//                         className="text-center text-[120px] absolute top-0 left-0 w-full h-full border-transparent  text-stroke"
//                         style={{
//                           WebkitTextStroke: '2px black',
//                           color: 'transparent'
//                         }}
//                       >
//                         {tipoLicencia}
//                       </p>
//                       <p className="text-center text-[120px] outline-solid text-[#C19553]">
//                         {tipoLicencia}
//                       </p>
//                     </div>
//                   </div>
//                   <div class=" border-[3px] border-transparent   m-0 leading-none"></div>
//                   <div class=" border-[3px] border-transparent   m-0 leading-none"></div>
//                   <div class=" border-[3px] border-transparent   m-0 leading-none -rotate-90">
//                     <span className="text-[#C19553] uppercase font-calibri-bold text-[25px] flex items-center justify-center">
//                       {licenciaDe}
//                     </span>
//                   </div>
//                   <div class=" border-[3px] border-transparent  m-0 leading-none"></div>
//                   <div class=" border-[3px] border-transparent   m-0 leading-none"></div>
//                 </div>
//               </div>

//               <div class="col-span-3 border-[3px] border-transparent   m-0 leading-none">
//                 <p className="font-calibri-bold text-[25px] leading-none">Vigencia:</p>{' '}
//               </div>
//               <div class="col-span-3 border-[3px] border-transparent   m-0 leading-none text-[20px]">
//                 {duracion} años
//               </div>
//               <div class="col-span-3 border-[3px] border-transparent   m-0 leading-none">
//                 <p className="font-calibri-bold text-[25px] leading-none">Expedición:</p>{' '}
//               </div>
//               <div class="col-span-3 border-[3px] border-transparent   m-0 leading-none text-[20px]">
//                 {fechaExpedicion}
//               </div>
//               <div class="col-span-3 border-[3px] border-transparent   m-0 leading-none">
//                 <p className="font-calibri-bold text-[25px] leading-none ">Vencimiento:</p>{' '}
//               </div>
//               <div class="col-span-3 border-[3px] border-transparent   m-0 leading-none text-[20px]">
//                 {fechaVencimiento}
//               </div>

//               <div class="col-span-2 row-span-7 border-[3px] border-transparent ">03</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LicenseCardFront

// // import React from 'react'
// // import logoGro from '../../../assets/logogro.png'
// // import logoOme from '../../../assets/logoOme.png'
// // import fondoImagen from '../../../assets/fondoBanner.png'
// // import imagenSuperior from '../../../assets/fondocapa.png'
// // import fondoBanner from '../../../assets/fondoBanner.png'
// // import fondoBannerGro from '../../../assets/fondoBannergro.png'
// // import cintoizquierdo from '../../../assets/cintoizquierdo.png'
// // import cintoDerecho from '../../../assets/cintoderecho.png'
// // import fondoMontania from '../../../assets/fondoMontania.png'
// // import logoGuerrero from '../../../assets/logoGuerrero.png'
// // import logoGobierno from '../../../assets/logoGobierno.png'

// // const LicenseCardFront = ({
// //   id,
// //   nombres,
// //   apellidoPaterno,
// //   apellidoMaterno,
// //   telefono,
// //   sexo,
// //   fechaNacimiento,
// //   curp,
// //   rfc,
// //   tipoSangre,
// //   alergias,
// //   domicilio,
// //   contactoEmergencia,
// //   donadorOrganos,
// //   restricMedica,
// //   status,
// //   fotografia,
// //   created_at,
// //   updated_at,
// //   firma,
// //   fechaExpedicion,
// //   fechaVencimiento,
// //   licenciaDe,
// //   tipoLicencia,
// //   duracion,
// //   numLicencia
// // }) => {
// //   return (
// //     <div
// //       className="
// //         relative
// //         w-[637px] h-[1012px]
// //         overflow-hidden
// //         box-border
// //       "
// //       style={{ resolution: '300dpi' }}
// //     >
// //       {imagenSuperior && (
// //         <img
// //           src={imagenSuperior}
// //           alt="Imagen Superior"
// //           className="absolute inset-0 w-full h-full object-cover opacity-60 z-40"
// //         />
// //       )}
// //       {fondoImagen && (
// //         <img
// //           src={fondoImagen}
// //           alt="Fondo"
// //           className="absolute bottom-0 w-full h-2/3 object-cover opacity-90"
// //         />
// //       )}
// //       <div className="flex flex-col relative ">
// //         <img
// //           src={fondoMontania}
// //           alt="Fondo del Encabezado"
// //           className="absolute inset-0 w-full h-full object-cover z-0"
// //         />
// //         <div className="relative flex flex-row h-full ml-4 mr-2">
// //           <div className="flex flex-row justify-start w-[96px] h-[164px]">
// //             {logoGuerrero && <img src={logoGuerrero} className="w-[96px] h-[164px] mt-2" />}
// //           </div>

// //           <div className="flex flex-col w-full h-[138px] items-center justify-center">
// //             <p className="font-calibri-bold text-[35px] text-justify leading-none">
// //               ESTADOS UNIDOS MEXICANOS
// //             </p>
// //             <p className="font-calibri-bold text-[28px] text-justify leading-none">
// //               GOBIERNO DEL ESTADO DE GUERRERO
// //             </p>
// //             <p className="font-calibri-bold text-[28.9px] text-justify leading-none">
// //               SECRETARÍA DE SEGURIDAD PÚBLICA
// //             </p>
// //           </div>
// //           <div className="flex flex-row w-[99px] h-[124px] justify-start">
// //             {logoGobierno && <img src={logoGobierno} className="w-[99px] h-[124px] mt-2" />}
// //           </div>
// //         </div>

// //         <div className="flex">
// //           <div className="relative w-1/3 mt-4 h-10">
// //             <img
// //               src={cintoizquierdo}
// //               alt="Imagen Izquierda"
// //               className="w-full h-full object-cover"
// //             />
// //           </div>

// //           <div className="relative w-2/3 h-30">
// //             <img src={cintoDerecho} alt="Imagen Derecha" className="w-full h-full object-cover" />
// //             <div className="absolute inset-0 flex justify-center items-center text-white font-bold text-2xl">
// //               LICENCIA PARA CONDUCIR
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="flex mb-1 mt-1 ml-14 h-3/6 relative">
// //         <div className="flex w-full relative">
// //           <div className="flex flex-col w-11/12 items-center justify-center">
// //             <div className="w-[236px] h-[328px] border-[8px] border-pantone207C">
// //               <img src={fotografia} className="w-[229px] h-[314px]" />
// //             </div>
// //             <div className="pl-4 flex flex-col justify-center mt-6 items-center text-center">
// //               <div className="mb-2">
// //                 <p className="font-calibri-bold text-[37px]">
// //                   C. {nombres} {apellidoPaterno} {apellidoMaterno}
// //                 </p>
// //               </div>
// //               <div className="mb-2">
// //                 <p className="font-calibri-bold text-[25px]">{curp}</p>
// //               </div>
// //               <div className="mb-2">
// //                 <p className="font-calibri-bold text-[25px]">Nacionalidad Mexicana</p>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="absolute top-0 right-0 w-[60px] h-full flex items-center justify-center">
// //             <p className="-rotate-90 font-calibri-bold text-[20px] whitespace-nowrap text-black">
// //               VALIDA EN TODA LA REPÚBLICA MEXICANA
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="flex flex-row justify-end mb-2">
// //         <p className=" text-pantone207C w-1/3 justify-start flex text-[25px] font-calibri-bold">
// //           No. {numLicencia}
// //         </p>
// //       </div>
// //       <div className="absolute bottom-0 left-0 w-full z-40">
// //         <div className="flex justify-between">
// //           <div className="flex bg-pantone207C relative w-1/3 items-center justify-center">
// //             <img src={fondoBannerGro} className="absolute w-24 h-24 object-cover opacity-50 z-10" />
// //             <div className="flex flex-col  bg-pantone207C items-center justify-center">
// //               <div className="font-bold text-[80px] relative">
// //                 <span
// //                   className="absolute top-0 left-0 w-full h-full text-black text-stroke"
// //                   style={{
// //                     WebkitTextStroke: '2px black',
// //                     color: 'transparent'
// //                   }}
// //                 >
// //                   {tipoLicencia}
// //                 </span>
// //                 <span className="text-[#C19553]">{tipoLicencia}</span>
// //               </div>

// //               <div className="flex items-center">
// //                 <span
// //                   className="absolute top-0 left-0 w-full h-full text-white text-stroke"
// //                   style={{
// //                     WebkitTextStroke: '2px black',
// //                     color: 'transparent'
// //                   }}
// //                 ></span>
// //                 <span className="text-white mt-4 text-[41px]">Tipo</span>
// //               </div>
// //               <div className=" flex font-bold text-[12px] absolute right-0 -rotate-90">
// //                 <span className="text-[#C19553] uppercase">{licenciaDe}</span>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="w-1/3">
// //             <div className="items-center text-center">
// //               <p className="font-calibri-bold text-[25px]">Vigencia:</p>{' '}
// //               <p className="text-[25px]">{duracion} años</p>
// //             </div>
// //             <div>
// //               <div className="text-center mb-4">
// //                 <p className="font-calibri-bold text-[25px]">Expedición:</p>
// //                 <p className="text-[25px]">{fechaExpedicion}</p>
// //                 <p className="font-calibri-bold mt-2 mb-2 text-[25px]">Vencimiento:</p>
// //                 <p className="text-[25px] mb-4">{fechaVencimiento}</p>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="w-1/3 ">
// //             <div className="flex flex-col items-center bg-pantone207C w-full h-full"></div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default LicenseCardFront
