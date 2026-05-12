import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../Context/ThemeContext';
import data from '../data/portfolioData.json';
import {
  FaReact, FaPython, FaDatabase, FaTools, FaBrain, FaDocker
} from 'react-icons/fa';

const iconMap = {
  FaReact: <FaReact size={22} />,
  FaPython: <FaPython size={22} />,
  FaDatabase: <FaDatabase size={22} />,
  FaTools: <FaTools size={22} />,
  FaBrain: <FaBrain size={22} />,
  FaDocker: <FaDocker size={22} />,
};

const categoryColors = [
  'from-[#00d4ff] to-[#0284c7]',
  'from-[#7c3aed] to-[#6d28d9]',
  'from-[#06b6d4] to-[#0891b2]',
  'from-[#f59e0b] to-[#d97706]',
  'from-[#10b981] to-[#059669]',
  'from-[#ef4444] to-[#dc2626]',
];

export default function Skills() {
  const { isDark } = useTheme();
  const { skills } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`p-6 rounded-2xl border transition-all duration-300 glow-border
                  ${isDark ? 'glass-card-dark border-white/5' : 'glass-card-light border-gray-100'}`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${categoryColors[index % categoryColors.length]} text-white`}>
                    {iconMap[skill.icon]}
                  </div>
                  <h3 className={`font-heading font-semibold text-lg
                    ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {skill.category}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                      className={`px-3 py-1 rounded-full text-xs font-medium border font-body
                        ${isDark
                          ? 'border-white/10 bg-white/5 text-gray-300 hover:border-[#00d4ff]/50 hover:text-[#00d4ff]'
                          : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-blue-400 hover:text-blue-600'
                        } transition-all duration-200 cursor-default`}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}