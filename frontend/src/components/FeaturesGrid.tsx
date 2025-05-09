// components/FeaturesGrid.tsx
import React from 'react';
import styled from 'styled-components';

// Estilos inspirados en el ejemplo
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
  width: 100%;
`;

const FeatureCard = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  // Efecto de escala en toda la tarjeta
  &:hover {
    transform: scale(1.05); // Aumentar tamaño de la tarjeta
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
`;

const FeatureImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease, filter 0.3s ease;
  z-index: 1;
  &:hover {
    filter: blur(4px); // image blur effect}
`;

const FeatureText = styled.div`
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  text-align: center;
  transition: all 0.3s ease;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.8);
  z-index: 2;
`;

const FeatureTitle = styled.h3`
  font-size: 1.6rem;
  margin: 0;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.8);
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0 0;
`;

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      image: '../../public/assets/manos-inteligencia-artificial.webp', // Agrega tus imágenes en `public/`
      title: 'AI-Powered Solutions',
      description: 'Automate tasks with state-of-the-art AI models',
    },
    {
      image: '../../public/assets/deploy-ai.webp',
      title: 'Instant Deployment',
      description: 'Deploy AI tools in seconds with our intuitive interface',
    },
    {
      image: '../../public/assets/seguridad_retocada_ia.webp',
      title: 'Enterprise Security',
      description: 'End-to-end encryption for all your projects',
    },
  ];

  return (
    <Grid>
      {features.map((feature, index) => (
        <FeatureCard key={index}>
          <FeatureImage src={feature.image} alt={feature.title} />
          <FeatureText>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureText>
        </FeatureCard>
      ))}
    </Grid>
  );
};