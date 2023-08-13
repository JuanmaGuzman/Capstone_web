import { UserProfileService } from '../../lib/api/services/UserProfileService'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { AiFillExclamationCircle, AiOutlineSmile } from 'react-icons/ai'


export default function confirmEmail() {
	// Define states and query param fetcher
	const [loading, setLoading] = useState<boolean>(true)
	const [response, setResponse] = useState<{ succ: boolean, message: string }>(
		{ succ: false, message: 'Parámetros inválidos'}
	)
	const [searchParams, _setSearchParams] = useSearchParams()

	const sendEmailConfirmation = async () => {
		// Get query params
		const userId = searchParams.get('id')
		const confirmationToken = searchParams.get('token')
		if (userId === null || confirmationToken === null) { 
			setLoading(false)
			return 
		}
		// Send confirmation email and set response state depending on the response
		try {
			await UserProfileService.confirmEmail({
				id: Number(userId),
				token: confirmationToken,
			})
			setResponse({ succ: true, message: 'Mail confirmado con éxito.' })
			setLoading(false)
		} catch (err: any) {	
			if (err.status === 500) {
				setResponse({ succ: false, message: 'Error inesperado' })
				setLoading(false)
				return
			}
			setResponse({
				succ: false,
				message: String(Object.values(err.body.errors)[0])
			})
			setLoading(false)
		}
	}

	useEffect(() => {
		sendEmailConfirmation()
		console.log(loading)
	}, [])

	return (
		loading ? (
			<div className="container-lg m-auto">
				<h1 className="display-1 text-center">Cargando...</h1>
			</div>
		) : (
			<div className="container-lg m-auto">
				<h1 className="d-flex justify-content-center mx-auto">
					{
						response.succ ? 
							<IconContext.Provider value={{ color: "green", size: "10rem" }}>
								<AiOutlineSmile/>
							</IconContext.Provider>
						: 
							<IconContext.Provider value={{ color: "red", size: "10rem" }}>
								<AiFillExclamationCircle/>
							</IconContext.Provider>
					}
				</h1>
				<h1 className="display-1 text-center">{response.message}</h1>
			</div>
		)
	)
}
