// components/NewsSection.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NewsContainer = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const NewsCard = styled.div`
  background: #2d2d2d;
  border-radius: 10px;
  padding: 1.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MoreButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #007bff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const NewsSection: React.FC = () => {
  // Estado para almacenar las noticias
  const [news, setNews] = useState<any[]>([]);

  // Efecto para cargar noticias al montar el componente
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/news'); // Endpoint del backend
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        setNews(data); // Actualizar el estado con las noticias
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <NewsContainer>
      <h2 style={{ color: '#e0e0e0' }}>Latest in AI</h2>
      <NewsGrid>
        {news.map((item, index) => (
          <NewsCard key={index}>
            <img
              src={item.image || '/default-news.webp'} // Usar una imagen por defecto si no hay imagen
              alt={item.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <h3 style={{ color: '#ffffff', marginTop: '1rem' }}>{item.title}</h3>
            <p style={{ color: '#a0a0a0', marginTop: '0.5rem' }}>{item.summary}</p>
            <small style={{ color: '#606060', marginTop: '0.5rem', display: 'block' }}>
              {item.source} - {item.date}
            </small>
          </NewsCard>
        ))}
      </NewsGrid>
      <MoreButton onClick={() => window.location.href = '/news'}>
        More News →
      </MoreButton>
    </NewsContainer>
  );
};