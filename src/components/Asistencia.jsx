import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PropTypes from 'prop-types'


const Asistencia = ({ clase, claseButton, claseTitle, linkAsistencia, googleScriptUrl = "" }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asistira: '',
    numeroPersonas: '1',
    restricciones: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.asistira) {
      setSubmitMessage('Por favor completa tu nombre y confirma tu asistencia');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      if (googleScriptUrl) {
        // Enviar a Google Sheets
        await fetch(googleScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        
        setSubmitMessage(formData.asistira === 'si' 
          ? '¡Gracias por confirmar! Los esperamos 💕' 
          : 'Gracias por avisarnos. Te vamos a extrañar 💔');
        setFormData({ 
          nombre: '', 
          email: '', 
          telefono: '', 
          asistira: '', 
          numeroPersonas: '1', 
          restricciones: '', 
          mensaje: '' 
        });
      } else if (linkAsistencia) {
        // Fallback al Google Form original
        window.open(linkAsistencia, '_blank');
        return;
      }
    } catch{
      setSubmitMessage('Hubo un error. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Si tiene googleScriptUrl, mostrar formulario integrado
  if (googleScriptUrl) {
    return (
      <div className={`py-16 ${clase} border-y-2 border-[#8B9E8D]`}>
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className={`text-3xl md:text-4xl font-light text-center mb-3 ${claseTitle}`}
            data-aos="fade-up"
          >
            Confirmación de Asistencia
          </h2>
          <p className='text-sm text-gray-600 text-center mb-8' data-aos="fade-up">
            Se puede confirmar hasta el 15 de Febrero
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" data-aos="fade-up">
            {/* Nombre completo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre y apellido"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B9E8D] transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B9E8D] transition-colors"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+54 9 ..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B9E8D] transition-colors"
              />
            </div>

            {/* ¿Asistirás? */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Confirmas tu asistencia? *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, asistira: 'si' })}
                  className={`py-3 px-6 rounded-lg border-2 transition-all ${
                    formData.asistira === 'si'
                      ? 'bg-[#8B9E8D] border-[#8B9E8D] text-white'
                      : 'border-gray-300 hover:border-[#8B9E8D]'
                  }`}
                >
                  ✓ Sí, asistiré
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, asistira: 'no' })}
                  className={`py-3 px-6 rounded-lg border-2 transition-all ${
                    formData.asistira === 'no'
                      ? 'bg-gray-500 border-gray-500 text-white'
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                >
                  ✗ No podré asistir
                </button>
              </div>
            </div>

            {/* Número de personas (solo si asiste) */}
            {formData.asistira === 'si' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cuántas personas asistirán? (Incluyéndote)
                  </label>
                  <select
                    name="numeroPersonas"
                    value={formData.numeroPersonas}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B9E8D] transition-colors"
                  >
                    <option value="1">1 persona</option>
                    <option value="2">2 personas</option>
                    <option value="3">3 personas</option>
                    <option value="4">4 personas</option>
                    <option value="5">5 personas</option>
                    <option value="6+">6 o más personas</option>
                  </select>
                </div>

                {/* Restricciones alimentarias */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Restricciones alimentarias o alergias
                  </label>
                  <input
                    type="text"
                    name="restricciones"
                    value={formData.restricciones}
                    onChange={handleChange}
                    placeholder="Vegetariano, celíaco, alérgico a..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B9E8D] transition-colors"
                  />
                </div>
              </>
            )}

            {/* Mensaje opcional */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje para los novios (opcional)
              </label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows="3"
                placeholder="Dejanos un mensaje..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B9E8D] transition-colors resize-none"
              />
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-full transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${claseButton}`}
            >
              {isSubmitting ? 'Enviando...' : 'Confirmar Asistencia'}
            </button>

            {submitMessage && (
              <p className={`text-center text-sm mt-4 p-3 rounded-lg ${
                submitMessage.includes('Gracias por confirmar') 
                  ? 'bg-green-50 text-green-700' 
                  : submitMessage.includes('extrañar')
                  ? 'bg-gray-50 text-gray-700'
                  : 'bg-red-50 text-red-700'
              }`}>
                {submitMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    );
  }

  // Fallback: versión original con botón a Google Forms
  return (
    <>
      {linkAsistencia && linkAsistencia.trim() !== "" && (
        <div className={`py-10 ${clase} border-y-2 border-[#8B9E8D]`}>
          <div className="h-full flex flex-col justify-center items-center space-y-2">
            <h2
              className={`text-2xl font-light text-center ${claseTitle}`}
              data-aos="fade-up"
            >
              Confirmación de Asistencia
            </h2>
            <a href={linkAsistencia} target="_blank" rel="noopener noreferrer" data-aos="fade-up">
              <button className={`py-4 px-6 mt-5 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${claseButton}`}>
                Confirmar asistencia
              </button>
            </a>
            <p className='text-sm text-gray-500 mt-6'>Se puede confirmar hasta el 15 de Febrero</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Asistencia;

Asistencia.propTypes = {
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