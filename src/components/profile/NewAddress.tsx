import { useState } from 'react'
import '../../styles/editProfileUser.css'
import useUser from '../../store/user'
import { useNavigate } from "react-router-dom"
import { UserShippingAddressCreate } from '../../lib/api/models/UserShippingAddressCreate'
import { object, string } from 'yup'
import swal from 'sweetalert'
import PlacesAutocomplete from "react-places-autocomplete"

const regiones = [
    'Arica y Parinacota',
    'Tarapacá',
    'Antofagasta', 
    'Atacama', 
    'Coquimbo', 
    'Valparaíso', 
    'Metropolitana de Santiago', 
    'Libertador General Bernardo OHiggins', 
    'Maule', 
    'Ñuble', 
    'Biobío', 
    'La Araucanía', 
    'Los Ríos',
    'Los Lagos',
    'Aysén del General Carlos Ibáñez del Campo',
    'Magallanes y de la Antártica Chilena'
]

var searchOptions = {
  componentRestrictions: {country: "cl"}

 };

export default function AddAddress(){
  
    const [loading, setLoading] = useState(false);
  
    const user:any = useUser();
  
    const navigate = useNavigate();
  
    // const [newAddress, setNewAddress] =useState<any>(() => {
    //   return({
    //     region: "",
    //     commune: "",
    //     address: ""
    //   })
    // })

    const [addressfield, setAddressfield] = useState("");
    const [region, setRegion] = useState("");

    const handleChange = (value:any) => {
        setAddressfield(value)

    }
    
    const handleSelect = (value:any) => {
        setAddressfield(value)
        }

    const handleSubmit = async (event:any) => {
        event.preventDefault()
        let address = addressfield.split(",")[0]
        let commune = addressfield.split(",")[1]
        let data1 = {region: region, commune: commune, address: address}
        
        await user.createShippingAddress(data1)
        navigate('/profile/shipping-address')
      }



    if (loading) {
      return <h2>Loading...</h2>;
    }
  
    // const formik = useFormik({
    //     initialValues: {
    //         region: "",
    //         commune: "",
    //         address: ""
    //     },
    // //   validate: (data) => {
    // //     let errors: UserShippingAddressCreate = {} as UserShippingAddressCreate
    // //     if (!data.region) {errors.region = 'La región es requerida'}
    // //     if (!data.commune) {errors.commune = 'La comuna es requerido'}
    // //     if (!data.address) {errors.address = 'La calle es requerido'}
    // //   },
    //     // validationSchema: validationSchema,
    //     onSubmit: async (data:any) => {
    //         // setNewAddress(data)
    //         console.log(data)
    //         const response = await user.createShippingAddress(data)
    //         console.log(response)
    //         if (JSON.parse(response).region){
    //         navigate ('/profile/shipping-address')
    //         }
    //         if (JSON.parse(response).status === 400){
    //           swal("Ya has registrado esta dirección", "", "warning")
    //         }
            
    //         // formik.resetForm()
    //     }
    // })
  
    // const isFormFieldValid = (name: keyof UserShippingAddressCreate) => {
    //       return !!(formik.touched[name] && formik.errors[name])
    //   }
    //   const getFormErrorMessage = (name: keyof UserShippingAddressCreate) => {
    //           return (
    //               isFormFieldValid(name) && 
    //               <small className="p-error">{formik.errors[name]}</small>
    //           )
    //   }
  
    return (
        <div>
          <h3 className='editTitle'> Ingresa nueva dirección</h3>
          <div className="container text-center testimonial-group mx-auto">
            <div className='dataDiv'>
              <form>
                <div className='formDiv'>
                    <label htmlFor="address" className='editLabel'>Dirección: </label>
                    <PlacesAutocomplete value={addressfield} onChange={handleChange} onSelect={handleSelect} searchOptions={searchOptions}>
                                {({
                                    getInputProps,
                                    suggestions,
                                    getSuggestionItemProps,
                                    loading,
                                }) => (
                                    <div>
                                    <input className="col-md-12"
                                    style={{paddingTop: "5px", border: "1px solid lightgrey", paddingBottom: "5px", borderColor: "lightgrey", borderRadius: "5px"}}
                                        {...getInputProps({
                                        // placeholder: "Selecciona la dirección de envío",
                                        })}
                                    />
                                    <div>
                                        {loading && <div>Loading...</div>}
                                        
                                        
                                        {suggestions.map((suggestion) => {
                                        const style = suggestion.active
                                            ? { backgroundColor: "#d3d3d3", cursor: "pointer" }
                                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                                        return (
                                            
                                            <div className="col-md-12" {...getSuggestionItemProps(suggestion, { style })}>
                                            {suggestion.description}
                                            </div>

                                        );
                                        })}
                                    </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                </div>
                
                <div className='formDiv'>
                  <label htmlFor="region" className='editLabel'>Región: </label>
                  <select onChange={(event:any) => {setRegion(event?.target.value)}} style={{paddingTop: "6px", paddingBottom: "6px", borderColor: "lightgrey", borderRadius: "5px"}} className="form-group mb-3 col-md-12">
                                <option value="sizeDefault"></option>
                                {
                                regiones.map((region:string, index:number) => (
                                    <option key={index} value={region}>{region}</option>
                                ))
                                }
                            </select>
                </div>
                <button type="submit" onClick={handleSubmit} id='updateProfile'>Guardar dirección</button>
              </form>
            </div>
          </div>
        </div>
        
    )
  }