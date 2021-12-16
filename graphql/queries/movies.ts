import { gql } from '@apollo/client';
// GraphQL Client
import { GraphQLClient } from '../client';

export const getPopularMovies = async () => {
  try {
    const { data: { getAllPopularMovies } } = await GraphQLClient.query({
      query: gql`
        query getAllPopularMovies {
            getAllPopularMovies {
                results {
                    id
                    title
                    poster_path
                }
            }
        }
      `,
    });

    return getAllPopularMovies;
  } catch (error) {
    throw new Error(`Error fetching category page data ${error}`);
  }
};

export const searchMovie = async (term: string, page: string) => {
  console.log({ term, page })
  try {
    const { data: { searchMovies } } = await GraphQLClient.query({
      query: gql`
        query searchMovies {
          searchMovies(searchTerm: "${term}", page: ${parseInt(page)}) {
            results {
              id
              title
              poster_path
            }
            pagination {
              total_results
              total_pages
              page
            }
          }
        }
      `,
    });

    return searchMovies;
  } catch (error) {
    throw new Error(`Error fetching category page data ${error}`);
  }
};

export const getMovieById = async (movieId: string) => {
    console.log({ movieId })
  try {
    const { data: { getMovieById } } = await GraphQLClient.query({
      query: gql`
        query getMovieById {
            getMovieById(id: ${parseInt(movieId)}) {
                id
                title
                poster_path
                overview
                vote_average
                release_date
            }
        }
      `,
    });
    
    return getMovieById;
  } catch (error) {
      console.log('Here', { error })
    throw new Error(`Error fetching category page data ${error}`);
  }
};
