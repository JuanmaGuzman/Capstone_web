import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import useUser from '../../../store/user'
import { useNavigate } from 'react-router'
import Loading from '../../../components/loading/Loading'
import UserItem from '../../../components/admin/UserItem'


export default function Sellers() {

    const user:any = useUser()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        user.allSellers()
        .then(setUsers)
        .finally(() => {
            setLoading(false)})
    }, []);

    if (loading) return (
        <Loading/>
    )

    if (users.length == 0) {
        return (
            <div className="container my-5" style={{ textAlign: "center" }}>
            <div className="mt-4">
              <h4 className="fw-600" style={{color:'#bf3b4b', margin:250}}>No hay vendedores activos</h4>
            </div>
          </div>
        )
    }

    return (
        <div className='container text-center mx-auto'>
            <h2 style={{marginBottom: "20px"}}>Vendedores</h2>
            <hr/>

            <div className="row">
                <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: "10px", gridAutoRows: "1fr"}}>
                {
                    users.map((user:any) =>
                        <div>
                        <UserItem id={user.id} username={user.username} first_name={user.first_name} last_name={user.last_name} email={user.email} is_seller={user.is_seller}/>
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    );
}
