import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { useAppDispatch } from './store/hooks'
import { getTokenFromLocalStorage } from './helpers/localstorag.helper'
import { toast } from 'react-toastify'
import { AuthService } from './services/auth.service'
import { login, logout } from './store/user/userSlice'
import { useEffect } from 'react'

function App() {
	const dispatch = useAppDispatch()

	const checkAuth = async () => {
		const token = getTokenFromLocalStorage()
		try {
			if (token) {
				const data = await AuthService.getProfile()

				if (data) {
					dispatch(login(data))
				} else {
					dispatch(logout())
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	useEffect(() => {
		checkAuth()
	}, [])
	
	return <RouterProvider router={router} />
}

export default App
