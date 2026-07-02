import Loader from './Loader';
import Hero from './Hero';
import About from './About';
import Marquee from './Marquee';
import Experience from './Experience';
import Stack from './Stack';
import Projects from './Projects';
import JournalTeaser from './JournalTeaser';
import Testimonials from './Testimonials';
import Consulting from './Consulting';
import Contact from './Contact';

export default function Home() {
  return (
    <>
      <Loader />
      <Hero />
      <About />
      <Marquee />
      <Experience />
      <Stack />
      <Projects />
      <JournalTeaser />
      <Testimonials />
      <Consulting />
      <Contact />
    </>
  );
}
