import Detail from '../../components/profile/PurchaseDetail'
import { useLocation } from "react-router-dom"
import { TransactionSchema } from '../../lib/api/models/TransactionSchema'

const DetailPage = () => {

  if(localStorage.getItem('user')){
    const information:any = useLocation()
    // const purchase = state.info
    const purchase:TransactionSchema = information.state.info
    // console.log(purchase)

    return(
      <div>
          {/* <p>Test</p> */}
          <Detail {...purchase} />
          {/* {console.log(sentInformation)} */}
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
  // return(
  //       <div>
  //         <h3 style={{marginTop: '70px'}}>Inicia sesión para ver tu información personal</h3>
  //       </div>
  //     )
}

export default DetailPage;