import React from "react";
import {
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import logo from '../assets/logo.svg'


const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center mb-6 md:mb-0">
          <img
            src={logo} 
            alt="Logo Invitarly"
            className="w-36"
          />
        </div>
        <div className="text-center md:text-left max-w-xs mb-6 md:mb-0 gap-3.5">
          <p className="text-white text-lg font-medium leading-relaxed text-center">
            ¿Te gustó esta invitación y querés una así de especial para tu evento?
            <br />
            <span className="text-gray-300 text-center">¡Contactanos y la hacemos realidad!</span>
          </p>
        </div>

        <div className="flex items-center mt-6 md:mt-0">
          <a
            href="https://instagram.com/invitarly"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-xl hover:text-gray-400 transition-colors duration-300"
          >
            <FaInstagram size={30}/>
          </a>
          <a
            href="https://wa.me/542612768670?text=%C2%A1Hola!%20Tengo%20una%20duda%20sobre%20las%20invitaciones"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-xl hover:text-gray-400 transition-colors duration-300"
          >
            <FaWhatsapp size={30}/>
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Invitarly. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;