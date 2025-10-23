
import { Box, Button, Container, Heading, Text } from '@chakra-ui/react';

export default function Home(){
  return (
    <Box>
      <Box bgImage="url('/assets/background/hero-16x9.png')" bgSize="cover" bgPos="center" position="relative" _after={{content:'""', position:'absolute', inset:0, bgGradient:'linear(to-b, blackAlpha.700, blackAlpha.500)'}} minH="60vh">
        <Container position="relative" zIndex={1} py={24} color="white">
          <Heading size="2xl">RMS CargoTrack Pro</Heading>
          <Text mt={4} fontSize="xl">Rastreamento de Cargas em Tempo Real — Check-in, trilha GPS e Checkout com prova fotográfica.</Text>
          <Button mt={8} size="lg" colorScheme="teal">Entrar no Painel</Button>
        </Container>
      </Box>
      <Container py={10}>
        <Heading size="md" mb={4}>Status Rápido</Heading>
        <Text>Integre seu MAPBOX_TOKEN e NEXT_PUBLIC_API_URL em .env.local</Text>
      </Container>
    </Box>
  );
}
