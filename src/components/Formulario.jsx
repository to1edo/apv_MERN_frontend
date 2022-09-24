import { React, useState, useEffect } from 'react'
import Alerta from './Alerta'
import usePacientes from '../hooks/usePacientes'

const Formulario = () => {

  const {guardarPaciente,alerta,setAlerta, paciente, eliminado} = usePacientes()

  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [fechaAlta, setFechaAlta] = useState('')

  const [_id, setId] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()

    if([nombre.trim(), propietario.trim(), email.trim(), sintomas.trim(), fechaAlta.trim()].includes('')){
      setAlerta({msg:'Todos los campos son obligatorios', error: true})
      return
    }

    const pacienteRegistrar = {
      nombre: nombre.trim(),
      propietario: propietario.trim(),
      email: email.trim(),
      sintomas: sintomas.trim(),
      fechaAlta: fechaAlta.trim(),
      _id
    }

    guardarPaciente(pacienteRegistrar)
    setId(null)

    setNombre('')
    setEmail('')
    setPropietario('')
    setFechaAlta('')
    setSintomas('')
    
  }
  
  useEffect(() => {

    if(!paciente._id)return

    setNombre(paciente.nombre)
    setEmail(paciente.email)
    setPropietario(paciente.propietario)
    setFechaAlta(paciente.fechaAlta.slice(0,10))
    setSintomas(paciente.sintomas)
    
    setId(paciente._id)
  }, [paciente])
  


  return (
    <>
      <div className="mx-4">
          <h1 className="text-gray-300 text-center text-2xl  font-medium  pt-4 md:pt-0">Registrar Pacientes</h1>
      </div>
      
      <div className="mt-8 md:mt-4" >

          <button onClick={ ()=> setMostrarFormulario(!mostrarFormulario) } className='bg-indigo-700 md:hidden mx-auto mb-8 block w-2/4 p-3 rounded-md uppercase font-bold'>{mostrarFormulario ? "Ocultar formulario" : "mostrar formulario"}</button>
          
          <form onSubmit={ handleSubmit }  className={`${mostrarFormulario ? "block" : "hidden" } md:block shadow-lg p-6  rounded-xl`}> 


              <div className="mb-4 ">
                  <label  htmlFor="nombre" className="uppercase text-white block font-medium  mb-2">Nombre de la mascota *</label>
                  <input onChange={(e)=> setNombre(e.target.value)} value={nombre}  id="nombre" className="w-full border p-2 bg-grey-50 rounded-xl" type="text" placeholder="Nombre de la mascota" required />
              </div>

              <div className="mb-4 ">
                  <label  htmlFor="propietario" className="uppercase text-white block font-medium  mb-2">Propietario *</label>
                  <input onChange={(e)=> setPropietario(e.target.value)} value={propietario}  id="propietario" className="w-full border p-2 bg-grey-50 rounded-xl" type="text" placeholder="Nombre del propietario" required />
              </div>

              <div className="mb-4 ">
                  <label htmlFor="email" className="uppercase text-white block font-medium  mb-2">Email *</label>
                  <input onChange={(e)=> setEmail(e.target.value)} value={email} id="email" className="w-full border p-2 bg-grey-50 rounded-xl" type="email" placeholder="Email del propietario" required />
              </div>

              <div className="mb-4 ">
                  <label htmlFor="fechaAlta" className="uppercase text-white block font-medium  mb-2">Fecha del alta *</label>
                  <input onChange={(e)=> setFechaAlta(e.target.value)} value={fechaAlta} id="fechaAlta" className="w-full border p-2 bg-grey-50 rounded-xl" type="date" required />
              </div>

              <div className="mb-4 ">
                  <label  htmlFor="sintomas" className="uppercase text-white block font-medium  mb-2">Sintomas *</label>
                  <textarea onChange={(e)=> setSintomas(e.target.value)} value={sintomas}  id="sintomas" className="w-full border p-2 bg-grey-50 rounded-xl" placeholder="Sintomas presentados" required />
              </div>
              <p className="text-sm text-gray-300">* Campos obligatorios</p>

              <div>
                  <input className="mb-4 cursor-pointer w-full mt-6 block bg-indigo-700 py-2 px-4 rounded-lg text-white font-medium uppercase md:w-auto md:mx-auto" type="submit" value={_id ? "Editar paciente" : "Registrar paciente"}/>
              </div>
              { alerta.msg && !eliminado && <Alerta alerta = {alerta} /> }
          </form>
      </div>
    
    </>
  )
}

export default Formulario