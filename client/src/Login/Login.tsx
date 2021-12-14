import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

function Login() {
  const responseGoogle = async (response: any) => {
    console.log(response.tokenId)
    const token = response.tokenId

    const result = await axios.post(
      'http://localhost:5000/api/v1/google/login',
      {
        id_token: token,
      }
    )
    localStorage.setItem('token', result.data)
    console.log(result)
  }

  const getAllBooks = async () => {
    const tokens = localStorage.getItem('token')
    const requestHeader = {
      Authorization: `Bearer ${tokens}`,
    }
    const books = await axios.get('http://localhost:5000/api/v1/books', {
      headers: requestHeader,
    })
    console.log(books.data, 'books')
  }

  useEffect(() => {
    getAllBooks()
  }, [])
  return (
    <div>
      <GoogleLogin
        clientId="841798970766-vgfto4v393lf3csml61g65veitvjinvk.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}

export default Login
