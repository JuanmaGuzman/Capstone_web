import { Offcanvas, Container, Navbar, InputGroup, FormControl, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Header.css';
import HeaderContent from './HeaderContent';
import { GoSearch } from 'react-icons/go';


export default function Header() {

    return (
        <>
            <Navbar style={{ backgroundColor: "#bf3b4b" }} sticky="top" expand={"sm"} className="mb-3">
                <Container>
                    <Navbar.Brand as={NavLink} to="/" id='navbar-logo'>
                        <img style={{ width: "4.5vw", minWidth: "50px", maxWidth: "100px" }} src='https://i.ibb.co/yRYWJby/logopng.png' ></img>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls={`offcanvasNavbar`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar`}
                        aria-labelledby={`offcanvasNavbarLabel`}
                        placement="end">
                        <Offcanvas.Body>
                            <Navbar.Offcanvas
                                id={`offcanvasNavbar`}
                                aria-labelledby={`offcanvasNavbarLabel`}
                                placement="end">
                            </Navbar.Offcanvas>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            {/* <div className='search-bar'>
                                <InputGroup className="col-6" >
                                <FormControl
                                    placeholder="Busca un producto"
                                    aria-label="Search"
                                    aria-describedby="basic-addon2"
                                />
                                <Button id="button-addon2" style={{backgroundColor: '#bf3b4b'}} className="border border-white btn-sm">
                                    <GoSearch style={{fontSize: "100%"}}/>
                                </Button>
                                </InputGroup>
                            </div> */}
                            <HeaderContent />
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </>

    );
}