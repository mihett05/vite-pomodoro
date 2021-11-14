import React from 'react';
import { Container } from '@chakra-ui/react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Container maxW="container.lg">{children}</Container>
    </>
  );
}

export default Layout;
