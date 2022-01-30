import { useContext, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Flex,
  List,
  SimpleGrid,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { GiDeathStar } from "react-icons/gi";
import { CharactersContext } from "./CharactersSection";

export default function Card({ films }) {
  const char = useContext(CharactersContext);
  const [movies, setMovies] = useState([]);

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

  return char.map((chara) => {
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
            {chara.name}
          </Heading>

          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Flex>
              <Text fontWeight={700}>Gender: </Text>
              <Text casing={"capitalize"}>&nbsp;{chara.gender}</Text>
            </Flex>
            <Flex>
              <Text fontWeight={700}>Height: </Text>
              <Text>&nbsp;{chara.height}cm</Text>
            </Flex>
          </Stack>
          <Heading size={"sm"}>Movies:</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {movies.map((movie) => (
              <List spacing={2}>
                <ListItem key={movie.title}>
                  <ListIcon as={GiDeathStar} color="black" />
                  {movie.title}
                </ListItem>
              </List>
            ))}
          </SimpleGrid>
        </Stack>
      </Box>
    );
  });
}
