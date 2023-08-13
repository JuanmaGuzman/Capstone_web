import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css'
import swal from 'sweetalert';
import useUser from '../../store/user';
import RemoveUserButton from '../buttons/RemoveUserButton'
import RemoveSellerButton from '../buttons/RemoveSellerButton'
import { BiUser } from 'react-icons/bi';


interface Props {
    id: number,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    is_seller: boolean
}

export default function UserItem({ id, username, email, first_name, last_name, is_seller }: Props) {

    const navigate = useNavigate()
    const user:any = useUser()

    const handleAssign = async (id:number) => {
        await user.assignSeller(id);
    }

    const assignSellerAlert = () => {
        swal({
            title: '¿Estas seguro que deseas asignarle como vendedor?',
            icon: 'warning',
            text: 'El usuario obtendrá acceso a la sección de vendedor',
            buttons: {
                cancel: {
                  text: "Cancelar",
                  visible: true,
                  value: 'cancel'
                },
                confirm: {
                  text: "Asignar",
                  visible: true,
                  value: 'confirm'
                }
              }
          })
          .then((value) => {
            switch (value) {
           
              case "confirm":
                handleAssign(id)
                navigate(0)
                break
           
              case "cancel":
                break
            }
          });
    }

    return (
        <div>
            <Card >
                <Card.Body style={{ display: 'flex' }}>
                    <div>
                        <BiUser style={{marginRight: "5px", width: "fit-content", fontSize: "600%"}}/>
                        {(is_seller) ? (
                            <Card.Text style={{ color: "black"}}>Vendedor</Card.Text>
                        ) : (
                            <Card.Text>Comprador</Card.Text>
                        )}
                    </div>
                    <div style={{marginLeft: "15px", textAlign: "left"}}>
                        <div>
                            <Card.Title style={{float: "left"}}>{first_name} {last_name}</Card.Title>
                        </div>
                        <Card.Text style={{marginTop: "35px", fontSize: "90%", color: "grey"}}>
                            Nombre de usuario: {username}, Email: {email}
                        </Card.Text>
                        <RemoveUserButton userId={id} />
                        {
                        (is_seller) ? (<RemoveSellerButton userId={id} />) : 
                        (<button className='displayed' onClick={() => assignSellerAlert()}>Asignar Vendedor</button>)
                        }
                    </div>
                </Card.Body>
            </Card>
            <br/>
        </div>
    );
}