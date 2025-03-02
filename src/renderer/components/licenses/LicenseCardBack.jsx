
import React, { useState } from 'react'
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
  numLicencia,
  tipoTramite,
  responsable
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  console.log(responsable)

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
            <div className="grid grid-flow-col grid-rows-14 grid-cols-14 gap-1 border-transparent border-[3px] m-0">
              <div className="col-span-1 row-span-14 border-transparent border-[3px]"></div>
              <div className="col-span-12 row-span-14 border-transparent border-[3px] p-4">
                <div>
                  <p className="font-calibri-bold text-[30px] leading-none">Domicilio</p>
                  <p className="font-calibri-regular text-[32px]">{domicilio}</p>
                </div>{' '}
                <br />
                <div className="grid grid-cols-2 gap-2">
                  {/* Fila 2 */}
                  <div>
                    <p className="font-calibri-bold text-[28px] leading-none">
                      Restricciones Médicas
                    </p>
                    <p className="font-calibri-regular text-[32px]">{restricMedica}</p>
                  </div>
                  <div>
                    <p className="font-calibri-bold text-[28px] leading-none">Donador de órganos</p>
                    <p className="font-calibri-regular text-[32px]">{donadorOrganos}</p>
                  </div>

                  {/* Fila 3 */}
                  <div>
                    <p className="font-calibri-bold text-[28px] leading-none">Alergias</p>
                    <p className="font-calibri-regular text-[32px]">{alergias}</p>
                  </div>
                  <div>
                    <p className="font-calibri-bold text-[28px] leading-none">Grupo sanguíneo</p>
                    <p className="font-calibri-regular text-[32px]">{tipoSangre}</p>
                  </div>

                  {/* Fila 4 */}

                  <div>
                    <p className="font-calibri-bold text-[28px] leading-none">RFC</p>
                    <p className="font-calibri-regular text-[32px]">{rfc}</p>
                  </div>
                  <div>
                    <p className="font-calibri-bold text-[28px] leading-none">
                      Contacto de emergencia
                    </p>
                    <p className="font-calibri-regular text-[32px]">{contactoEmergencia}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-1 row-span-14 border-transparent border-[3px]"></div>
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
                      {fotografia && (
                        <img
                          src={`http://192.168.1.64:3000/uploads/${encodeURIComponent(fotografia)}`}
                          // src={`http://192.168.0.109:3000/uploads/${fotografia}`}
                          className="w-[90px] h-[93px]"
                          // className="w-[90px] h-[93px]"
                          onLoad={handleImageLoad}
                          crossOrigin="anonymous"
                        />
                      )}
                    </div>
                  </div>
                  <div class="col-span-12 border-transparent border-[3px]">
                    <div className="flex flex-col w-full justify-center items-center">
                      <div className="flex w-[151px] h-[65px] ">
                        {firma && (
                          <img
                            // OMETEPEC
                            src={`http://192.168.1.64:3000/uploads/${encodeURIComponent(firma)}`}
                            // LOCAL
                            // src={`http://192.168.0.109:3000/uploads/${firma}`}
                            className="w-[151px] h-[65px]"
                            onLoad={handleImageLoad}
                            crossOrigin="anonymous"
                          />
                        )}
                        {/* {firma && <img src={`http://192.168.0.108:3000/uploads/${firma}`} className="w-[151px] h-[65px]" />} //local */}
                      </div>
                      <p className="font-calibri-bold text-[15px]">
                        {tipoTramite && tipoTramite == '6meses-menores'
                          ? `Responsable padre o tutor: C. ${responsable}`
                          : `C. ${nombres} ${apellidoPaterno} ${apellidoMaterno}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                  <p className="font-calibri-regular text-[28px] leading-none">
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
