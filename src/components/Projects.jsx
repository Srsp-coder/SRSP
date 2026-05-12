import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../Context/ThemeContext';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import data from '../data/portfolioData.json';

export default function Projects() {
  const { isDark } = useTheme();
  const { projects } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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
              My <span className="gradient-text">Projects</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mx-auto rounded-full" />
            <p className={`font-body mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              More projects available on my{' '}
              <a
                href="https://github.com/Srsp-coder"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-text font-medium hover:underline"
              >
                GitHub
              </a>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className={`group p-6 rounded-2xl border flex flex-col justify-between
                  transition-all duration-300 glow-border
                  ${isDark ? 'glass-card-dark border-white/5' : 'glass-card-light border-gray-100'}`}
              >
                {/* Top */}
                <div>
                  {/* Title Row */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`font-heading font-bold text-xl
                        ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {project.title}
                      </h3>
                      <p className="gradient-text text-sm font-medium">{project.subtitle}</p>
                    </div>
                    <div className="flex gap-2 mt-1">
                      {project.githubLink && (
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2 }}
                          className={`transition-colors duration-200
                            ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-800'}`}
                        >
                          <FiGithub size={18} />
                        </motion.a>
                      )}
                      {project.liveLink && (
                        <motion.a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2 }}
                          className={`transition-colors duration-200
                            ${isDark ? 'text-gray-400 hover:text-[#00d4ff]' : 'text-gray-400 hover:text-blue-600'}`}
                        >
                          <FiExternalLink size={18} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`h-px my-4 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`} />

                  {/* Description */}
                  <p className={`font-body text-sm leading-relaxed mb-5
                    ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium font-body
                        ${isDark
                          ? 'bg-white/5 text-[#00d4ff] border border-[#00d4ff]/20'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                    >
                      {tech}
                    </span>
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