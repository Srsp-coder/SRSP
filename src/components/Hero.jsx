import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiDownload, FiExternalLink } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';
import data from '../data/portfolioData.json';

export default function Hero() {
  const { isDark } = useTheme();
  const { personal } = data;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter Effect
  useEffect(() => {
    const currentRole = personal.roles[roleIndex];
    let timeout;

    if (!isDeleting && displayed.length < currentRole.length) {
      timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length - 1)), 45);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % personal.roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex, personal.roles]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <div className={`relative min-h-screen flex items-center justify-center overflow-hidden
      ${isDark ? 'bg-[#0a0a0f]' : 'bg-[#f8f9ff]'}`}>

      {/* Background Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20
          ${isDark ? 'bg-[#00d4ff]' : 'bg-blue-300'}`} />
        <div className={`absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20
          ${isDark ? 'bg-[#7c3aed]' : 'bg-purple-300'}`} />
        <div className={`absolute top-3/4 left-1/2 w-64 h-64 rounded-full blur-3xl opacity-10
          ${isDark ? 'bg-[#06b6d4]' : 'bg-cyan-300'}`} />
      </div>

      {/* Grid Overlay */}
      {isDark && (
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      )}

      {/* Hero Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border
            ${isDark
              ? 'bg-white/5 border-white/10 text-gray-300'
              : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="font-heading font-bold text-5xl md:text-7xl mb-4 leading-tight"
        >
          Hi, I'm{' '}
          <span className="gradient-text">{personal.name}</span>
        </motion.h1>

        {/* Typewriter Role */}
        <motion.div
          variants={itemVariants}
          className="font-heading text-2xl md:text-3xl font-semibold mb-6 h-10"
        >
          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            {displayed}
            <span className="animate-pulse text-[#00d4ff]">|</span>
          </span>
        </motion.div>

        {/* Summary */}
        <motion.p
          variants={itemVariants}
          className={`font-body text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed
            ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          {personal.summary}
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10"
        >
          {personal.stats.map((stat, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border text-center
                ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}
            >
              <div className="font-heading font-bold text-2xl gradient-text">{stat.value}</div>
              <div className={`font-body text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <motion.a
            href={personal.resumeLink}
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-white
              bg-gradient-to-r from-[#00d4ff] via-[#7c3aed] to-[#06b6d4]
              hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            <FiDownload size={16} />
            Download Resume
          </motion.a>

          <motion.a
            href="#projects"
            onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border transition-all duration-300
              ${isDark
                ? 'border-white/10 text-white hover:bg-white/5'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
          >
            <FiExternalLink size={16} />
            View Projects
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-5"
        >
          {[
            { icon: <FiGithub size={20} />, href: personal.github, label: 'GitHub' },
            { icon: <FiLinkedin size={20} />, href: personal.linkedin, label: 'LinkedIn' },
            { icon: <SiLeetcode size={20} />, href: personal.leetcode, label: 'LeetCode' },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-xl border transition-all duration-200
                ${isDark
                  ? 'border-white/10 text-gray-400 hover:text-white hover:border-[#00d4ff] hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                  : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:border-blue-400 hover:shadow-md'
                }`}
              title={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className={`text-xs font-body ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Scroll down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-8 bg-gradient-to-b from-[#00d4ff] to-transparent rounded-full"
        />
      </motion.div>
    </div>
  );
}