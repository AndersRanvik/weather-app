import React, { useState } from 'react';
import { Container, VStack } from '@chakra-ui/react';
import useWeather from '../hooks/useWeather';
import Search from '../components/Search';
import WeatherToDay from '../components/WeatherToDay';
import FutureWeather from '../components/FutureWeather';

const SearchPage = () => {
  const [location, setLocation] = useState();
  const { data } = useWeather(location);

  const addSearch = value => {
    setLocation(value);
  };

  return (
    <VStack>
      <Container maxW="7xl">
        <Search addSearch={addSearch} location={location} />
        {data && (
          <>
            <WeatherToDay weatherCast={data} />
            <FutureWeather weatherCast={data} />
          </>
        )}
      </Container>
    </VStack>
  );
};

export default SearchPage;
