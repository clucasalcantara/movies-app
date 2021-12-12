
import Head from 'next/head'
import { useState } from 'react';
import { useRouter } from 'next/router';
// UI
import { ArrowBackIcon } from '@chakra-ui/icons'


import {
  Box,
  Center,
  Image,
  Heading,
  Text
} from '@chakra-ui/react'

import { MovieCarousel } from '../../components';

// GraphQL
import { getMovieById } from '../../graphql/queries/movies';

// Types
import type { Movie } from '../../components/movie-card/types';

const Home = ({ movie }: { movie: Movie }) => {
  const router = useRouter();
  const [search, setSearchTerm] = useState<string>('');
  console.log({ movie });

  const handleSearch = () => 
    router.push({
      pathname: '/search',
      query: { term: search },
    });

  return (
    <Box w="100%" height="100vh">
      <Head>
        <title>{`${movie.title}`}</title>
      </Head>
      <Box flexDirection="row" p="4" cursor="pointer" onClick={() => router.back()} gap="4">
        <ArrowBackIcon />
        <Text as="b">Back</Text>
      </Box>
      <Center flexDirection="column" mt="8">
        <Box p='4'>
          <Image src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
          <Heading mt="4">{movie.title}</Heading>
          <Box flexDirection="column">
            <Text mt="4"><b>Rating</b>: {movie.vote_average} of 10</Text>
            <Text mt="2"><b>Sinopse:</b> {movie.overview}</Text>
            <Text mt="2"><b>Release date:</b> {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(movie.release_date))}</Text>
          </Box>
        </Box>
        </Center>
    </Box>
  )
}

export async function getServerSideProps({ query }: { query: any }) {
  const { slug } = query;
  const [movieId] = slug as string[];

  try {
    const movie = await getMovieById(movieId);

    return {
      props: {
        movie
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
