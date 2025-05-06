// components/FeaturesGrid.tsx
import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const FeatureCard = styled.div`
  background: #2d2d2d;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Solutions',
      description: 'Automate tasks with state-of-the-art AI models',
    },
    {
      icon: '🚀',
      title: 'Instant Deployment',
      description: 'Deploy AI tools in seconds with our intuitive interface',
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'End-to-end encryption for all your projects',
    },
  ];

  return (
    <Grid>
      {features.map((feature, index) => (
        <FeatureCard key={index}>
          <h3>{feature.icon} {feature.title}</h3>
          <p>{feature.description}</p>
        </FeatureCard>
      ))}
    </Grid>
  );
};