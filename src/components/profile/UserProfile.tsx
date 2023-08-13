import { useEffect, useState } from "react";
import '../../styles/userProfile.css'
import { UserProfile4 } from "../../lib/api/index";
import useAuth from '../../store/auth'
import { useNavigate } from "react-router-dom"
import { useProfile } from "../../store/profile";
import { BiUser, BiLock, BiHistory, BiLogOut, BiMapAlt } from 'react-icons/bi';

export default function Profile(){
  const [perfil, setPerfil] = useState<any>()

  const navigate = useNavigate()
	const auth:any = useAuth()
  const profile:any = useProfile()

	const handleLogOut = async () => {
		await auth.logOut()
		navigate ('/')
	}

  const handlePassword = async () => {
    navigate('/profile/contrasena')
  }

  const handleHistory = async () => {
    navigate('/profile/historial')
  }

  const handleAddress = async () => {
    navigate('/profile/shipping-address')
  }

  useEffect(() => {
    profile.getInformationUser()
          .then(setPerfil)
  }, [])

  return(
    <div>
      <div className="container text-center mx-auto">
        <h2 className='profile-title'>¡Bienvenido a Nudos Eline, {perfil?.first_name}!</h2>
        <div className="row">
          <div className="col-6 col-md-4" >
            <div className="d-grid gap-4 col-6 mx-auto">
              <button className="web-view-button" id='using' type="button"><BiUser style={{fontSize: "200%", marginRight: "5px"}}/>Datos personales</button>
              <button className="web-view-button" type="button"onClick={handleAddress}><BiMapAlt style={{fontSize: "200%", marginRight: "5px"}}/>Mi libreta de direcciones</button>
              <button className="web-view-button" type="button" onClick={handlePassword}><BiLock style={{fontSize: "200%", marginRight: "5px"}}/> Cambiar mi contraseña</button>
              <button className="web-view-button" type="button" onClick={handleHistory}><BiHistory style={{fontSize: "200%", marginRight: "5px"}}/> Mi historial de compras</button>
              <button className="web-view-button" type="button" onClick={handleLogOut}> <BiLogOut style={{fontSize: "200%", marginRight: "5px"}}/> Cerrar sesión</button>
            </div>
          </div>
          <div className="col-12 col-md-8 profileDiv">
            <div className="card profileDiv">
              <div className="card-body">
  
                <div >
                <p className="profileField"><strong style={{color: "#Bf3b4b"}}>Nombre:</strong> {perfil?.first_name} {perfil?.last_name}</p>
                <p className="profileField"><strong style={{color: "#Bf3b4b"}}>Email:</strong> {perfil?.email}</p>
                <p className="profileField"><strong style={{color: "#Bf3b4b"}}>Nombre de usuario:</strong> {perfil?.username}</p>
                <p className="profileField"><strong style={{color: "#Bf3b4b"}}>Fecha de nacimiento:</strong> {perfil?.birthdate}</p>
                <p className="profileField"><strong style={{color: "#Bf3b4b"}}>RUT:</strong> {perfil?.rut}</p>
                <p className="profileField"><strong style={{color: "#Bf3b4b"}}>Teléfono:</strong> {perfil?.phone_number}</p>
                </div>
                <a href="/profile/edit" className="edit-profile">Editar información</a>        
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center">
          <button className="btn mobile-view-button" id='using' type="button">
            <BiUser style={{fontSize: "180%", marginRight: "10%"}}/>
          </button>
          <button className="btn mobile-view-button" type="button" onClick={handleAddress}>
            <BiMapAlt style={{fontSize: "180%", marginRight: "10%"}}/>
          </button>
          <button className="btn mobile-view-button" type="button" onClick={handlePassword}>
            <BiLock style={{fontSize: "180%", marginRight: "10%"}}/>
          </button>
          <button className="btn mobile-view-button" type="button" onClick={handleHistory}>
            <BiHistory style={{fontSize: "180%", marginRight: "10%"}}/>
          </button>
          <button className="btn mobile-view-button" type="button" onClick={handleLogOut}> 
            <BiLogOut style={{fontSize: "180%", marginRight: "10%"}}/>
          </button>
        </div>
      </div>
      
    </div>
  )
}