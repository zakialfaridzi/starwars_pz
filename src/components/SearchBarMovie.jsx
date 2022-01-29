import React, { useState } from "react";
import { FormLabel, Input, FormControl, Button } from "@chakra-ui/react";

const SearchBarMovie = ({ onSearchMovie }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    onSearchMovie(searchValue);
    setSearchValue("");
  };

  return (
    <form onSubmit={callSearchFunction}>
      <FormControl w={300}>
        <FormLabel htmlFor="searchInput">Search Movies</FormLabel>
        <Input
          id="searchInput"
          type="text"
          onChange={handleSearchInputChanges}
          value={searchValue}
        />
        <Button width="full" mt={4} type="submit">
          Search
        </Button>
      </FormControl>
    </form>
  );
};

export default SearchBarMovie;
