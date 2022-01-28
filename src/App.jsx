import React, { useEffect, useState } from "react";
import { ChakraProvider, Stack, Container, HStack } from "@chakra-ui/react";
import Header from "./components/Header";
import Card from "./components/Card";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import SearchBarMovie from "./components/SearchBarMovie";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  //   const chars = characters.map((char) => {
  //     console.log(char);
  //   });

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

  async function onSearchMovieSubmit(searchMovies) {
    setLoading(true);
    const searchResults = await axios
      .get(`https://swapi.dev/api/films/?search=${searchMovies}`)
      .then((response) => response.data.results);
    setMovies(searchResults);
    setLoading(false);
  }

  return (
    <ChakraProvider resetCSS>
      {/* {chars} */}
      <Header />
      <Container maxW={1000}>
        <Stack flexDirection="row" align={"center"} justify={"center"}>
          <HStack>
            <SearchBar onSearch={onSearchCharacterSubmit} />
            <SearchBarMovie onSearch={onSearchMovieSubmit} />
          </HStack>
        </Stack>
        {loading ? (
          <span>loading...</span>
        ) : (
          characters.map((characters) => (
            <Card key={characters.name} char={characters} mov={movies} />
          ))
        )}
      </Container>
    </ChakraProvider>
  );
};

export default App;
