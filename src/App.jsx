import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Stack,
  Container,
  HStack,
  Grid,
  GridItem,
  Tag,
  Text,
  Flex,
  Heading,
  Box,
} from "@chakra-ui/react";
import Header from "./components/Header";
import Card from "./components/Card";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import SearchBarMovie from "./components/SearchBarMovie";
import CardMovie from "./components/CardMovie";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMovie, setLoadingMovie] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("https://swapi.dev/api/people/").then((response) => {
      setCharacters(response.data.results);
    });
    setLoading(false);
  }, []);

  async function onSearchCharacterSubmit(searchCharacters) {
    setLoading(true);
    const searchResults = await axios
      .get(`https://swapi.dev/api/people/?search=${searchCharacters}`)
      .then((response) => response.data.results);
    setCharacters(searchResults);
    setLoading(false);
  }

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
    <ChakraProvider resetCSS>
      <Header />
      <Grid
        p={10}
        gap={6}
        templateColumns="repeat(auto-fit, minmax(350px, 1fr))"
      >
        <Stack>
          <Box
            backgroundColor="white"
            boxShadow="sm"
            borderRadius="lg"
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
                Star Wars Characters
              </Heading>
              <SearchBar onSearch={onSearchCharacterSubmit} />
            </Flex>
            <Stack ml={4} spacing={2} mt={4} mr={4}>
              <Stack
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                {loading ? (
                  <span>loading...</span>
                ) : characters ? (
                  characters.map((characters) => (
                    <Card key={characters.name} char={characters} />
                  ))
                ) : (
                  <h1>gaada</h1>
                )}
              </Stack>
            </Stack>
          </Box>
        </Stack>
        <Box>
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
                Star Wars Movies
              </Heading>
              <SearchBarMovie onSearchMovie={onSearchMovieSubmit} />
            </Flex>
            <Stack spacing={4} ml={4} mt={4}>
              <Stack spacing={2}>
                {loadingMovie ? (
                  <span>loading...</span>
                ) : movies ? (
                  movies.map((movies) => (
                    <CardMovie key={movies.name} mov={movies} />
                  ))
                ) : (
                  <h1>gaada</h1>
                )}
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Grid>
    </ChakraProvider>
  );
};

export default App;
