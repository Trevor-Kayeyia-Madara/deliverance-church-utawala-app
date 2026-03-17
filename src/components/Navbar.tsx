import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { Page } from '../types/page';

export default function Navbar({
  currentPage,
  setPage,
}: {
  currentPage: Page;
  setPage: (p: Page) => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'service-times', label: 'Service Times' },
    { id: 'ministries', label: 'Ministries' },
    { id: 'dominion-center', label: 'Dominion Center' },
    { id: 'events', label: 'Events' },
    { id: 'sermons', label: 'Sermons' },
  ];

  const isActive = (id: Page) => {
    if (id === 'ministries') {
      return currentPage === 'ministries' || currentPage.startsWith('ministry/');
    }
    return currentPage === id;
  };

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setPage('home');
              setIsMobileMenuOpen(false);
            }}
          >
            <div className="text-primary">
              <img
                src="/logo.png"
                alt="Deliverance Church Logo"
                className="size-9 object-contain"
              />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-primary uppercase">
              Deliverance Church Utawala
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`text-sm font-semibold transition-colors hover:text-primary ${
                  isActive(item.id) ? 'text-primary' : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setPage('giving')}
              className="hidden sm:block bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              Give
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-primary p-2"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-primary/10 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg font-bold py-2 ${
                    isActive(item.id) ? 'text-primary' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setPage('giving');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-center mt-4"
              >
                Give Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
