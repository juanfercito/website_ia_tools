// pages/Home.tsx
import React from 'react';
import styled from 'styled-components';
import {Hero} from '../components/Hero';
import {FeaturesGrid} from '../components/FeaturesGrid';
import {Testimonials} from '../components/Testimonials';
import {CTA} from '../components/CTA';
import {Footer} from '../components/Footer';
import Navbar from '../components/Navbar';

const HomeContainer = styled.div`
  min-height: 100vh;
  color: #e0e0e0;
  padding: 0 2rem 2rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>

      <Navbar />

      {/* Hero Section (como OpenAI) */}
      <Hero 
        image="../../public/assets/ai-robot.webp" // Root image
        title="Build the Future with AI Tools"
        subtitle="Your all-in-one platform for cutting-edge AI solutions"
        ctaText="Explore Now →"
        ctaLink="/login" // Redirigir a login/register
      />

      {/* Features Grid (como Vercel) */}
      <FeaturesGrid />

      {/* Testimonials (como Anthropic) */}
      <Testimonials />

      {/* CTA Final (como Netlify) */}
      <CTA 
        title="Ready to Transform Your Workflow?"
        subtitle="Join thousands of developers and businesses leveraging AI"
        buttonText="Get Started"
        buttonLink="/register"
      />

      {/* Footer Component */}
      <Footer />
    </HomeContainer>
  );
};

export default Home;