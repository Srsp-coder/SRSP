import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import data from '../data/portfolioData.json';

export default function Contact() {
  const { isDark } = useTheme();
  const { personal } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const contactLinks = [
    {
      icon: <FiMail size={22} />,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      color: 'from-[#00d4ff] to-[#0284c7]',
    },
    {
      icon: <FiGithub size={22} />,
      label: 'GitHub',
      value: 'github.com/Srsp-coder',
      href: personal.github,
      color: 'from-[#7c3aed] to-[#6d28d9]',
    },
    {
      icon: <FiLinkedin size={22} />,
      label: 'LinkedIn',
      value: 'sai-pranav-s-r',
      href: personal.linkedin,
      color: 'from-[#06b6d4] to-[#0891b2]',
    },
    {
      icon: <SiLeetcode size={22} />,
      label: 'LeetCode',
      value: 'SRSP_12',
      href: personal.leetcode,
      color: 'from-[#f59e0b] to-[#d97706]',
    },
  ];

  return (
    <div className={`section-padding ${isDark ? 'bg-[#080810]' : 'bg-white'}`}>
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
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mx-auto rounded-full mb-6" />
            <p className={`font-body text-base max-w-xl mx-auto
              ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              I'm open to new opportunities, collaborations, or just a quick chat.
              Feel free to reach out through any of the channels below!
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            {contactLinks.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                target={contact.label !== 'Email' ? '_blank' : '_self'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 glow-border group
                  ${isDark ? 'glass-card-dark border-white/5' : 'glass-card-light border-gray-100'}`}
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${contact.color} text-white
                  group-hover:scale-110 transition-transform duration-200`}>
                  {contact.icon}
                </div>
                <div>
                  <p className={`font-heading font-semibold text-sm
                    ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {contact.label}
                  </p>
                  <p className={`font-body text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {contact.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}