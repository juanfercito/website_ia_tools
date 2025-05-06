// components/Hero.tsx
import React from 'react';
import styled from 'styled-components';

// Definimos los tipos para las props del componente Hero
interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const HeroSection = styled.section`
  padding: 6rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: #a0a0a0;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const CTAButton = styled.a`
  border: 0;
  background-image: linear-gradient(135deg, #007bff, #0056b3, #00DDFF);
  color: white;
  padding: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  width: fit-content;
  margin: 0 auto;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-image: linear-gradient(135deg, #0056b3, #007bff, #00DDFF);
    color: white;
    font-size: 1rem;
    transform: scale(1.05);
  }
      &:active {
    transform: scale(0.9);
  }
`;

const CTASpan = styled.span`
  border-radius: 50px;
  padding: 0.6rem 3rem;
  transition: all 0.3s ease; 
  &:hover {
    background-color: transparent;
  }
`;

export const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, ctaLink }) => {
  return (
    <HeroSection>
      <HeroTitle>{title}</HeroTitle>
      <HeroSubtitle>{subtitle}</HeroSubtitle>
      <CTAButton href={ctaLink}><CTASpan>{ctaText}</CTASpan></CTAButton>
    </HeroSection>
  );
};