import cancion from "../assets/song.mp3";
import "remixicon/fonts/remixicon.css";
import Countdown from "./Countdown";
import GoogleCalendarButton from "./GoogleCalendarButton";
import DressCode from "./DressCode";
import DatosBancarios from "./DatosBancarios";
import Asistencia from "./Asistencia";
import Footer from "./Footer";
import TextoFinal from "./TextoFinal";
import MusicScreen from "./MusicScreen";
import { GalleryPraga } from "./GalleryPraga";
import LugaresPraga from "./LugaresPraga";
import SongRecommendations from "./SongRecommendations";
// import hojasVerdes2 from "../assets/hojasVerdes2.svg";
// import hojasVerdesIzq from "../assets/hojasVerdesIzq.svg";


const Invitacion = () => {
  const targetDate = new Date("2026-02-28T21:00:00-03:00");

  const colorPrincipal = "#8B9E8D";

  return (
    <div className="w-full relative font-modernaText overflow-hidden">
      <div className="absolute">
        <MusicScreen cancion={cancion} />
      </div>
      <div className="relative flex items-center justify-center h-screen w-full text-center bg-fondo-praga-mobile md:bg-fondo-praga bg-cover bg-no-repeat">
        <div className="absolute inset-0 bg-black" />
        {/* Imagen para mobile */}
        <img
          src="https://res.cloudinary.com/dheeykiqu/image/upload/v1766885534/IMG_5728_swrkqw.jpg"
          alt="Fondo nombres"
          className="absolute inset-0 w-full h-full object-cover opacity-80 md:hidden"
        />
        {/* Imagen para desktop */}
        <img
          src="https://res.cloudinary.com/dheeykiqu/image/upload/v1766885534/IMG_5726_wh1wcu.jpg"
          alt="Fondo nombres desktop"
          className="absolute inset-0 w-full h-full object-contain opacity-80 hidden md:block"
        />
        <div
          data-aos="fade-in"
          className="relative z-10 flex flex-col justify-between h-full w-full text-center"
        >
          {/* Texto arriba */}
          <div className="pt-16">
            <p className="text-lg md:text-3xl uppercase tracking-widest text-white font-montserrat mb-4">
              ¡Nos Casamos!
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 font-tangerine">
              Mica &amp; Fran
            </h1>
            <p className="text-lg md:text-xl text-white font-montserrat">
              28 / 02 / 2026
            </p>
          </div>

          {/* Texto abajo */}
        </div>
      </div>
      <div>
        <div
          data-aos="fade-up"
          className="w-full text-center px-8 md:px-20 py-10 font-montserrat"
        >
          <p className="text-lg md:text-2xl text-gray-700 leading-relaxed italic">
            Bendito Dios por encontrarnos en el camino
          </p>
        </div>
        <section
          id="contador"
          className="bg-beige w-full flex flex-col items-center justify-center gap-y-5 py-10 font-thin"
        >
          <Countdown
            containerClasses={
              "w-full flex flex-col justify-center items-center gap-y-5 font-montserrat"
            }
            targetDate={targetDate}
          />
        </section>

        <LugaresPraga
          linkCeremonia="https://maps.app.goo.gl/MgBX2dwC47P99DNr8"
          nombreIglesia="Parroquia San Isidro Labrador (Padre Doglia 53)"
          nombreCivil="Padre Doglia y 25 de Mayo"
          horaIglesia="Por confirmar"
          linkCivil="https://maps.app.goo.gl/WefSH3wvZpEs4axS7"
          linkFiesta="https://maps.app.goo.gl/XZcA4hnTpQqcegVu7"
          nombreSalon="Rodriguez y Portillo, Cucha Cucha"
          horaFiesta="21:00 hs"
          horaCivil="11:00 hs"
          claseContainer="flex flex-col md:flex-row items-center justify-center gap-8 my-8 font-montserrat"
          claseTexto="text-gray-900"
        />
       
        <GalleryPraga
          images={[
            {
              index: 1,
              img: "https://res.cloudinary.com/dheeykiqu/image/upload/v1766885534/8f5a8ff2-6c61-48ac-afbf-e6931e7fda93_hl5xig.jpg",
            },
            {
              index: 2,
              img: "https://res.cloudinary.com/dheeykiqu/image/upload/v1766885534/IMG_5726_wh1wcu.jpg",
            },
            {
              index: 3,
              img: "https://res.cloudinary.com/dheeykiqu/image/upload/v1766885534/IMG_5729_eliqpn.jpg",
            },
            {
              index: 4,
              img: "https://res.cloudinary.com/dheeykiqu/image/upload/v1766885534/IMG_5725_ippqvl.jpg",
            },
            {
              index: 5,
              img: "https://res.cloudinary.com/dheeykiqu/image/upload/v1766885534/IMG_5728_swrkqw.jpg",
            },
            {
              index: 6,
              img: "https://res.cloudinary.com/dheeykiqu/image/upload/v1766885534/IMG_5727_tjfhnx.jpg",
            },
          ]}
        />

        <div className="bg-[#8B9E8D] text-center text-white relative font-montserrat px-3">
          <GoogleCalendarButton
            background={{ backgroundColor: colorPrincipal }}
            titleCalendar="Casamiento de Mica y Fran"
            fechaComienzo="20260228T210000"
            fechaFin="20260301T050000"
            salon="Rodriguez y Portillo, Cucha Cucha"
            imgClass="text-white"
            buttonClass="bg-white hover:bg-transparent text-gray-800 hover:text-white border-white"
          />
        </div>
        {/* <div className="relative">
          <img
            src={hojasVerdesIzq}
            alt="Decoración"
            className="absolute -left-20 lg:left-[-50px] top-1/2 transform -translate-y-1/2 w-40 lg:w-52 opacity-70"
          />
          <DressCode dress_code="Formal" />
          <img
            src={hojasVerdes2}
            alt="Decoración"
            className="absolute -right-20 lg:right-[-50px] top-1/2 transform -translate-y-1/2 w-40 lg:w-52 opacity-70"
          />
        </div> */}
        {/* <InstagramWall user="@chechu.guido" /> */}
        <SongRecommendations 
          claseContenedor="bg-white" 
          googleScriptUrl="https://script.google.com/macros/s/AKfycbzCySYYtuCFYyYdRti6oZztv4huHhzQR2FJfJufsZZXntxzkAlgIXYBN51qc9ffwJPQ/exec"
        />
        <DatosBancarios
          texto="Si querés hacernos un regalo, estos son nuestros datos bancarios"
          claseContenedor=" text-white font-montserrat"
          claseBoton="border-2 border-blue-900 bg-white py-3 px-6 text-gray-800 rounded-full hover:bg-gray-100 hover:text-gray-800 transform transition-transform duration-300 ease-in-out"
          textSize="text-lg"
          background={{ backgroundColor: colorPrincipal }}
          styleBotonModal={{ backgroundColor: "white", borderColor: "white" }}
          styleBorderModal={{ borderColor: colorPrincipal }}
          styleTextColor={{ color: colorPrincipal }}
          cbu="0000003100001039793943"
          alias="francoymicaela.mp"
          banco="Mercado Pago"
          nombre="Franco Ayala"
          borderModal="border-blue-500"
          textColor="text-blue-500"
        />
        <TextoFinal
          textoFinal={
            <p className="text-2xl md:text-xl leading-relaxed">
              Nos encantaría que compartas este día tan especial con nosotros.
              <br />
              Por eso, te pedimos que confirmes tu asistencia.
            </p>
          }
          textClass="font-cormorantGaramond text-4xl text-gray-600 italic mt-20"
        />

        <Asistencia
          clase="pt-10 bg-fondo-banner font-montserrat"
          claseButton="border-2 py-3 px-6 rounded-full border-[#8B9E8D] bg-[#8B9E8D] text-white hover:bg-white hover:text-[#8B9E8D]"
          linkAsistencia="https://docs.google.com/forms/d/e/1FAIpQLSfF5glcZNVNGtrUJGETo6WOsP7NwlGxLAQHs20OK2CCt8d__g/viewform?usp=sharing&ouid=101386997737484433208"
          googleScriptUrl="https://script.google.com/macros/s/AKfycbwGjr_kN0HdQUREE-64qfkomWRwd7QDV3t5sXZgXC5Ys36cWx1WISCLJEkyO9pDRbJa/exec"
        />

        <Footer />
      </div>
    </div>
  );
};

export default Invitacion;
