import Purchase from '../../components/profile/PurchaseHistory'

const HistoryPage = () => {

  if(localStorage.getItem('user')){
    return(
      <div>
          <Purchase />
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

export default HistoryPage;