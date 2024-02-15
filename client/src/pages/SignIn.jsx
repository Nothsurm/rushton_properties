import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import OAuth from "../components/OAuth.jsx";


export default function SignIn() {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value, //eg. {username: michael(whatever user types in username field)}
    });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents page refresh
    try {
      dispatch(signInStart());
      const result = await fetch('/api/auth/signin', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    const data = await result.json();
    if(data.success === false) {
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/')   //takes user to the sign-in page on successful completion of sign-up
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
          type="email" 
          placeholder='email' 
          className='border p-3 rounded-lg' 
          id='email' 
          onChange={handleChange}
        />
        <input 
          type="password" 
          placeholder='password' 
          className='border p-3 rounded-lg' 
          id='password' 
          onChange={handleChange}
        />
        <button 
          disabled={loading} 
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex flex-col gap-4 mt-5'>
        <div className="flex flex-row gap-2">
          <p>Forgot your password?</p>
          <Link to={'/forgotPassword'}>
            <span className='text-blue-700 hover:underline'>Click here</span>
          </Link>
        </div>
        <div className="flex flex-row gap-2">
          <p>Dont Have an account?</p>
          <Link to={'/sign-up'}>
            <span className='text-blue-700 hover:underline'>Sign up</span>
          </Link>
        </div>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
