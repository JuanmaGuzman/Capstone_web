import { Suspense, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from 'virtual:generated-pages-react'
import './common/fetch-intercept'
import AuthContextProvider from './contexts/AuthContextProvider'
import ProfileContextProvider from './contexts/ProfileContextProvider';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Loading from './components/loading/Loading'
import ProductContextProvider from './contexts/ProductContextProvider';
import CartContextProvider from './contexts/CartContextProvider';
import UserContextProvider from './contexts/UserContextProvider';
import TransactionContextProvider from './contexts/TransactionsContextProvider'


function App() {
  	return (
		<AuthContextProvider>
			<ProductContextProvider>
				<ProfileContextProvider>
					<CartContextProvider>
						<UserContextProvider>
							<TransactionContextProvider>
								<Header/>
								<Suspense fallback={<Loading/>}>
									{ useRoutes(routes) }
								</Suspense>
								<Footer/>
					    	</TransactionContextProvider>
            			</UserContextProvider>
          			</CartContextProvider>
				</ProfileContextProvider>
			</ProductContextProvider>
		</AuthContextProvider>
  )
}

export default App
