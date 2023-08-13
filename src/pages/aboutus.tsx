import 'bootstrap/dist/css/bootstrap.min.css';
import './landing.css';


export default function AboutUs() {
    return (
        <div className='container text-center mx-auto'>
            <div className='row'>
                <div className='col-3' style={{backgroundColor: "#f1ccc4", alignItems: "center", justifyContent: "center", display: "flex"}}>
                <h2>¿Quiénes <br/>
                    somos?</h2>
                </div>
                <div className='col-9' style={{textAlign: "justify", marginTop: "15px"}}>
                    <p style={{paddingLeft: "10%", paddingRight: "10%"}}>Somos una empresa de venta al por menor, experta en <strong style={{color: "#bf3b4b"}}>ayudar a nuestros clientes</strong> a encontrar la vestimenta perfecta.  También puedes encontrar todos los accesorios personalizados y hechos a mano para perfeccionar tu hogar.</p>
                    <p style={{paddingLeft: "10%", paddingRight: "10%"}}>Nuestra fundadora Jacqueline, hoy se suma a la <strong style={{color: "#bf3b4b"}}>venta online</strong> para llegar a más lugares. Este sitio fue creado en el proyecto Capstone del Departamento de Ciencia de la Computación de Ingeniería UC por las y los desarrolladores: Natalia, Andrés, José, Juan, Francisco, Katherine, Matías, Ignacio, Josefa, Maximiliano y Sebastián.</p>
                </div>
            </div>

            
            
        </div>
    );
}
