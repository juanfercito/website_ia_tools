// components/Testimonials.tsx
import React from 'react';
import styled from 'styled-components';

const TestimonialsContainer = styled.div`
  background: #1a1a1a;
  padding: 4rem 2rem;
  border-radius: 10px;
`;

const Testimonial = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  border-left: 4px solid #007bff;
`;

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "This platform revolutionized how we integrate AI into our workflows.",
      author: "— CEO of Tech Corp",
    },
    {
      quote: "The best AI toolset for developers in 2025.",
      author: "— Lead Engineer at DevAI",
    },
  ];

  return (
    <TestimonialsContainer>
      <h2>What Our Users Say</h2>
      {testimonials.map((t, index) => (
        <Testimonial key={index}>
          <p>{t.quote}</p>
          <small>{t.author}</small>
        </Testimonial>
      ))}
    </TestimonialsContainer>
  );
};