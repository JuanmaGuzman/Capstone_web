import Profile from '../../components/profile/UserProfile'

const ProfilePage = () => {

  if(localStorage.getItem('user')){
    return(
      <div>
          <Profile />
      </div>
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

export default ProfilePage;