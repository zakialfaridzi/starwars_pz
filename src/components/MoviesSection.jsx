import { Box, Flex, Heading, Spinner, Stack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardMovie from "./CardMovie";
import SearchBarMovie from "./SearchBarMovie";

const MoviesSection = () => {
  const [movies, setMovies] = useState([]);
  const [loadingMovie, setLoadingMovie] = useState(true);

  useEffect(() => {
    setLoadingMovie(true);
    axios.get("https://swapi.dev/api/films/").then((response) => {
      setMovies(response.data.results);
    });
    setLoadingMovie(false);
  }, []);

  async function onSearchMovieSubmit(searchMovies) {
    setLoadingMovie(true);
    const searchResults = await axios
      .get(`https://swapi.dev/api/films/?search=${searchMovies}`)
      .then((response) => response.data.results);
    setMovies(searchResults);
    setLoadingMovie(false);
  }

  return (
    <Box
      backgroundColor="white"
      borderRadius="lg"
      boxShadow="sm"
      pl={3}
      pr={3}
      pt={5}
      pb={5}
    >
      <Flex
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        pb={8}
      >
        <Heading
          size="md"
          as="h2"
          lineHeight="shorter"
          fontWeight="bold"
          fontFamily="heading"
          mb={8}
        >
          Movies
        </Heading>
        <SearchBarMovie onSearchMovie={onSearchMovieSubmit} />
      </Flex>
      <Stack ml={4} spacing={2} mt={4} mr={4}>
        <Stack justifyContent="flex-start" alignItems="flex-start" spacing={2}>
          {loadingMovie ? (
            <Spinner />
          ) : movies ? (
            movies.map((movies) => <CardMovie key={movies.name} mov={movies} />)
          ) : (
            <h1>gaada</h1>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default MoviesSection;
