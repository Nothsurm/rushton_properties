import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
    const { currentUser } = useSelector(state => state.user)
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-around items-center first-line:mx-auto p-3'>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-3xl flex flex-wrap'>
                    <span className='text-slate-600'>Rushton</span>
                    <span className='text-slate-800'>Properties</span>
                </h1>
            </Link>
            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                <FaSearch className='text-slate-600'/>
            </form>
            <ul className='flex gap-6'>
                <Link to='/'>
                    <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li>
                </Link>
                <Link to='/about'>
                    <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>About</li>
                </Link>
                <Link to='/profile'>
                    {currentUser ? (
                        <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile pic" />
                    ): (
                        <li className=' text-slate-700 hover:underline cursor-pointer'>Sign in</li>
                    )}
                </Link>
            </ul>
        </div>
    </header>
  )
}
