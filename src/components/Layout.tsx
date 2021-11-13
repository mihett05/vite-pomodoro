import React from 'react';
import { Box, Center, Container } from '@chakra-ui/react';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Center h="100vh">{children}</Center>
    </>
  );
}

export default Layout;
