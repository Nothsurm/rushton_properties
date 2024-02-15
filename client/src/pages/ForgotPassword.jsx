import { useState } from "react"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const res = await fetch('/api/user/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json()
            if (data.success === false) {
                setError(data.message)
                setLoading(false)
                return;
            } else {
                setLoading(false)
                setSuccess(data.message)
            }
        } catch (error) {
            setLoading(false);
            setError(error.message)
        }
 } 
  
 return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Forgot Password</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
          type="email" 
          placeholder='email' 
          className='border p-3 rounded-lg' 
          id='email' 
          onChange={handleChange}
        />
        <button 
          disabled={loading} 
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
          {loading ? 'Sending...' : 'Send Link'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Remember your password?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700 hover:underline'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      {success && <p className='text-green-500 mt-5'>{success}</p>}
    </div>
  )
}
