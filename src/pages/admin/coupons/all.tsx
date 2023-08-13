import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { useTransactions } from "../../../store/history";
import Loading from '../../../components/loading/Loading'
import CouponItem from '../../../components/admin/CouponItem'


export default function Coupons() {

    const transactions:any = useTransactions()
    const [coupons, setCoupons] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        transactions.allCoupons()
        .then(setCoupons)
        .finally(() => {
            setLoading(false)})
    }, []);

    if (loading) return (
        <Loading/>
    )

    if (coupons.length == 0) {
        return (
            <div className="container my-5" style={{ textAlign: "center" }}>
            <div className="mt-4">
              <h4 className="fw-600" style={{color:'#bf3b4b', margin:240}}>No hay cupones disponibles</h4>
            </div>
          </div>
        )
    }

    return (
        <div className='container text-center mx-auto'>
            <h2 style={{marginBottom: "20px"}}>Cupones</h2>
            <hr/>

                <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: "10px", gridAutoRows: "minmax(100px, auto)"}}>
                {
                    coupons.map((coupon:any) =>
                        <CouponItem id={coupon.id} name={coupon.name} code={coupon.code} discount_percentage={coupon.discount_percentage} active={coupon.active}/>
                    )
                }
                </div>
        </div>
    );
}