// import party from "../assets/praga/party.json";
import ceremony from "../assets/praga/ceremony.json";
import church from "../assets/praga/church.json";
import Lottie from 'react-lottie-player';
import PropTypes from 'prop-types'
import party from "../assets/praga/party.json";



const LugaresPraga = ({
  linkCeremonia = "",
  nombreIglesia = "",
  horaIglesia = "",
  nombreCivil = "",
  horaCivil = "",
  linkFiesta = "",
  nombreSalon = "",
  horaFiesta = "",
  linkCivil = "",
  // horaCivil = "",
  claseContainer = "flex flex-col md:flex-row items-center justify-center gap-8 my-8 font-montserrat",
  claseTexto = "text-gray-800",
}) => {
  return (
    <div className={`w-full text-center ${claseTexto} py-10`}>
      <div className={claseContainer}>
        {/* BLOQUE CEREMONIA (solo si linkCeremonia existe) */}
        {linkCivil && linkCivil.trim() !== "" && (
          <div className="flex flex-col items-center gap-3 max-w-xs">
            <h3 className="text-xl">20 de Febrero</h3>
            <div style={{ width: 120, height: 120 }}>
              <Lottie
                loop
                play
                animationData={ceremony}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <h3 className="text-xl font-semibold tracking-wider">CIVIL</h3>
            <p className="font-light px-5">
              El civil se realizará en <strong>{nombreCivil}</strong> a
              las {horaCivil}.
            </p>
            <a
              href={linkCivil}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gray-700 px-4 py-2 rounded-full hover:bg-gray-700 hover:text-white transition"
            >
              Cómo llegar
            </a>
          </div> 
        )}
        <div className="flex flex-col items-center gap-3 max-w-xs">
        <h3 className="text-xl mt-20 md:mt-0">28 de Febrero</h3>
            <div style={{ width: 120, height: 120 }}>
              <Lottie
                loop
                play
                animationData={church}
                speed={0.8}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <h3 className="text-xl font-semibold tracking-wider">CEREMONIA</h3>
            <p className="font-light px-5">
              La ceremonia se realizará en <strong>{nombreIglesia}</strong> a
              las {horaIglesia}.
            </p>
            <a
              href={linkCeremonia}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gray-700 px-4 py-2 rounded-full hover:bg-gray-700 hover:text-white transition"
            >
              Cómo llegar
            </a>
          </div>

        {linkFiesta && linkFiesta.trim() !== "" && (
          <div className="flex flex-col items-center gap-3 max-w-xs">
            <h3 className="text-xl mt-20">28 de Febrero</h3>
            <div style={{ width: 120, height: 120 }}>
              <Lottie
                loop
                play
                animationData={party}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <h3 className="text-xl font-semibold tracking-wider">
              {linkCivil && linkCivil.trim() !== "" ? "FIESTA" : "FIESTA"}
            </h3>
            <p className="font-light">
              {linkCivil && linkCivil.trim() !== ""
                ? <>
                    La fiesta se realizará <br />
                    en <strong>{nombreSalon}</strong> a las <strong>{horaFiesta}</strong>.
                  </>
                : <>La fiesta se realizará en <strong>{nombreSalon}</strong> a las <strong>{horaFiesta}</strong>.</>}
            </p>
            <a
              href={linkFiesta}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gray-700 px-4 py-2 rounded-full hover:bg-gray-700 hover:text-white transition"
            >
              Cómo llegar
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LugaresPraga;


LugaresPraga.propTypes = {
    plan: PropTypes.string.isRequired,
    fecha_cuenta_regresiva: PropTypes.string.isRequired,
    imagenes: PropTypes.string,
    cancion: PropTypes.string,
    fondoMobile: PropTypes.string,
    fondo: PropTypes.string,
    novios: PropTypes.string.isRequired,
    fecha_evento: PropTypes.string.isRequired,
    nombre_iglesia: PropTypes.string,
    hora_ceremonia_religiosa: PropTypes.string,
    linkCeremonia: PropTypes.string,
    nombre_salon: PropTypes.string,
    hora_evento: PropTypes.string,
    linkFiesta: PropTypes.string,
    ig_user: PropTypes.string,
    fecha_comienzo_calendario: PropTypes.string,
    fecha_fin_calendario: PropTypes.string,
    dressCode: PropTypes.string,
    cbu: PropTypes.string,
    alias: PropTypes.string,
    banco: PropTypes.string,
    nombre_completo: PropTypes.string,
    link_asistencia: PropTypes.string,
    mensaje_personalizado: PropTypes.string,

}.isRequired;