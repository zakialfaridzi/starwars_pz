import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      mt={4}
    >
      <Flex
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="flex-start"
        mb={10}
      >
        <Text fontSize="3xl" fontWeight="bold">
          🌠Swapi Productzilla🌠
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
