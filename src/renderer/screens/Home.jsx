// import '../index.css'
import React, { useState } from 'react'
import { useUser } from '../hooks/UserContext'
import logo from '../../assets/logos/logo_fRojo.jpg'
import logo_ometepec from '../../assets/logos/logo_ometepec.jpg'
import { Form, Button } from 'semantic-ui-react'

const Home = () => {
  const { setUser } = useUser()
  const [correo, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false); // Indicador de carga


  const handleLogin = async () => {
    console.log('Intentando iniciar sesión con:', correo, password)

    try {
      const response = await window.api.login(correo, password)
      console.log('Respuesta del backend:', response)
      setLoading(true); // Activa el indicador de carga


      if (response) {
        setUser(response)
        // alert('Bienvenido')
      } else {
        alert('Usuario o contraseña incorrectos')
      }
    } catch (err) {
      console.error('Error en el inicio de sesión:', err)
      // alert('Hubo un error al intentar iniciar sesión. Intente de nuevo.')
    }finally{
      setLoading(false); // Desactiva el indicador de carga
    }
  }

  return (
    <Form
      onSubmit={handleLogin}
      className="flex flex-col md:flex-row gap-6 bg-white w-full max-w-7xl p-6 rounded-lg shadow-lg"
    >
      <div className="flex bg-white w-screen h-screen justify-center items-center">
        <div className="flex w-7/12 h-4/6 bg-white shadow-2xl rounded-2xl">
          <div className="flex-row items-center justify-center w-5/12 h-6/6 bg-pantone207C rounded-l-2xl">
            <div className="flex w-12/12 h-full justify-center items-center">
              <img src={logo} />
            </div>
          </div>

          <div className="flex flex-col w-7/12 max-h-full  rounded-r-2xl justify-center items-center">
            <div className="flex w-11/12 h-36  justify-center items-center">
              <img src={logo_ometepec} className="max-h-full" />
            </div>

            <div className="flex flex-col gap-8 bg-white w-11/12 justify-center items-center">
              <Form.Input
                label="Usuario"
                type="text"
                placeholder="Ingrese su Usuario"
                value={correo}
                className="w-11/12"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Input
                label="Contraseña"
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                className="w-11/12"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center mt-6 w-full">
              <Form.Button
                type="submit"
                className="w-8/12"
                style={{ backgroundColor: '#ab0033', color: '#fff' }}
              >
                <p className="mt-0 p-0 font-encodesans-medium text-xl">Ingresar</p>
              </Form.Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default Home
