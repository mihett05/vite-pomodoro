import React from 'react';
import { Box, Center, Container } from '@chakra-ui/react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Center h="90vh">{children}</Center>
    </>
  );
}

export default Layout;
