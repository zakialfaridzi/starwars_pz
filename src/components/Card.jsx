import { useEffect, useState } from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";

export default function Card({ char, mov }) {
  const [movies, setMovies] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const { name, films, birth_year, species } = char;

  const fetchData = () => {
    mov.map((movie) => {
      setMovieData(movie);
    });
  };

  console.log(movieData);

  const fetchFilm = async () => {
    try {
      const response = await Promise.all(
        films.map((film) => fetch(film).then((res) => res.json()))
      );
      //   console.log(response);
      setMovies(response);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const fetchSpecies = async () => {
    try {
      const response = await Promise.all(
        species.map((spec) => fetch(spec).then((res) => res.json()))
      );
      //   console.log(response);
      setSpeciesData(response);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchFilm();
    // fetchSpecies();
  }, []);

  useEffect(() => {
    fetchData();
  }, [movies]);

  return !speciesData ? (
    <Center py={6}>
      <Box
        maxW={"445px"}
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
            Movies
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {"a"}
          </Heading>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text color={"gray.500"}>{birth_year}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  ) : (
    <Center py={6}>
      <Box
        maxW={"445px"}
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
          {speciesData.map((spec) => (
            <Text>{spec.name}</Text>
          ))}
          {movies.map((movie) => (
            <li key={movie.title}>{movie.title}</li>
          ))}
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text color={"gray.500"}>{birth_year}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
