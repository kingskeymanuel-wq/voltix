
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles } from 'lucide-react';

const WelcomePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState('');

  useEffect(() => {
    // This needs to run client-side to access searchParams
    const clientName = searchParams.get('name') || 'Client';
    setName(clientName);
    
    // Trigger storage event for header update
    window.dispatchEvent(new Event('storage'));

    const timer = setTimeout(() => {
      router.push('/');
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [router, searchParams]);
  
  if (!name) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900/80 text-white">
      <Sparkles className="w-24 h-24 text-primary animate-pulse" />
      <h1 className="mt-8 text-4xl md:text-6xl font-black text-center animate-glow bg-gradient-to-r from-white to-primary/80 bg-clip-text text-transparent drop-shadow-2xl">
        Bienvenue, {name} !
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Content de vous voir chez VOLTIX SMART.
      </p>
       <p className="mt-2 text-sm text-muted-foreground">
        Vous allez être redirigé vers la page d'accueil...
      </p>
    </div>
  );
};

export default WelcomePage;
