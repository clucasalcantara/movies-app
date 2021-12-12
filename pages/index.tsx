
import Head from 'next/head'
import { useState } from 'react';
import { useRouter } from 'next/router';
// UI
import { SearchIcon } from '@chakra-ui/icons';

import {
  Box,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text
} from '@chakra-ui/react'

import { MovieCarousel } from '../components';

// GraphQL
import { getPopularMovies } from '../graphql/queries/movies';

// Types
import type { Movie } from '../components/movie-card/types';

const Home = ({ popularMovies }: { popularMovies: { results: Movie[] } }) => {
  const router = useRouter();
  const [search, setSearchTerm] = useState<string>('');

  const handleSearch = () => 
    router.push({
      pathname: '/search',
      query: { term: search },
    });

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      return router.push({
        pathname: '/search',
        query: { term: search },
      });
    }
    
    return null;
  }
    

  return (
    <Box w="100%" height="100vh">
      <Head>
        <title>The All Movies Database</title>
      </Head>
      <Center flexDirection="column" mt="8">
        <Box p='4'>
          <Heading>The All Movies Database</Heading>
        </Box>
        <Text fontSize='md'>Find your movie</Text>
        <Box w="50%" mt="4">
          <InputGroup>
            <Input placeholder='Search your title' onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={(e) => handleEnter(e)}/>
            <InputRightElement onClick={() => search.length && handleSearch()} cursor={search.length ? "pointer" : 'not-allowed'}>
              <SearchIcon />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Text fontSize='md' mt="4">or</Text>
        <Text fontSize='xl' mt="8">Browse by the most popular</Text>
      </Center>
      <Box mt="4">
        <MovieCarousel movies={popularMovies.results} />
      </Box>
    </Box>
  )
}

export async function getServerSideProps() {
  try {
    const popularMovies = await getPopularMovies();

    return {
      props: {
        popularMovies,
      },
    };
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
}

export default Home
