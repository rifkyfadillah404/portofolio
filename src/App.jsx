import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div style={{ position: 'relative' }}>
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
