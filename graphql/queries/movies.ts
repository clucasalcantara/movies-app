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

export const searchMovie = async (term: string) => {
  try {
    const { data: { searchMovies } } = await GraphQLClient.query({
      query: gql`
        query searchMovies {
            searchMovies(query: "${term}") {
                results {
                    id
                    title
                    poster_path
                }
                pagination {
                    total_results
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
