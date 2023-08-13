import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useState, useEffect, useMemo } from 'react';
import { useTransactions } from "../../store/history";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../buttons/button.css'
import { RiCoupon2Line } from 'react-icons/ri';
import swal from 'sweetalert';



interface Props {
    id: number,
    name: string,
    code: string,
    discount_percentage: number,
    active: boolean
}

export default function ProductItem({ id, name, code, discount_percentage, active }: Props) {

    const navigate = useNavigate()
    const transactions:any = useTransactions()
    const [activeState, setActive] = useState(active);

    const StateButton = () => {
        if (activeState) 
            return <button className='displayed' style={{marginRight: "15px"}} onClick={() => handleDeactivate(id)}>Desactivar</button>
        else 
            return <button className='displayed' style={{marginRight: "15px"}} onClick={() => handleActivate(id)}>Activar</button>
    }

    const handleDeactivate = async (couponId:number) => {
        await transactions.deactivateCoupon(couponId);
        setActive(false);
        swal({
            title: 'Cupón desactivado',
            text: ' ',
            icon: 'warning',
            timer: 1500
          })
        window.location.reload()
    }

    const handleActivate = async (couponId:number) => {
        await transactions.activateCoupon(couponId)
        setActive(true)
        swal({
            title: 'Cupón activado',
            text: ' ',
            icon: 'warning',
            timer: 1500
          })
        window.location.reload()
    }

    const handleDelete = async (couponId:number) => {
        await transactions.deleteCoupon(couponId);
    }

    const deleteAlert = () => {
        swal({
            title: '¿Estas seguro que deseas eliminar este cupón?',
            icon: 'warning',
            text: 'Se eliminará permanentemente',
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
            console.log(value)
            switch (value) {
              case "confirm":
                handleDelete(id)
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
                        <RiCoupon2Line style={{marginRight: "5px", width: "fit-content", fontSize: "600%"}}/>
                        {(active) ? (
                            <Card.Text style={{ color: "black"}}>Activo</Card.Text>
                        ) : (
                            <Card.Text>Inactivo</Card.Text>
                        )}
                    </div>
                    <div style={{marginLeft: "15px", textAlign: "left"}}>
                        <div>
                            <Card.Title style={{float: "left"}}>{name} | {code}</Card.Title>
                        </div>
                        <Card.Text style={{marginTop: "35px", fontSize: "90%", color: "grey"}}>
                            Descuento: {discount_percentage}%
                        </Card.Text>
                        <StateButton/>
                        <button className='displayed' onClick={() => deleteAlert()}>Eliminar</button>
                    </div>
                </Card.Body>
            </Card>
            <br/>
        </div>
    );
}