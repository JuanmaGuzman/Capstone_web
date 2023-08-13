import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import useUser from '../../../store/user'
import { useNavigate } from 'react-router'
import Loading from '../../../components/loading/Loading'
import UserItem from '../../../components/admin/UserItem'


export default function Users() {

    const user:any = useUser()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        user.allUsers()
        .then(setUsers)
        .finally(() => {
            setLoading(false)})
    }, []);

    if (loading) return (
        <Loading/>
    )

    return (
        <div className='container text-center mx-auto'>
            <h2 style={{marginBottom: "20px"}}>Usuarios</h2>
            <hr/>

                <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: "10px", gridAutoRows: "minmax(100px, auto)"}}>
                {
                    users.map((user:any) =>
                        <UserItem id={user.id} username={user.username} first_name={user.first_name} last_name={user.last_name} email={user.email} is_seller={user.is_seller}/>
                    )
                }
                </div>
        </div>
    );
}
