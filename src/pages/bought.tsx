import 'bootstrap/dist/css/bootstrap.min.css';

export default function Bought() {
    return (
        <div className="container text-center mx-auto">
            <h3 style={{ marginTop: "1em"}}>¡Felicidades! Tu compra fue efectuada con éxito.</h3>
            <img style={{width: "20%", height: "fit-content"}} src='https://i.ibb.co/yRYWJby/logopng.png'></img>
            <p style={{fontSize: "110%"}}>Si es que compraste como usuario registrado, puedes revisar tus compras 
            realizadas haciendo click <a style={{color: "#bf3b4b", fontWeight: "bold"}} href='profile/historial'>aquí</a>.
            </p>
            <p style={{fontSize: "110%"}}>Esperamos que tu experiencia con Nudos Eline haya sido grata y te invitados a seguir comprando.</p>
        </div>
    );
}
