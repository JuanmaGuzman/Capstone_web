import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { useProfile } from "../../store/profile"

interface Props {
    payment: any
}

export default function ShippingOptions({ payment }: Props) {
    const profile:any = useProfile()
    const [loading, setLoading] = useState(true)
    const [addresses, setAddresses] = useState<any[]>([])
    const [shipping, setShipping] = useState(null)

    useEffect(() => {
        profile.getAllShippingAddresses()
        .then(setAddresses)
        .finally(setLoading(false))
    }, [loading])

    return (
        <div className="col-md-6">
            <div className="card">
                <div className="card-header">
                    <h4>Dirección de despacho </h4>
                </div>
                <div className="card-body">
                    {
                        (!loading) ? (
                            <>
                            {
                                (addresses.length > 0) ? (
                                    <>
                                    {
                                    addresses.map((item: any, key: number) =>
                                        <div key={key}>
                                        <input type="radio" className='radio-input' name="address" 
                                        value={item.id} onClick={(event:any) => {setShipping(event?.target.value)}}/>
                                        <label>{item.address}, {item.commune} ({item.region})</label>
                                        </div>
                                    )
                                    }
                                    <h6>¿No ves la dirección que quieres?</h6>
                                    </>
                                ) : (
                                    <>
                                    <h6>No tienes direcciones registradas aún.</h6>
                                   
                                    </>
                                )
                            }
                            <h6>Haz click <a href={'profile/shipping-address'} style={{fontWeight: "bold", textDecoration: "underline", color: "#bf3b4b"}}>aquí</a> para agregar una nueva.</h6> 
                            <div className="col-md-12">
                                <div className="form-group text-end">
                                    <button className="displayed" onClick={() => payment(shipping)}>
                                        Ir a pagar
                                    </button> 
                                </div>
                            </div>
                            </>
                        ) : null
                    }
                </div>
            </div>
        </div>

    );
}