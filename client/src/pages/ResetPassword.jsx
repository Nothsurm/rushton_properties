import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function ResetPassword() {
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
    };

    const navigate = useNavigate()

    const {token} = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const res = await fetch('/api/user/resetPassword/'+token, {
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
                toast.success('Password successfully reset')
                navigate('/sign-in')
            }
        } catch (error) {
            setLoading(false);
            setError(error.message)
        }
 } 

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Reset Password</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
          {loading ? 'Changing Password...' : 'Change'}
        </button>
      </form>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
