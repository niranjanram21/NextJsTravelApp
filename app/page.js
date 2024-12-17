'use client';

import About from './components/HomeComponents/About';
import Hero from './components/HomeComponents/Hero';
import { useState, useEffect } from 'react';

export default function Home() {

  return (
    <>
      <Hero />
      <About />
    </>
  );
}

