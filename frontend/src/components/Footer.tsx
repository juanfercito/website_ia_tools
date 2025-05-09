// components/Footer.tsx
import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: #1a1a1a;
  color: #a0a0a0;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  border-radius: 12px;
  width: 100%;
`;

const SocialMediaContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialButton = styled.a`
  color: #a0a0a0;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const LinksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  a {
    color: #007bff;
  }
&:hover {
    a {
        color: #10BEFE;
    }
  }
`;

const Copyright = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  opacity: 0;
  animation: fadeIn 1.5s forwards;

  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      {/* Social Media */}
      <SocialMediaContainer>
        <SocialButton href="https://facebook.com" target="_blank">
          <FaFacebook />
        </SocialButton>
        <SocialButton href="https://twitter.com" target="_blank">
          <FaTwitter />
        </SocialButton>
        <SocialButton href="https://instagram.com" target="_blank">
          <FaInstagram />
        </SocialButton>
        <SocialButton href="https://linkedin.com" target="_blank">
          <FaLinkedin />
        </SocialButton>
      </SocialMediaContainer>

      {/* Enlaces */}
      <LinksContainer>
        <LinkColumn>
          <h4>Product</h4>
          <a href="/features">Features</a>
          <a href="/pricing">Pricing</a>
          <a href="/docs">Documentation</a>
        </LinkColumn>
        <LinkColumn>
          <h4>Company</h4>
          <a href="/about">About Us</a>
          <a href="/blog">Blog</a>
          <a href="/careers">Careers</a>
        </LinkColumn>
        <LinkColumn>
          <h4>Legal</h4>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </LinkColumn>
        <LinkColumn>
          <h4>Support</h4>
          <a href="/contact">Contact</a>
          <a href="/help">Help Center</a>
        </LinkColumn>
      </LinksContainer>

      {/* Copyright */}
      <Copyright>
        <span>JC Content Inc</span>
        <span>© 2025</span>
        <span>All Rights Reserved</span>
      </Copyright>
    </FooterContainer>
  );
};