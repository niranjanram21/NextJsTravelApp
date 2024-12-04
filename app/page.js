'use client';

import Hero from "./components/HomeComponents/Hero";
import { useState, useEffect } from "react";

export default function Home() {

  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/index')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <Hero />
      <p>{message}</p>
    </div>
  );
}
