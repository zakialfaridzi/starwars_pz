import { useEffect, useState } from "react";
import { Box, Center, Heading, Text, Stack, Flex } from "@chakra-ui/react";

export default function Card({ char }) {
  const [movies, setMovies] = useState([]);
  const { name, films, gender, height } = char;

  const fetchFilm = async () => {
    try {
      const response = await Promise.all(
        films.map((film) => fetch(film).then((res) => res.json()))
      );
      setMovies(response);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchFilm();
  }, []);

  return (
    <Box
      maxW={"full"}
      w={"full"}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
    >
      <Stack>
        <Text
          color={"green.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"sm"}
          letterSpacing={1.1}
        >
          Characters
        </Text>
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {name}
        </Heading>

        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
          <Flex>
            <Text fontWeight={700}>Gender: </Text>
            <Text casing={"capitalize"}>&nbsp;{gender}</Text>
          </Flex>
          <Flex>
            <Text fontWeight={700}>Height: </Text>
            <Text>&nbsp;{height}</Text>
          </Flex>
        </Stack>
        <Heading size={"sm"}>Movies:</Heading>
        {movies.map((movie) => (
          <li key={movie.title}>{movie.title}</li>
        ))}
      </Stack>
    </Box>
  );
}
