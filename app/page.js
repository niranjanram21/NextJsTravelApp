'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Hero from './components/HomeComponents/Hero';
const About = dynamic(()=> import('./components/HomeComponents/About'));
const PopularDestinations = dynamic(()=>import('./components/HomeComponents/PopularDestinations'));

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
