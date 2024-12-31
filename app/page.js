'use client';

import About from './components/HomeComponents/About';
import Hero from './components/HomeComponents/Hero';
import PopularDestinations from './components/HomeComponents/PopularDestinations';

export default function Home() {

  return (
    <>
      <Hero />
      <About />
      <PopularDestinations />
    </>
  );
}

