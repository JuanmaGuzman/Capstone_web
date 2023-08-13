import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiMail, FiMapPin } from 'react-icons/fi';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { BsPerson, BsWhatsapp, BsShieldLock } from 'react-icons/bs';

const footerStyle = {
    backgroundColor: "#bf3b4b",
    width: "100%",
    position: "relative" as any,
    bottom: "0",
    top: "0",
};

export default function Footer() {
    return (
        <footer className="mt-3 p-5 mt-5 text-light" style={footerStyle}>
            <Container>
                <Row>
                    <Col>
                        <h2>Nudos Eline</h2>
                    </Col>

                </Row>
                <Row>
                    <Col>
                    <img style={{ width: "10vw", minWidth: "50px", maxWidth: "200px" }} src='https://i.ibb.co/yRYWJby/logopng.png' ></img>
                    </Col>
                    <Col>
                    <h5>Contáctanos</h5>
                        
                        <p>
                            <a><FiMail style={{marginRight: "5px"}}/> contacto@nudoseline.com</a>
                        </p>
                        <p>
                            <a style={{textDecoration: "none", color: "white"}} target="_blank" href="https://api.whatsapp.com/send/?phone=56962577416&text&type=phone_number&app_absent=0"><BsWhatsapp style={{marginRight: "5px"}}/> +56962577416</a>
                        </p>
                        <p><FiMapPin style={{marginRight: "5px"}}/> Santiago, Chile</p>
                    </Col>
                    <Col>
                    <h5>Nosotros</h5>
                        <p>
                            <Link style={{textDecoration: "none", color: "white"}} to={'/aboutus'}> <IoMdInformationCircleOutline style={{marginRight: "5px"}}/>Quiénes somos</Link>
                        </p>
                        <p>
                           <Link style={{textDecoration: "none", color: "white"}} to={'/become-seller'}> <BsPerson style={{marginRight: "5px"}}/>Postula a ser vendedor </Link>
                            
                        </p>
                        <p>
                        <Link style={{textDecoration: "none", color: "white"}} to={'/termsandconditions'}> <BsShieldLock style={{marginRight: "5px"}}/>Términos, condiciones y políticas</Link>
                        </p>
                        
                    </Col>
                    
                </Row>
            </Container>

        </footer>
    );
}
