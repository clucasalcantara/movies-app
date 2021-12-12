import { useRouter } from 'next/router';
import { Flex, Image, Text } from '@chakra-ui/react';

export default function MovieCard({
    id,
    title,
    poster_path
}: { id: number; title: string; poster_path: string }) {
    const router = useRouter();

    return (
    <Flex
        align="center"
        justify="center"
        borderRadius='lg'
        overflow='hidden'
        mt="8"
        flexDirection="column"
        onClick={() => router.push(`/movie/${id}`)}
        cursor="pointer"
    >
        <Image
            style={{ borderRadius: '8px'}}
            boxShadow="xl"
            suppressHydrationWarning
            src={`http://image.tmdb.org/t/p/w185${poster_path}`}
            alt={title}
            maxW="150px"
            maxH="200px"
            objectFit='cover'
        />      
        <Text
            mt="3"
            fontSize='sm'
            maxW="70%"
            textAlign="center"
            as="b"
        >
            {title}
        </Text>
    </Flex> 
  )
}