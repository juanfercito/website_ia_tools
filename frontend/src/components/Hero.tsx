import React from 'react';
import styled from 'styled-components';

// Definimos los tipos para las props del componente Hero
interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6rem 2rem;
  text-align: center;
  border-radius: 8px;
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
  overflow: hidden;
  position: relative;
  gap: 1rem;
  width: 100%;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  position: absolute;
  padding: 4px 4px;
  filter: blur(4px);
  opacity: 0.5;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
  z-index: 1;
  position: relative;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: #d0d0d0;
  max-width: 800px;
  margin: 0 auto 2rem;
  z-index: 1;
  position: relative;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
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
  z-index: 1;
  position: relative;

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

export const Hero: React.FC<HeroProps> = ({ image, title, subtitle, ctaText, ctaLink }) => {
  return (
    <HeroSection>
      <HeroImage src={image} alt={title} />
      <HeroTitle>{title}</HeroTitle>
      <HeroSubtitle>{subtitle}</HeroSubtitle>
      <CTAButton href={ctaLink}><CTASpan>{ctaText}</CTASpan></CTAButton>
    </HeroSection>
  );
};