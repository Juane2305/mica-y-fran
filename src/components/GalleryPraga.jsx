import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


export const GalleryPraga = ({images, text, sectionClass}) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleOpen = (image, index) => {
    setSelectedImg(image);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setSelectedImg(null);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setDirection(1);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImg(images[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setDirection(-1);
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImg(images[prevIndex]);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section className={`py-12 ${sectionClass}`}>
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl text-center mb-8 tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {text}
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <motion.div
              key={img.index}
              className={`relative overflow-hidden rounded shadow-lg cursor-pointer ${
                images.length % 2 !== 0 && index === images.length - 1
                  ? "col-span-2 mx-auto md:col-span-1 md:mx-0"
                  : ""
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleOpen(img, index)}
            >
              <motion.img
                src={img.img}
                alt={`Imagen ${index + 1}`}
                className="w-full h-72 object-cover object-center hover:scale-110 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div> 
      <AnimatePresence initial={false} custom={direction} mode="wait">
        {selectedImg && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          >
            {/* Botón cerrar */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300 transition-colors z-10"
              aria-label="Cerrar"
            >
              ×
            </button>

            {/* Contador de imágenes */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm z-10">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Botón anterior */}
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-8 text-white text-4xl md:text-6xl font-light hover:text-gray-300 transition-colors z-10 bg-black/30 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center"
              aria-label="Imagen anterior"
            >
              ‹
            </button>

            {/* Botón siguiente */}
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-8 text-white text-4xl md:text-6xl font-light hover:text-gray-300 transition-colors z-10 bg-black/30 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center"
              aria-label="Imagen siguiente"
            >
              ›
            </button>

            {/* Imagen con swipe */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={selectedImg.index}
                src={selectedImg.img}
                alt={`Imagen ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain p-4 md:p-8"
                custom={direction}
                initial={{
                  x: direction > 0 ? 300 : -300,
                  opacity: 0
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }
                }}
                exit={{
                  x: direction > 0 ? -300 : 300,
                  opacity: 0,
                  transition: {
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    handleNext(e);
                  } else if (swipe > swipeConfidenceThreshold) {
                    handlePrev(e);
                  }
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
