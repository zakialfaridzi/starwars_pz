import { Box, Flex, Heading, Spinner, Stack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState, createContext } from "react";
import Card from "./Card";
import SearchBar from "./SearchBar";

export const CharactersContext = createContext();

const CharactersSection = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

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
  return (
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
          Characters
        </Heading>
        <SearchBar onSearch={onSearchCharacterSubmit} />
      </Flex>
      <Stack ml={4} spacing={2} mt={4} mr={4}>
        <Stack justifyContent="flex-start" alignItems="flex-start" spacing={2}>
          {loading ? (
            <Spinner />
          ) : characters ? (
            <CharactersContext.Provider value={characters}>
              {characters.map((characters) => (
                <Card key={characters.name} films={characters.films} />
              ))}
            </CharactersContext.Provider>
          ) : (
            <h1>No Data.</h1>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default CharactersSection;
