import { lazy, Suspense, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/layout/Navigation';
import Hero from './components/sections/Hero';
import Footer from './components/layout/Footer';
import CreatorPage from './pages/CreatorPage';
import CurvedLoop from './components/ui/CurvedLoop';
import LightPillar from './components/ui/LightPillar';

const Features = lazy(() => import('./components/sections/Features'));
const HowItWorks = lazy(() => import('./components/sections/HowItWorks'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const JoinSection = lazy(() => import('./components/sections/JoinSection'));
const CTA = lazy(() => import('./components/sections/CTA'));
const BrowseStars = lazy(() => import('./components/sections/BrowseStars'));
const SuggestStarForm = lazy(() => import('./components/forms/SuggestStarForm'));
const FeedbackForm = lazy(() => import('./components/forms/FeedbackForm'));

function SectionLoader() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [showBrowse, setShowBrowse] = useState(false);
  const [showSuggestStar, setShowSuggestStar] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'creator'>('home');

  if (currentPage === 'creator') {
    return (
      <>
        <div className="min-h-screen bg-dark-950 text-white overflow-x-hidden relative">
          {/* Global Light Pillar Background */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <LightPillar
              topColor="#5227FF"
              bottomColor="#a668a4"
              intensity={1}
              rotationSpeed={0.3}
              interactive={false}
              glowAmount={0.002}
              pillarWidth={0.5}
              pillarHeight={0.1}
              noiseIntensity={0}
              pillarRotation={95}
            />
          </div>
          <div className="relative z-10">
            <Navigation onBrowseClick={() => setShowBrowse(true)} />
            <main>
              <CreatorPage />
            </main>
            <Footer />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-dark-950 text-white overflow-x-hidden relative">
        {/* Global Light Pillar Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <LightPillar
            topColor="#5227FF"
            bottomColor="#a668a4"
            intensity={1}
            rotationSpeed={0.3}
            interactive={false}
            glowAmount={0.002}
            pillarWidth={0.5}
            pillarHeight={0.1}
            noiseIntensity={0}
            pillarRotation={95}
          />
        </div>
        <div className="relative z-10">
          <Navigation onBrowseClick={() => setShowBrowse(true)} />
          <main>
            <Hero />
            <CurvedLoop
              marqueeText="✦ Personalized Videos ✦ Celebrity Shoutouts ✦ Unforgettable Moments ✦ Connect with Stars ✦"
              speed={2}
              curveAmount={200}
              direction="left"
              interactive={true}
            />
            <Suspense fallback={<SectionLoader />}>
              <Features />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <HowItWorks />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Testimonials />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <JoinSection
                onSuggestStar={() => setShowSuggestStar(true)}
                onFeedback={() => setShowFeedback(true)}
              />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <CTA />
            </Suspense>
          </main>
          <Footer />
        </div>

        <AnimatePresence>
          {showBrowse && (
            <Suspense fallback={<SectionLoader />}>
              <BrowseStars onClose={() => setShowBrowse(false)} />
            </Suspense>
          )}
        </AnimatePresence>

        <Suspense fallback={null}>
          <SuggestStarForm
            isOpen={showSuggestStar}
            onClose={() => setShowSuggestStar(false)}
          />
        </Suspense>

        <Suspense fallback={null}>
          <FeedbackForm
            isOpen={showFeedback}
            onClose={() => setShowFeedback(false)}
          />
        </Suspense>
      </div>
    </>
  );
}
