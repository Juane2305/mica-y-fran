import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';



const Countdown = ( {containerClasses, targetDate} ) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return null;
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true, 
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    AOS.refresh(); 
    return () => clearInterval(timer);
  }, []);



  if (!timeLeft) {
    return (
      <div className="text-center text-2xl italic text-gray-800">
        ¡Llegó el día!
      </div>
    );
  }

  return (
    <div className={containerClasses} data-aos="fade-in">
      <h3 className="text-xl font-light leading-loose">Faltan...</h3>
      <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 text-xl font-extralight px-4" data-aos="fade-in">
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl">{timeLeft.days}</div>
          <span className="text-base">Días</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl">{timeLeft.hours}</div>
          <span className="text-base">Horas</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl">{timeLeft.minutes}</div>
          <span className="text-base">Min</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl">{timeLeft.seconds}</div>
          <span className="text-base">Seg</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;