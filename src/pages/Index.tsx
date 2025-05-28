
import React from 'react';
import { Helmet } from 'react-helmet-async';
import TestForm from '@/components/TestForm';
import NavMenu from '@/components/NavMenu';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Test de Réceptivité à l'Hypnose - HypnoKick | Découvrez votre potentiel hypnotique</title>
        <meta name="description" content="Découvrez votre niveau de réceptivité à l'hypnose avec notre test gratuit. Évaluez votre potentiel hypnotique et recevez des conseils personnalisés d'Alain Zenatti, hypnothérapeute à Paris." />
        <meta name="keywords" content="test hypnose, réceptivité hypnotique, hypnothérapie Paris, Alain Zenatti, auto-hypnose, développement personnel" />
        <link rel="canonical" href="https://hypnokick.novahypnose.fr/" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">
                  <span className="text-hypno-primary">Hypno</span>
                  <span className="text-hypno-accent">Kick</span>
                </h1>
              </div>
              <NavMenu />
            </div>
          </div>
        </header>

        <main>
          <TestForm />
        </main>
      </div>
    </>
  );
};

export default Index;
