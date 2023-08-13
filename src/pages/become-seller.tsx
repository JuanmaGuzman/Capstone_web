import 'bootstrap/dist/css/bootstrap.min.css';
import './landing.css';


export default function AboutUs() {
    return (
        <div className='container text-center mx-auto'>
            <div className='row'>
                <h3>¿Quieres ser vendedor?</h3>
                <div className='col-12' style={{textAlign: "justify", marginTop: "15px",paddingLeft: "10%", paddingRight: "10%"}}>
                    
                    <p   style={{paddingLeft: "3%"}}> 
                        Para ser <strong style={{color: "#bf3b4b"}}>vendedor</strong>, debes seguir dos simples pasos:
                    </p>
                    <p   style={{paddingLeft: "3%"}}> 
                        <strong style={{color: "#bf3b4b"}}>1)</strong> Escríbenos un correo a <strong style={{color: "#bf3b4b"}}>contacto@nudoseline.com</strong>, el cual contenga tu nombre completo, tu RUT, y lo que deseas vender en Nudos Eline. 
                    </p>
                    <p   style={{paddingLeft: "3%"}}> 
                        <strong style={{color: "#bf3b4b"}}>2)</strong> Luego del paso 1, debes esperar un <strong style={{color: "#bf3b4b"}}>correo de confirmación </strong> en el que se te informará si fuiste aceptado como vendedor en nuestra página; junto a la aceptación, te llegarán una serie de instrucciones a seguir para completar el proceso. 
                    </p>
                    <p   style={{paddingLeft: "3%"}}> 
                        ¡Y listo! Eso es todo lo que se necesita para postular a ser vendedor en Nudos Eline. ¡Esperamos verte pronto vendiendo tus productos con nosotros!
                    </p>
                </div>
            </div> 
        </div>
    );
}
