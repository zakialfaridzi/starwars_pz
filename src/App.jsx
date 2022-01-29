import { ChakraProvider, Grid } from "@chakra-ui/react";
import Header from "./components/Header";
import CharactersSection from "./components/CharactersSection";
import MoviesSection from "./components/MoviesSection";

const App = () => {
  return (
    <ChakraProvider resetCSS>
      <Header />
      <Grid
        p={10}
        gap={6}
        templateColumns="repeat(auto-fit, minmax(150px, 1fr))"
      >
        <CharactersSection />
        <MoviesSection />
      </Grid>
    </ChakraProvider>
  );
};

export default App;
