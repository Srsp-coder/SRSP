import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../Context/ThemeContext';
import data from '../data/portfolioData.json';

export default function Education() {
  const { isDark } = useTheme();
  const { education } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className={`section-padding ${isDark ? 'bg-[#0a0a0f]' : 'bg-[#f8f9ff]'}`}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">
              My <span className="gradient-text">Education</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mx-auto rounded-full" />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className={`absolute left-6 top-0 bottom-0 w-px
              ${isDark ? 'bg-gradient-to-b from-[#00d4ff] via-[#7c3aed] to-transparent' : 'bg-gradient-to-b from-blue-400 via-purple-400 to-transparent'}`}
            />

            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex gap-6 pl-16 relative"
                >
                  {/* Circle on timeline */}
                  <div className={`absolute left-3.5 top-6 w-5 h-5 rounded-full border-2 border-[#00d4ff]
                    ${isDark ? 'bg-[#0a0a0f]' : 'bg-[#f8f9ff]'}`}
                  />

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 6 }}
                    className={`flex-1 p-6 rounded-2xl border transition-all duration-300 glow-border
                      ${isDark ? 'glass-card-dark border-white/5' : 'glass-card-light border-gray-100'}`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{edu.icon}</span>
                          <h3 className={`font-heading font-bold text-lg
                            ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            {edu.institution}
                          </h3>
                        </div>
                        <p className={`font-body text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {edu.degree}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="gradient-text font-heading font-bold text-lg">{edu.score}</p>
                        <p className={`font-body text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {edu.year}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}