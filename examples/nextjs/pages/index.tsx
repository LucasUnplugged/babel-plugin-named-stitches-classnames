import Head from 'next/head'
import { styled } from '../stitches.config'
import StitchesLogo from '../components/StitchesLogo'
import Header from '../components/Header'

const Box = styled('div', {
  boxSizing: 'border-box'
})

const Text = styled('p', {
  fontFamily: '$system',
  color: '$hiContrast',
})

const Link = styled('a', {
  fontFamily: '$system',
  textDecoration: 'none',
  color: '$purple600',
})

const Container = styled(Box, {
  margin: 'auto',
  padding: '$3',

  variants: {
    size: {
      '1': {
        maxWidth: '300px',
      },
      '2': {
        maxWidth: '585px',
      },
      '3': {
        maxWidth: '865px',
      },
    },
  },
})

export default function Home() {
  return (
    <Box as="main" css={{ padding: '$6' }}>
      <Head>
        <title>Use Stitches with Next.js</title>
      </Head>
      <Container as="section" size={{ initial: '1', bp1: '2' }}>
        <StitchesLogo />
        <Header>
          <Text as="h1" css={{ fontSize: '$7' }}>Hello, from Stitches.</Text>
        </Header>
        <Text>
          For full documentation, visit{' '}
          <Link href="https://stitches.dev">stitches.dev</Link>.
        </Text>
      </Container>
    </Box>
  )
}
