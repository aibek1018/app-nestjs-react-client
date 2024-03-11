import React, { FC, useState } from 'react'
import { AuthService } from '../services/auth.service'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../store/hooks'
import { setTokenToLocalStorage } from '../helpers/localstorage.helper'
import { login } from '../store/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Auth: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isLogin, setIsLogin] = useState<boolean>(true)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.login({ email, password })

			if (data) {
				setTokenToLocalStorage('token', data.token)
				dispatch(login(data))
				toast.success('You logged in')
				navigate('/')
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.registration({ email, password })
			if (data) {
				toast.success('Accouny has been created')
				setIsLogin(!isLogin)
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white">
			<h1 className="mb-10 text-center text-xl">
				{isLogin ? 'Login' : 'Registration'}
			</h1>

			<form
				onSubmit={isLogin ? loginHandler : registrationHandler}
				className="mx-auto flex w-2/3 flex-col gap-5"
			>
				<input
					type="text"
					className="input"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					className="input"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className="btn btn-green mx-auto">Submit</button>
			</form>

			<div className="mt-5 flex justify-center">
				{isLogin ? (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						You don not hava an account?
					</button>
				) : (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						Alrady have an account?
					</button>
				)}
			</div>
		</div>
	)
}

export default Auth
