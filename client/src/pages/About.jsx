import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';

export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-7 text-slate-800'>About Rushton Properties</h1>
      <p className='mb-4 text-slate-700'>Rushton Properties is a leading real estate agency that specializes in helping clients, buy sell or rent properties in luxurious neighbourhoods. Established in 2001, our agents have set the standard high in ensuring a smooth buying and selling experience.</p> 
      <p className='mb-4 text-slate-700'>Our goals are to help clients achieve their real estate dreams by providing expert advice, personalized service and a deep understanding of the local market. Whether you are looking to buy, rent or sell a property we are here to help you every step of the way.</p>
      <p className='mb-7 text-slate-700'>Either sign up yourself and put up your own property for sale or rent, or browse properties currently for sale in the surrounding area. Our properties offer an extensive range in price and location suitable for anyones needs.</p>
      <p className='mb-4 text-slate-700'>If you have further questions please get in touch below:</p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 items-center">
          <MdEmail className='text-red-800' />
          <p>RushtonProperties@email.com</p>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <FaPhoneAlt className='text-blue-800' />
          <p>+44 77777-33234</p>
        </div>
      </div>
    </div>
  )
}
