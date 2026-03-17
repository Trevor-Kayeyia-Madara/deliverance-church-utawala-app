import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AboutPage from './pages/AboutPage';
import CoreValuesPage from './pages/CoreValuesPage';
import DominionCenterPage from './pages/DominionCenterPage';
import EventsPage from './pages/EventsPage';
import GivingPage from './pages/GivingPage';
import HomePage from './pages/HomePage';
import MinistryDetailPage from './pages/MinistryDetailPage';
import MinistriesPage from './pages/MinistriesPage';
import ServiceTimesPage from './pages/ServiceTimesPage';
import SermonsPage from './pages/SermonsPage';
import type { Page } from './types/page';
import type { MinistryId } from './types/ministries';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={page} setPage={setPage} />

      <main className="grow">
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HomePage setPage={setPage} />
            </motion.div>
          )}
          {page === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AboutPage />
            </motion.div>
          )}
          {page === 'service-times' && (
            <motion.div
              key="service-times"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ServiceTimesPage />
            </motion.div>
          )}
          {page === 'core-values' && (
            <motion.div
              key="core-values"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CoreValuesPage />
            </motion.div>
          )}
          {page === 'ministries' && (
            <motion.div
              key="ministries"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MinistriesPage setPage={setPage} />
            </motion.div>
          )}
          {page.startsWith('ministry/') && (
            <motion.div
              key={page}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MinistryDetailPage
                id={page.slice('ministry/'.length) as MinistryId}
                setPage={setPage}
              />
            </motion.div>
          )}
          {page === 'dominion-center' && (
            <motion.div
              key="dominion-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DominionCenterPage />
            </motion.div>
          )}
          {page === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EventsPage setPage={setPage} />
            </motion.div>
          )}
          {page === 'sermons' && (
            <motion.div
              key="sermons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SermonsPage setPage={setPage} />
            </motion.div>
          )}
          {page === 'giving' && (
            <motion.div
              key="giving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GivingPage setPage={setPage} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer setPage={setPage} />
    </div>
  );
}
