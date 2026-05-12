import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiLinkedin, FiExternalLink, FiX, FiAward } from 'react-icons/fi';
import data from '../data/portfolioData.json';

const positionColors = {
  'First Place 🥇': 'from-yellow-400 to-orange-400',
  'Special Mention ⭐': 'from-blue-400 to-cyan-400',
  'Finalist 🏅': 'from-purple-400 to-pink-400',
  'Semifinalist 🎯': 'from-green-400 to-teal-400',
};

export default function Achievements() {
  const { isDark } = useTheme();
  const { achievements } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [modalImg, setModalImg] = useState(null);

  return (
    <div className={`section-padding ${isDark ? 'bg-[#080810]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">
              Achievements & <span className="gradient-text">Hackathons</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`p-6 rounded-2xl border flex flex-col gap-4 transition-all duration-300 glow-border
                  ${isDark ? 'glass-card-dark border-white/5' : 'glass-card-light border-gray-100'}`}
              >
                {/* Icon + Position Badge */}
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-br
                    ${positionColors[item.position] || 'from-gray-400 to-gray-500'} text-white`}>
                    <FiAward size={20} />
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full border font-body
                    ${isDark ? 'border-white/10 text-gray-300 bg-white/5' : 'border-gray-200 text-gray-600 bg-gray-50'}`}>
                    {item.position}
                  </span>
                </div>

                {/* Title + Description */}
                <div>
                  <h3 className={`font-heading font-bold text-lg mb-1
                    ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {item.title}
                  </h3>
                  <p className={`font-body text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.description}
                  </p>
                </div>

                {/* Optional Action Buttons */}
                {(item.certificateImage || item.linkedinLink || item.projectLink) && (
                  <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-white/5">
                    {item.certificateImage && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setModalImg(item.certificateImage)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                          bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white font-body"
                      >
                        🖼️ Certificate
                      </motion.button>
                    )}
                    {item.linkedinLink && (
                      <motion.a
                        href={item.linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border font-body
                          ${isDark
                            ? 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10'
                            : 'border-blue-300 text-blue-600 hover:bg-blue-50'
                          }`}
                      >
                        <FiLinkedin size={12} />
                        LinkedIn
                      </motion.a>
                    )}
                    {item.projectLink && (
                      <motion.a
                        href={item.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border font-body
                          ${isDark
                            ? 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10'
                            : 'border-purple-300 text-purple-600 hover:bg-purple-50'
                          }`}
                      >
                        <FiExternalLink size={12} />
                        Project
                      </motion.a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {modalImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setModalImg(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <FiX size={20} />
              </button>
              <img src={modalImg} alt="Certificate" className="w-full h-auto rounded-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}