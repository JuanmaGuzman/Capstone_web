import ChangePassword from '../../components/profile/ChangePassword'

const Password = () => {

  if(localStorage.getItem('user')){
    return(
        <ChangePassword />
      )
  }
  else{
    return(
      <div>
        <h3 style={{marginTop: '70px'}}>Inicia sesión para ver tu información personal</h3>
      </div>
    )
  }
}

export default Password;