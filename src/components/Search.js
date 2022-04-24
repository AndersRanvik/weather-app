import React, { useState } from 'react';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/form-control';
import { Button } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';

const Search = ({ addSearch, isError }) => {
  const [input, setInput] = useState();

  const handleOnChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addSearch(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={isError}>
        <FormLabel htmlFor="city"></FormLabel>
        <Input id="city" type="city" value={input} onChange={handleOnChange} />
        {!isError ? (
          <FormHelperText>Søk på sted</FormHelperText>
        ) : (
          <FormErrorMessage>Kunne ikke finne sted</FormErrorMessage>
        )}
      </FormControl>
      <Button type="submit" w="100px">
        Søk
      </Button>
    </form>
  );
};

export default Search;
