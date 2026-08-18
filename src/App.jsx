import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./sections/Home/Home";
import About from "./sections/About/About";
import Projects from "./sections/Projects/Projects";
import Contact from "./sections/Contact/Contact";
import FloatingContact from "./components/FloatingContact/FloatingContact";
import FloatingCharacter from "./components/FloatingCharacter/FloatingCharacter";


function App() {
  return (
    <>
      <Navbar />

      <main>
        <Home />
        <About />
        <Projects />
        <Contact />
            </main>

      <FloatingContact />
      <FloatingCharacter />

      <Footer />
    </>
  );
}

export default App;