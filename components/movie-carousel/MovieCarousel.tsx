import Slider from "react-slick";
import { Box } from '@chakra-ui/react';
// Carousel Items
import { MovieCard } from '../movie-card';
import type { Movie } from '../movie-card/types';
// Styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function MovieCarousel({ movies = [] }: { movies?: Movie[] }) {
    const settings = {
        dots: true,
        arrows: true,
        speed: 500,
        slidesToScroll: 1,
        rows: 2,
        slidesPerRow: 2,
        slidesToShow: 4,
    };

    return (
        <Box pb="10">
        <Slider {...settings}>
            {movies.map((movie: Movie) => (
                <MovieCard {...movie} key={movie.id} />
            ))}
        </Slider>
        </Box>
    );

}