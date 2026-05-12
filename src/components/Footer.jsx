import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`py-8 border-t ${isDark ? 'border-white/5 bg-[#0a0a0f]' : 'border-gray-100 bg-[#f8f9ff]'}`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className={`font-body text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          © 2025 Sai Pranav S R. All rights reserved.
        </p>
        <p className={`font-body text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Built with{' '}
          <span className="gradient-text font-medium">React + Framer Motion + Tailwind</span>
        </p>
      </div>
    </footer>
  );
}