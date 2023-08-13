import './button.css'
import useUser from '../../store/user';
import swal from 'sweetalert';
import { useNavigate } from 'react-router'

interface Props {
  userId: number
}


export default function RemoveSellerButton({ userId }: Props) {
    const user:any = useUser()
    const navigate = useNavigate()
    
    const handleRemove = async (userId:number) => {
        await user.removeSeller(userId);
    }

    const alert = () => {
        swal({
            title: '¿Estas seguro que deseas quitar el vendedor?',
            icon: 'warning',
            text: 'El usuario perderá acceso a la sección de vendedor',
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
                navigate(0)
                break
           
              case "cancel":
                break
            }
          });
    }

    return (
        <>
        <button className='displayed' onClick={() => alert()}>
            Eliminar Vendedor
        </button>
        </>
    );
}