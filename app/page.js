'use client';

import { useEffect, useState } from 'react';
import About from './components/HomeComponents/About';
import Hero from './components/HomeComponents/Hero';
import PopularDestinations from './components/HomeComponents/PopularDestinations';

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Hero />
      <About />
      <PopularDestinations />
    </>
  );
}
