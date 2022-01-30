import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Flex,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { GiDeathStar } from "react-icons/gi";

export default function CardMovie({ mov }) {
  const [chars, setChars] = useState([]);
  const {
    title,
    episode_id,
    director,
    release_date,
    opening_crawl,
    characters,
  } = mov;

  const fetchCharacters = async () => {
    try {
      const response = await Promise.all(
        characters.map((character) =>
          fetch(character).then((res) => res.json())
        )
      );
      setChars(response);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchCharacters();
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
          Movies
        </Text>
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {title} (Eps {episode_id})
        </Heading>
        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
          <Flex>
            <Text fontWeight={700}>Director: </Text>
            <Text>&nbsp;{director}</Text>
          </Flex>
          <Flex>
            <Text fontWeight={700}>Release Date: </Text>
            <Text>&nbsp;{release_date}</Text>
          </Flex>
        </Stack>
        <Heading size={"sm"}>Characters:</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          {chars.map((char) => (
            <List spacing={2}>
              <ListItem key={char.name}>
                <ListIcon as={GiDeathStar} color="black" />
                {char.name}
              </ListItem>
            </List>
          ))}
        </SimpleGrid>
      </Stack>
      <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
          <Heading size={"sm"} mb={2}>
            Opener:
          </Heading>
          <Text color={"gray.500"} mt={1}>
            {opening_crawl}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
