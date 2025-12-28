import React from 'react'
import dressCode from '../assets/dress-code.svg'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const DressCode = ({dress_code}) => {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación en milisegundos
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className="font-montserrat mt-20 flex flex-col justify-center items-center py-20">
        <h3 className='text-gray-950 text-4xl text-center px-5 md:px-0 font-light tracking-widest' data-aos= 'fade-up'>Código de Vestimenta</h3>
        <img src={dressCode} alt="regalo" className="w-56 pt-10" data-aos= 'fade-up'/>
        <p className='uppercase text-xl font-light text-gray-700' data-aos= 'fade-up'>{dress_code}</p>
        {/* <p
            className="text-center text-gray-700 mt-4 font-montserrat text-lg px-6"
            data-aos="fade-up"
          >
            Por favor, evitar vestir de color <span className="font-semibold">verde</span>.
          </p> */}
    </div>
  )
}

export default DressCode
