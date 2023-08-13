import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useMemo, useState } from 'react'
import { useProfile } from '../../store/profile'
import useProduct from '../../store/product'
import '../../styles/NewPost.css'
import { useNavigate } from 'react-router'
import Loading from '../../components/loading/Loading'
import SellerPost from '../../components/seller/SellerPost'

export default function Posts() {

    const profile:any = useProfile()
    const product:any = useProduct()
    const [user, setUser] = useState<any>()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [buttonPopup, setButtonPopup] = useState(false)

    useEffect(() => {
        profile.getInformationUser()
        .then(setUser)
        .finally(() => {
            setLoading(false)})
    }, []);

    useMemo(() => {
        if (!loading) {
            console.log(user)
            product.getUserPublications(user.id)
                .then(setProducts)
                // .finally(console.log(products))
        }
        else {
            <Loading/>
        }
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
            <h2 style={{marginBottom: "20px"}}>Mis publicaciones</h2>
            {
                
                products.map((item:any, key:number) => 
                <div key={key}>
                    <SellerPost item={item} id={key}/>
                </div>
                )
            }
            {
                (products.length === 0) ? (
                    <>
                    <p style={{marginTop: "4rem", fontSize: "140%"}}>
                        Aún no has creado ninguna producto. 
                    </p>
                    <p style={{marginBottom: "4rem", fontSize: "140%"}}>
                        Haz click <a style={{color: "#bf4b3b", fontWeight: "bold"}} href={'./new-post'}>aquí</a> para comenzar a publicar.
                    </p>
                    </>
                ) : null
            }
        </div>
    );
}
