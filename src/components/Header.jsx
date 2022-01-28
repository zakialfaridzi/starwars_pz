import { Badge, Flex, Text } from "@chakra-ui/react";
import React from "react";

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
          ⚡️Welcome to OpenChakra
        </Text>
        <Badge variant="subtle" colorScheme="pink" ml={1}>
          BETA
        </Badge>
      </Flex>
    </Flex>
  );
};

export default Header;
