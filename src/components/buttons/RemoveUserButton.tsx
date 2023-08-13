import './button.css'
import useUser from '../../store/user';
import swal from 'sweetalert';
import { useNavigate } from 'react-router'

interface Props {
  userId: number
}


export default function RemoveUserButton({ userId }: Props) {
    const user:any = useUser()
    const navigate = useNavigate()
    
    const handleRemove = async (userId:number) => {
        await user.removeUser(userId);
    }

    const alert = () => {
        swal({
            title: '¿Estas seguro que deseas borrar este usuario?',
            icon: 'warning',
            text: 'El usuario perderá acceso a su cuenta',
            buttons: {
              cancel: {
                text: "Cancelar",
                visible: true,
                value: 'cancel'
              },
              confirm: {
                text: "Eliminar",
                visible: true,
                value: 'confirm'
              }
            }
          })
          .then((value) => {
            switch (value) {
           
              case "confirm":
                handleRemove(userId)
                navigate('/admin/user/all')
                break
           
              case "cancel":
                break
            }
          });
    }

    return (
        <>
        <button className='displayed' style={{marginRight: "10px"}} onClick={() => alert()}>
            Eliminar Usuario
        </button>
        </>
    );
}