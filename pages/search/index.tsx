
import Head from 'next/head'
import { useRouter } from 'next/router';

import {
  Box,
  Center,
  Text,
  Heading,
} from '@chakra-ui/react'

import { searchMovie } from '../../graphql/queries/movies';

import { MovieCarousel } from '../../components/movie-carousel';
import type { Movie } from '../../components/movie-card/types';

const Home = ({ searchResult }: { searchResult: { results: Movie[], pagination: any } }) => {
  const router = useRouter();
  const { query: { term } } = router;
  console.log({ searchResult })

  return (
    <Box w="100%" height="100vh">
      <Head>
        <title>The All Movies Database</title>
      </Head>
      <Center flexDirection="column" mt="8">
        <Box p='4'>
          <Heading>The All Movies Database</Heading>
        </Box>
        <Text fontSize='md' mt="8">Your search results for <i>{term}</i></Text>
        <Text fontSize='sm' mt="2">Total results: <i>{searchResult.pagination.total_results}</i></Text>
      </Center>
      <Box p='4'>
          <Box maxW="100%" mt="4">
            <MovieCarousel movies={searchResult.results} />
          </Box>
      </Box>
    </Box>
  )
}

export async function getServerSideProps({ query }: { query: any }) {
  const { term } = query

  try {
    const searchResult = await searchMovie(term);

    return {
      props: {
        searchResult,
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
