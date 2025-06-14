
import React from 'react';
import { Helmet } from "react-helmet-async";
import MainLayout from './MainLayout';
import TestForm from '@/components/TestForm';
import Footer from '@/components/Footer';

type TestModeLayoutProps = {
  onComplete: () => void;
  onBackToHome: () => void;
};

const TestModeLayout = ({ onComplete, onBackToHome }: TestModeLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>Test en cours - HypnoKick</title>
      </Helmet>
      
      <MainLayout onLogoClick={onBackToHome}>
        {/* Contenu du test */}
        <TestForm onComplete={onComplete} />
        
        {/* Footer pendant le test */}
        <Footer />
      </MainLayout>
    </>
  );
};

export default TestModeLayout;
