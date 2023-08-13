import { useState, useEffect } from "react"
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


interface Props {
    payment: any,
    setName: any,
    setLastName: any,
    setPhone: any,
    setMail: any,
    setAddress: any,
    setRegion: any,
    address: string,
}

var searchOptions = {
    componentRestrictions: {country: "cl"}

   };

export default function AccountlessData({ payment, address, setName, setLastName, setPhone, setMail, setAddress,
                                        setRegion  }: Props) 
    {
    const handleChange = (value:any) => {
        setAddress(value)

    }
    
    const handleSelect = (value:any) => {
        setAddress(value)
        }

    return (
        <div className="col-md-6">
            <div className="card">
                <div className="card-header">
                    <h4>Datos </h4>
                </div>
                <div className="card-body">

                    <form className='row' onSubmit={payment}>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label>Nombres</label>
                                <input onChange={(event:any) => {setName(event?.target.value)}}
                                type="text" name="city" className="form-control" required/>
                                {/* <small className="text-danger">f</small> */}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label>Apellido Paterno</label>
                                <input onChange={(event:any) => {setLastName(event?.target.value)}}
                                type="text" name="state" className="form-control" required/>
                                {/* <small className="text-danger">g</small> */}
                            </div>
                        </div>
                        
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label> Celular</label>
                                <input onChange={(event:any) => {setPhone(event?.target.value)}} 
                                type="number" name="phone"  className="form-control" required/>
                                {/* <small className="text-danger">c</small> */}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label> Correo electrónico </label>
                                <input onChange={(event:any) => {setMail(event?.target.value)}}
                                type="email" name="email" className="form-control" required/>
                                {/* <small className="text-danger">d</small> */}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label> Dirección </label>
                            <input type="hidden" autoComplete="none"/>
                            <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect} searchOptions={searchOptions}>
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

                        <div className="col-md-6">
                            <label> Región </label>
                            <select onChange={(event:any) => {setRegion(event?.target.value)}} style={{paddingTop: "6px", paddingBottom: "6px", borderColor: "lightgrey", borderRadius: "5px"}} className="form-group mb-3 col-md-12">
                                <option value="sizeDefault"></option>
                                {
                                regiones.map((region:string, index:number) => (
                                    <option key={index} value={region}>{region}</option>
                                ))
                                }
                            </select>


                        </div>
                      
                        <div className="col-md-12">
                            <div className="form-group text-end">
                            <button className="displayed" type="submit">
                                Ir a pagar
                            </button> 
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>

    );
}
