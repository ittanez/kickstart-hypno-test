
import React from 'react';
import MainLayout from './MainLayout';
import ThankYouMessage from '@/components/ThankYouMessage';
import Footer from '@/components/Footer';

type ThankYouLayoutProps = {
  onBackToHome: () => void;
};

const ThankYouLayout = ({ onBackToHome }: ThankYouLayoutProps) => {
  return (
    <MainLayout onLogoClick={onBackToHome}>
      {/* Message de remerciement */}
      <ThankYouMessage onBackToHome={onBackToHome} />
      
      {/* Footer sur la page de remerciement */}
      <Footer />
    </MainLayout>
  );
};

export default ThankYouLayout;
