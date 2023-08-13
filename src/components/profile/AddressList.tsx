import '../../styles/NewPost.css'
import useAuth from '../../store/auth'
import { useNavigate } from "react-router-dom"
import { BiUser, BiLock, BiHistory, BiLogOut, BiMapAlt, BiPlus } from 'react-icons/bi';
import useUser from '../../store/user'
import { useEffect, useState } from "react";
import { Card } from 'react-bootstrap'

export default function Address(){
    
    const navigate = useNavigate()
	const auth:any = useAuth()
    const user:any =useUser()

    const [addresses, setAddresses] = useState<any[]>([])
    const [loading, setLoading] = useState(true);

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

    const handleProfile = async () => {
        navigate('/profile')
    }

    const handleNewAddress = async () => {
        navigate('/profile/nuevaDireccion')
    }

    const handleRemoveAddress = (addressId:number) => {
        user.removeShippingaddress(addressId)
        setLoading(true)
    } 

    useEffect(() => {
        user.allSignedUserShippingAddresses()
            .then((k:any) => setAddresses(k))
            .finally(setLoading(false))
    }, [loading])
    
    return (
        <div>
            <div className="container text-center mx-auto">
                <h2 className='profile-title'>Mi libreta de direcciones</h2>
                <div className="row">
                    <div className="col-6 col-md-4" >
                        <div className="d-grid gap-4 col-6 mx-auto">
                            <button className="web-view-button" type="button" onClick={handleProfile}><BiUser style={{fontSize: "200%", marginRight: "5px"}}/>Datos personales</button>
                            <button className="web-view-button" id='using' type="button"><BiMapAlt style={{fontSize: "200%", marginRight: "5px"}}/>Mi libreta de direcciones</button>
                            <button className="web-view-button" type="button" onClick={handlePassword}><BiLock style={{fontSize: "200%", marginRight: "5px"}}/> Cambiar mi contraseña</button>
                            <button className="web-view-button" type="button" onClick={handleHistory}><BiHistory style={{fontSize: "200%", marginRight: "5px"}}/> Mi historial de compras</button>
                            <button className="web-view-button" type="button" onClick={handleLogOut}> <BiLogOut style={{fontSize: "200%", marginRight: "5px"}}/> Cerrar sesión</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-8" >
                        {(addresses.length > 0) ? (
                            <>
                            <div style={{marginBottom:'10px', display:'flex', justifyContent:'flex-end'}}>
                                <button className="web-view-button" type="button" onClick={handleNewAddress}> <BiPlus style={{fontSize: "150%", marginRight: "5px"}}/> Nueva dirección</button>
                            </div>
                            <div className="row">
                                {addresses.map((address:any) =>
                                    <div className="col-sm-6" style={{marginBottom:'10px'}}>
                                        <Card>
                                            <Card.Body className="d-flex justify-content-between align-items-baseline mb-4">
                                                <Card.Text style={{textAlign:'left'}}>
                                                    {address.address}
                                                    <br/>
                                                    {address.commune}
                                                    <br/>
                                                    {address.region}
                                                    <br/>
                                                    <button className="web-view-button" type="button" onClick={() => {handleRemoveAddress(address.id)}} style={{border:'none', paddingLeft:'0px', textDecoration: "underline", paddingBottom:'0px'}}> Eliminar dirección</button>
                                                </Card.Text>
                                                
                                            </Card.Body>
                                        </Card>    
                                    </div>                            
                                )}
                            </div>
                            </>
                            
                        ) : (
                            <>
                                
                                <div style={{marginBottom:'10%', display:'flex', justifyContent:'flex-end'}}>
                                    <button className="web-view-button" type="button" onClick={handleNewAddress}> <BiPlus style={{fontSize: "150%", marginRight: "5px"}}/> Nueva dirección</button>
                                </div>
                                <h6 style={{color: "#Bf3b4b",textAlign:"center", fontSize: "160%", marginBottom:'10px'}}>Aún no tienes </h6>
                                <h6 style={{color: "#Bf3b4b",textAlign:"center", fontSize: "160%", marginBottom:'10px'}}>direcciones registradas </h6>
                            </>
                        )}
                    </div>
                </div>
                
                <div className="container text-center">
                    <button className="btn mobile-view-button" type="button" onClick={handleProfile}>
                        <BiUser style={{fontSize: "180%", marginRight: "10%"}}/>
                    </button>
                    <button className="btn mobile-view-button" type="button" id='using'>
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