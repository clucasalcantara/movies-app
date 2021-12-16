
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState } from 'react';
import debounce from 'lodash.debounce';

import {
  Box,
  Center,
  Text,
  Heading,
  Input,
  InputGroup,
} from '@chakra-ui/react'

import { searchMovie } from '../../graphql/queries/movies';

import { MovieCarousel } from '../../components/movie-carousel';
import type { Movie } from '../../components/movie-card/types';

const Home = ({ searchResult }: { searchResult: { results: Movie[], pagination: any } }) => {
  const router = useRouter();
  const { query: { term } } = router;
  
  const [search, setSearchTerm] = useState<string>(term as string);
  const [searchData, setSearchData] = useState<{ pagination: any; total_results: number; results: Movie[] }>({ pagination: searchResult?.pagination, total_results: searchResult?.pagination.total_results, results: searchResult?.results });

  const debouncedSearchAction = debounce((e) => handleSearch(e.target.value), 500)

  const handleSearch = async (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const response = await fetch(`/api/search?term=${searchTerm}&page=1`, {
      method: 'GET',
    });

    const { pagination, results } = await response.json();
    
    setSearchData({ pagination, total_results: pagination?.total_results, results });
  }

  const appendSearch = async () => {
    const newPage = searchData.pagination.page + 1;

    const response = await fetch(`/api/search?term=${search}&page=${newPage}`, {
      method: 'GET',
    });

    const { pagination, results } = await response.json();

    setSearchData({
          pagination,
        total_results: searchData.total_results + results.length,
        results: [...searchData.results, ...results],
    });
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
            <Input placeholder='Search your title' onChange={(e) => debouncedSearchAction(e)} />
              {/* <InputRightElement onClick={() => search.length && handleSearch()} cursor={search.length ? "pointer" : 'not-allowed'}>
              <SearchIcon />
            </InputRightElement> */}
          </InputGroup>
        </Box>
        <Text fontSize='md' mt="8">{search?.length ? `Your search results for <i>${search}</i>` : `Type something to search`}</Text>
        <Text fontSize='sm' mt="2">Total results: <i>{searchData?.total_results || 0}</i></Text>
      </Center>
      <Box p='4'>
          <Box maxW="100%" mt="4">
            <MovieCarousel movies={searchData?.results || []} />
            <span onClick={() => appendSearch()}>Load more</span>
          </Box>
      </Box>
    </Box>
  )
}

export async function getServerSideProps({ query }: { query: any }) {
  const { term } = query

  if (term) {
    try {
      const searchResult = await searchMovie(term, '1');
  
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
  
  return { props: { } };
}

export default Home
