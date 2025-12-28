import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SongRecommendations = ({ claseContenedor = "bg-[#f8f5f0]", claseBoton = "", googleScriptUrl = "" }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    cancion: '',
    artista: ''
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
    
    if (!formData.cancion || !formData.artista) {
      setSubmitMessage('Por favor completa la canción y el artista');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      if (googleScriptUrl) {
        // Si hay URL de Google Script, enviar ahí
        const response = await fetch(googleScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        
        setSubmitMessage('¡Gracias! Tu canción ha sido recomendada 🎵');
        setFormData({ nombre: '', cancion: '', artista: '' });
      } else {
        // Fallback: mailto
        const subject = encodeURIComponent('Recomendación de Canción - Casamiento Mica y Fran');
        const body = encodeURIComponent(`
Nombre: ${formData.nombre || 'Anónimo'}
Canción: ${formData.cancion}
Artista: ${formData.artista}
        `);
        window.location.href = `mailto:tu-email@ejemplo.com?subject=${subject}&body=${body}`;
        setSubmitMessage('Se abrirá tu cliente de correo para enviar la recomendación');
      }
    } catch (error) {
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

  return (
    <section className={`py-12 px-6 md:px-20 ${claseContenedor}`}>
      <div className="max-w-2xl mx-auto text-center" data-aos="fade-up">
        <span className="text-[#8B9E8D] text-5xl mb-4 block">
          <i className="ri-music-2-line"></i>
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-montserrat">
          Recomendá una Canción
        </h2>
        <p className="text-gray-700 text-lg mb-8 font-montserrat">
          ¡Queremos que nuestra celebración tenga la mejor música! <br />
          Ayudanos recomendando tu canción favorita para bailar.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4" data-aos="fade-up">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre (opcional)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B9E8D] transition-colors"
          />
          
          <input
            type="text"
            name="cancion"
            value={formData.cancion}
            onChange={handleChange}
            placeholder="Nombre de la canción *"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B9E8D] transition-colors"
          />
          
          <input
            type="text"
            name="artista"
            value={formData.artista}
            onChange={handleChange}
            placeholder="Artista *"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B9E8D] transition-colors"
          />
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full border-2 py-3 px-8 rounded-full border-[#8B9E8D] bg-[#8B9E8D] text-white hover:bg-white hover:text-[#8B9E8D] transition-all duration-300 font-montserrat disabled:opacity-50 disabled:cursor-not-allowed ${claseBoton}`}
          >
            {isSubmitting ? 'Enviando...' : 'Recomendar Canción'}
          </button>
          
          {submitMessage && (
            <p className={`text-sm mt-2 ${submitMessage.includes('Gracias') ? 'text-green-600' : 'text-red-600'}`}>
              {submitMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default SongRecommendations;
