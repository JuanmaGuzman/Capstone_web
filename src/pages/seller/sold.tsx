import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { useTransactions } from "../../store/history";
import '../../styles/NewPost.css'
import { useNavigate } from 'react-router'
import Loading from '../../components/loading/Loading'
import SellerPost from '../../components/seller/SellerPost'
import SoldItem from '../../components/seller/SoldItem';

const sold_items = {transaction_pointers: [
    {id: 0, amount: 1, price_per_unit: 100,
    transaction: {
        shipping_address: {id: 0, user: 0, region: "Región Metropolitana",
                  commune: "Las Condes", address: "Los Monjes 11821"},
        buyer: {email: "naty.anglada@uc.cl", first_name: "Natalia", last_name: "Anglada"},
        coupon: {
            id: 0, code: "XSACRSELINE", discount_percentage: 10}
        },
    publication_item: {id: 0, publication: 1,
        item: {
            id: 0, name: "Polera manga corta", brand: "Zara", size: "M", color: "Azul", sku: 123456799876,
            category: {id: 0, name: "Poleras y Camisas"}
        },
        available: 4
        }}],
    accountless_transaction_pointers: [
      {
        id: 0,
        amount: 0,
        price_per_unit: 0,
        transaction: {
          buyer_name: "Natalia", buyer_lastname: "Anglada", phone_number: "+56931943194",
          region: "Región Metropolitana", commune: "Las Condes", address: "Los Monjes 11822",
          coupon: {
            id: 1, code: "ABSDCELINE", discount_percentage: 10
          }
        },
        publication_item: {id: 0, publication: 1,
            item: {
                id: 0, name: "Polera manga corta", brand: "Zara", size: "M", color: "Azul", sku: 123456799876,
                category: {id: 0, name: "Poleras y Camisas"}
            },
            available: 4
        }
      }
    ]
}

export default function Sold() {

    const transactions:any = useTransactions()
    const [soldProducts, setSoldProducts] = useState({accountless_transaction_pointers: [], transaction_pointers: []})
    const [loading, setLoading] = useState(true)

    async function getSoldProducts(){
        setSoldProducts(JSON.parse(await transactions.getSells()))
        setLoading(false)
    }
    useEffect(() => {
        getSoldProducts()
        if (!loading) {
            console.log(soldProducts)
        }
        console.log(sold_items)
    }, [loading])

    
    if (loading) {
        return (
            <div>
                <section className='container'>
                    <h2 style={{marginTop: "1000px"}}>Loading...</h2>
                </section>
            </div>
        )
    }

    return (
        <div className='container text-center mx-auto'>
            <h2 style={{marginBottom: "20px"}}>Mis ventas</h2>
            {
                (!loading) ? (
                    <>
                        {
                            (soldProducts.accountless_transaction_pointers.length === 0 && 
                            soldProducts.transaction_pointers.length === 0) ? (
                            // (sold_items.accountless_transaction_pointers.length === 0 && 
                            //     sold_items.transaction_pointers.length === 0) ? (
                                <p style={{marginTop: "2rem", fontSize: "140%"}}>
                                    Aún no has vendido ningún producto.
                                </p>
                            ): (
                                <>
                                {
                                    soldProducts.transaction_pointers.map((item: any, key: number) =>
                                    // sold_items.transaction_pointers.map((item: any, key: number) =>
                                        <SoldItem item={item} id={key} type={'accountful'}/>
                                    )
                                }
                                {
                                    soldProducts.accountless_transaction_pointers.map((item: any, key: number) =>
                                    // sold_items.accountless_transaction_pointers.map((item: any, key: number) =>
                                        <SoldItem item={item} id={key} type={'accountless'}/>
                                    )
                                }
                                </>
                            )
                        }
                    </>
                ) : null
            }
        </div>
    );
}
