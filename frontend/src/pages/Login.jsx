import { useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../componets/Spinner'

function Login() {
  const [ formData , setFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email && !password) {
      toast.error('Please enter creds')
    } else {
      const userData = {
        email,
        password,
      }

      dispatch(login(userData))
    }
  }  

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
      <h1>
        <FaSignInAlt/> Login
      </h1>
    </section>

    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input type='text' className='form-control' id='email' name='email' value={email} placeholder='Please Enter Your email' onChange={onChange}/>
        </div>
        <div className='form-group'>
          <input type='text' className='form-control' id='password' name='password' value={password} placeholder='Please Enter Your password' onChange={onChange}/>
        </div>       
        <div className='form-group'>
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </div>
      </form>
    </section>
    </>    
  )
}

export default Login