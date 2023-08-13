
import './landing.css';
import swal from 'sweetalert';
import useCart from '../store/cart'


export default function TranferData() {
    const cart:any = useCart()
    const checkout = () => {
        swal("Tu orden de compra ha sido creada!", "Contactaremos a tu dirección de e-mail cuando se verifique el pago", "success").then(
          () => {
            window.location.href = "/";
          }
        );
        cart.removeCart()
      };
    return (
        <div className='container text-center mx-auto'>
            <h2 style={{ marginTop: "2%"}}>Pago de compra</h2>
            <p style={{textAlign: "center", marginLeft: "auto", marginRight: "auto"}}>
                Realiza la transferencia a los siguientes datos para estar un paso más cerca de finalizar tu compra
            </p>
            <hr/>
            <div className='quota'>
            <div style={{display: "flex", justifyContent: "center"}}>
            <p style={{color: "#bf3b4b", fontWeight: "bold", display: "inline-flex"}}>
                Titular:
            </p>
            <p style={{display: "inline-flex", marginLeft: "6px"}}>
                Nudos Eline
            </p>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
            <p style={{color: "#bf3b4b", fontWeight: "bold", display: "inline-flex"}}>
                Rut:
            </p>
            <p style={{display: "inline-flex", marginLeft: "6px"}}>
                1.111.111-1
            </p>
            </div>
            <div style={{display: "flex",  justifyContent: "center"}}>
            <p style={{color: "#bf3b4b", fontWeight: "bold", display: "inline-flex"}}>
                Banco:
            </p>
            <p style={{display: "inline-flex", marginLeft: "6px"}}>
                Banco Edwards
            </p>
            </div>
            <div style={{display: "flex",  justifyContent: "center"}}>
            <p style={{color: "#bf3b4b", fontWeight: "bold", display: "inline-flex"}}>
                Cuenta Corriente N°:
            </p>
            <p style={{display: "inline-flex", marginLeft: "6px"}}>
                0123456789
            </p>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
            <p style={{color: "#bf3b4b", fontWeight: "bold", display: "inline-flex"}}>
                Correo:
            </p>
            <p style={{display: "inline-flex", marginLeft: "6px"}}>
                nudoseline@gmail.com
            </p>
            
            </div>   
            <button onClick={checkout} className="btn btn-primary" type="button" style={{backgroundColor:'#bf3b4b', border:"#bf3b4b"}}>
                He realizado el pago
            </button> 
            </div>
        </div>
    )
}