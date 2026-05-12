import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../Context/ThemeContext';
import data from '../data/portfolioData.json';

export default function About() {
  const { isDark } = useTheme();
  const { personal } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className={`section-padding ${isDark ? 'bg-[#0a0a0f]' : 'bg-[#f8f9ff]'}`}>
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
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left — Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className={`font-heading font-semibold text-2xl mb-4
                ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Full-Stack Developer & AI Enthusiast
              </h3>
              <p className={`font-body leading-relaxed text-base mb-6
                ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {personal.summary}
              </p>
              <p className={`font-body leading-relaxed text-base
                ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                I love building scalable applications from scratch — from designing REST APIs to shipping
                polished frontends. Currently pursuing B.Tech CSE (IoT) at Shiv Nadar University, Chennai,
                with a CGPA of 8.6, while actively participating in hackathons and building real-world projects.
              </p>
            </motion.div>

            {/* Right — Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {personal.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className={`p-6 rounded-2xl text-center border transition-all duration-300 glow-border
                    ${isDark ? 'glass-card-dark border-white/5' : 'glass-card-light border-gray-100'}`}
                >
                  <div className="font-heading font-bold text-3xl gradient-text mb-1">{stat.value}</div>
                  <div className={`font-body text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}