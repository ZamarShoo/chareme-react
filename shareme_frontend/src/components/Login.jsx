import React from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

import { client } from '../client'

const Login = () => {

    const navigate = useNavigate()
    const responceGoogle = res => {
        localStorage.setItem('user', JSON.stringify(res.profileObj))

        const { name, googleId, imageUrl} = res.profileObj

        const data = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageUrl
        }

        client.createIfNotExists(data)
            .then(() => {
                navigate('/', {replace: true})
            })
    }

    return (
        <div className="flex justify-center w-full items-center h-screen bg-gray-900">
            <div className="flex flex-col justify-center items-center">
                <h2 className='text-white font-black tracking-wider text-2xl mb-4'>SHARE ME</h2>
                <GoogleLogin 
                    clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                    render={(renderProps) => (
                        <button
                            type='button'
                            className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            
                        >
                            <FcGoogle className='mr-4' />
                            Войти с помощью Google
                        </button>
                    )}
                    onSuccess={responceGoogle}
                    onFailure={responceGoogle}
                    cookiePolicy='single_host_origin'
                />
            </div>
        </div>
    )
}

export default Login
