import { useEffect, useState } from "react";
import { Box, Center, Heading, Text, Stack, Flex } from "@chakra-ui/react";

export default function CardMovie({ mov }) {
  const [chars, setChars] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const { title, director, characters, release_date } = mov;

  const fetchCharacters = async () => {
    try {
      const response = await Promise.all(
        characters.map((character) =>
          fetch(character).then((res) => res.json())
        )
      );
      //   console.log(response);
      setChars(response);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    setMovieData(mov);
  }, [mov]);
  console.log(movieData);

  return (
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
          {title}
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
        {chars.map((char) => (
          <li key={char.name}>{char.name}</li>
        ))}
      </Stack>
    </Box>
  );
}
