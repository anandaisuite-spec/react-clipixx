import { lazy, Suspense, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/layout/Navigation';
import Hero from './components/sections/Hero';
import Footer from './components/layout/Footer';
import CreatorPage from './pages/CreatorPage';
import CurvedLoop from './components/ui/CurvedLoop';
import { ThemeProvider } from './context/ThemeProvider';
import ClickSpark from './components/ui/ClickSpark';

const Features = lazy(() => import('./components/sections/Features'));
const HowItWorks = lazy(() => import('./components/sections/HowItWorks'));
const JoinSection = lazy(() => import('./components/sections/JoinSection'));
const CTA = lazy(() => import('./components/sections/CTA'));
const BrowseStars = lazy(() => import('./components/sections/BrowseStars'));
const SuggestStarForm = lazy(() => import('./components/forms/SuggestStarForm'));
const FeedbackForm = lazy(() => import('./components/forms/FeedbackForm'));
const CreatorApplicationForm = lazy(() => import('./components/forms/CreatorApplicationForm'));
const LoginModal = lazy(() => import('./components/auth/LoginModal'));

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
  const [showCreatorApplication, setShowCreatorApplication] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginMode, setLoginMode] = useState<'login' | 'signup'>('login');
  const [currentPage, setCurrentPage] = useState<'home' | 'creator'>('home');

  const openLogin = () => {
    setLoginMode('login');
    setShowLogin(true);
  };

  const openSignup = () => {
    setLoginMode('signup');
    setShowLogin(true);
  };

  if (currentPage === 'creator') {
    return (
      <ThemeProvider>
        <ClickSpark
          sparkColor="#7eb8dd"
          sparkCount={10}
          sparkRadius={25}
          sparkSize={12}
          duration={500}
          extraScale={1.5}
        >
          <div className="min-h-screen text-gray-900 dark:text-white overflow-x-hidden relative">

            <div className="relative z-10">
              <Navigation
                onBrowseClick={() => setShowBrowse(true)}
                onCreatorClick={() => setCurrentPage('home')}
                onLoginClick={openLogin}
                onSignupClick={openSignup}
              />
              <main>
                <CreatorPage onApplicationClick={() => setShowCreatorApplication(true)} />
              </main>
              <Footer />
            </div>
          </div>

          <Suspense fallback={null}>
            <CreatorApplicationForm
              isOpen={showCreatorApplication}
              onClose={() => setShowCreatorApplication(false)}
            />
          </Suspense>

          <Suspense fallback={null}>
            <LoginModal
              isOpen={showLogin}
              onClose={() => setShowLogin(false)}
              initialMode={loginMode}
            />
          </Suspense>
        </ClickSpark>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <ClickSpark
        sparkColor="#7eb8dd"
        sparkCount={10}
        sparkRadius={25}
        sparkSize={12}
        duration={500}
        extraScale={1.5}
      >
        <div className="min-h-screen text-gray-900 dark:text-white overflow-x-hidden relative">

          <div className="relative z-10">
            <Navigation
              onBrowseClick={() => setShowBrowse(true)}
              onCreatorClick={() => setCurrentPage('creator')}
              onLoginClick={openLogin}
              onSignupClick={openSignup}
            />
            <main>
              <Hero onGetStarted={openSignup} />
              <CurvedLoop
                marqueeText="✦ Personalized Videos ✦ Celebrity Shoutouts ✦ Unforgettable Moments ✦ Connect with Stars ✦"
                speed={2}
                curveAmount={0}
                direction="left"
                interactive={false}
              />
              <Suspense fallback={<SectionLoader />}>
                <Features />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <HowItWorks />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <JoinSection
                  onSuggestStar={() => setShowSuggestStar(true)}
                  onFeedback={() => setShowFeedback(true)}
                />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <CTA onGetStarted={openSignup} />
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

          <Suspense fallback={null}>
            <CreatorApplicationForm
              isOpen={showCreatorApplication}
              onClose={() => setShowCreatorApplication(false)}
            />
          </Suspense>

          <Suspense fallback={null}>
            <LoginModal
              isOpen={showLogin}
              onClose={() => setShowLogin(false)}
              initialMode={loginMode}
            />
          </Suspense>
        </div>
      </ClickSpark>
    </ThemeProvider>
  );
}

