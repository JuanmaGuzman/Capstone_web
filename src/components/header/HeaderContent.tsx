import { NavLink } from "react-router-dom"
import { Nav, Navbar, NavDropdown,InputGroup, FormControl,Button, Dropdown } from "react-bootstrap"
import Login from '../session/Login'
import useAuth from '../../store/auth'
import {useEffect, useState} from 'react'
import Popup from "../Popup"
import { BsCart, BsHouseDoor } from 'react-icons/bs'
import { GoSearch } from 'react-icons/go'
import { BiUser } from 'react-icons/bi'
import { useProfile } from "../../store/profile"
import useProduct from '../../store/product'
import { useNavigate } from 'react-router'


export default function HeaderContent() {
    const auth:any = useAuth()
    const profile:any = useProfile()
    const product:any = useProduct()
    const [buttonPopup, setButtonPopup] = useState(false)
    const [user, setUser] = useState<any>()
    const [categories, setCategories] = useState([])
    let localUser = localStorage.getItem('user')

    const [value, setValue] = useState("");
    const [allproducts, setAllproducts] = useState([])
    const navigate = useNavigate();
    

    const onChange = (event:any) => {
        setValue(event.target.value);
    };

    //cuando se apreta un item especifico de las opciones que entrega la barra de busqueda
    const onSelect = (searchTerm:any) => {
        setValue(searchTerm);
        console.log("search ", searchTerm);
        navigate(`/products/${searchTerm}`);
        window.location.reload();
    };

    //cuando se apreta la lupita de buscar
    const onSearch = (searchTerm:any) => {
        setValue(searchTerm);
        console.log("search ", searchTerm);
        localStorage.setItem('searchquery', searchTerm)
        navigate(`/searchpage`); //cambiar por filtrado
        setValue("");
    };

    useEffect(() => {
        if (auth.isLoggedIn() || localUser != null) {
            profile.getInformationUser()
            .then(setUser)
        }
        product.allCategories()
        .then(setCategories)   
    },[buttonPopup, localUser])

    useEffect(() => {
        product.activePublications()
              .then(setAllproducts)
      }, [])

    const SessionButton = () => {
        if (!auth.isLoggedIn() && localUser === null) {
            return <button className='nav-link' style={{backgroundColor: "transparent", border: "none", color: "white"}} onClick={() => setButtonPopup(true)}>Iniciar Sesión</button>
        }
        else {return null}
    };

    return (
        <>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
                <NavDropdown style={{marginTop: "6px"}} title="Categorías" id="collasible-nav-dropdown">
                {
                    categories.slice(0, 6).map((item:any, key:number) =>
                    <NavDropdown.Item key={key} href={`/catalog/${item.name}`}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</NavDropdown.Item>
                    )
                }
                <NavDropdown.Divider />
                <NavDropdown.Item href='/categories'>Ver todas las categorías</NavDropdown.Item>
                </NavDropdown>
                {/* <Nav.Item style={{marginRight: "10px", color: "white"}} id='web-display'>
                    <form className="search">
                        <input type="text" placeholder="Buscar" className="search-input"/>
                        <button type='button' className="search-btn">
                            <GoSearch style={{fontSize: "180%"}}/>
                        </button>
                    </form>
                </Nav.Item> */}
                <Nav.Item>
                <div className='search-bar'>
                <InputGroup className="col-6" onChange={onChange}>
                <FormControl
                    placeholder="Busca un producto"
                    value={value}
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                />
                <Button id="button-addon2" style={{backgroundColor: '#bf3b4b'}} className="border border-white btn-sm" onClick={() => onSearch(value)}>
                    <GoSearch style={{fontSize: "100%"}}/>
                </Button>
                {value !== "" && 
                    <Dropdown.Menu show variant="light">
                        {allproducts
                            .filter((item:any) => {
                            const searchTerm = value.toLowerCase();
                            const fullName = item.general_item_info.name.toLowerCase();

                            return (
                                searchTerm &&
                                fullName.startsWith(searchTerm) &&
                                fullName !== searchTerm
                            );

                            })
                            .slice(0, 7)
                            .map((item:any) => (
                            <div
                                onClick={() => onSelect(item.id)}
                                key={item.general_item_info.name}
                                
                                
                            >
                                {item.general_item_info.name}
                            </div>
                            ))}
                    </Dropdown.Menu>
                }
                </InputGroup>
                
                </div>
                
                </Nav.Item>
                <Nav.Link as={NavLink} id='web-display' to="/" style={{marginRight: "10px", marginTop: "2px"}}><BsHouseDoor style={{fontSize: "180%"}}/></Nav.Link>
                <Nav.Link as={NavLink} id='mobile-display' to="/" style={{marginRight: "20px", marginTop: "2px"}}><BsHouseDoor style={{fontSize: "180%", marginRight: "15px"}}/> Volver al inicio</Nav.Link>
                
                <Nav.Link as={NavLink} id='web-display' to="/cart" style={{marginRight: "10px"}}><BsCart style={{fontSize: "180%"}}/></Nav.Link>
                <Nav.Link as={NavLink} id='mobile-display' to="/cart" style={{marginRight: "10px"}}><BsCart style={{fontSize: "180%", marginRight: "15px"}}/> Carro de compras</Nav.Link>
                {
                    (auth.isLoggedIn() || localUser != null) ? (
                        <>
                        <Nav.Link as={NavLink} id='web-display' to="/profile"><BiUser style={{fontSize: "180%"}}/></Nav.Link>
                        <Nav.Link as={NavLink} id='mobile-display' to="/profile"><BiUser style={{fontSize: "180%", marginRight: "15px"}}/> Mi perfil</Nav.Link>
                        </>
                    ) : null
                }
                <Nav.Link><SessionButton/></Nav.Link>
                {
                    (user?.is_seller && localUser != null) ? (
                        <NavDropdown style={{marginTop: "6px"}} title="Vender" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/seller/posts">Mis publicaciones</NavDropdown.Item>
                            <NavDropdown.Item href="/seller/sold">Mis ventas</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/seller/new-post">Crear publicación</NavDropdown.Item>
                        </NavDropdown>
                    ) : null
                }
                {
                    (user?.is_admin && localUser != null) ? (
                        <NavDropdown style={{marginTop: "6px"}} title="Administrar" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/admin/products/all">Publicaciones nuevas</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/admin/coupons/all">Cupones</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/coupons/new-coupon">Crear cupón</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/admin/users/sellers">Vendedores</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/users/all">Usuarios</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/admin/new-category">Crear categoría</NavDropdown.Item>
                        </NavDropdown>
                    ) : null
                }
                
                
            </Nav>
        </Navbar.Collapse>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <Login setTrigger={setButtonPopup}/>
        </Popup>
        </>
    );
}
