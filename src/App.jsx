import Navbar from './components/Navbar';
import CookieConsent from './components/CookieConsent';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import Faq from './components/Faq';
import UseCases from './components/UseCases';
import Pricing from './components/Pricing';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
    return (
        <div className="app">
            <Navbar />
            <CookieConsent />
            <main>
                <Hero />
                <SocialProof />
                <Features />
                <UseCases />
                <Faq />
                <Pricing />
                <CallToAction />
            </main>
            <Footer />
        </div>
    );
}

export default App;
