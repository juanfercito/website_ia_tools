// components/CTA.tsx
import React from 'react';
import styled from 'styled-components';

const CTABanner = styled.div`
  background: linear-gradient(135deg, #007bff, #0069d9);
  color: white;
  padding: 3rem;
  border-radius: 10px;
  text-align: center;
  margin: 4rem 0;
  width: 100%;
`;

const CTAButton = styled.a`
  border: 0;
  background: white;
  color: #007bff;
  padding: 1rem;
  border-radius: 50px;
  top: 1rem;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  position: relative;
  transition: all 0.3s ease;
  display: inline-block;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, yellow, red, blue, deeppink, blue, yellow, red, blue, deeppink, blue);
    background-size: 800%;
    border-radius: 50px;
    filter: blur(10px);
    opacity: 0.9;
    animation: glowing 20s linear infinite;
    transition: transform 0.3s ease;
  }

  &:after {
    content: '';
    position: absolute;
    border-radius: inherit;
    inset: 0;
    z-index: -1;
    background-color: white;
    transition: background-image 0.3s ease, background-color 0.3s ease;
  }

  &:hover {
    color: white;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.9);
  }

  &:hover::after {
    background-image: linear-gradient(135deg, #10BEFE, #007bff, #00DDFF);
    background-color: transparent;
  }

  @keyframes glowing {
    0% {background-position: 0 0;}
    50% {background-position: 400% 0%;}
    100% {background-position: 0 0;}
  }
`;

const CTASpan = styled.span`
  border-radius: 50px;
  padding: 0.6rem 3rem;
  transition: all 0.3s ease; 
  &:hover {
    background-color: transparent;
    transform: scale(1.05);
    
  }
  &:active {
    transform: scale(0.95);
    transition: transform 0.3s ease;
  }
`;
export const CTA: React.FC<{ title: string; subtitle: string; buttonText: string; buttonLink: string }> = ({ title, subtitle, buttonText, buttonLink }) => {
  return (
    <CTABanner>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <CTAButton href={buttonLink} target="_blank" rel="noopener noreferrer"><CTASpan>{buttonText}</CTASpan></CTAButton>
    </CTABanner>
  );
};