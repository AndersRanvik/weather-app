import React, { useState } from 'react';
import { Container, VStack, Box, Heading } from '@chakra-ui/react';
import useWeather from '../hooks/useWeather';
import MyFavorites from '../components/MyFavorites';
import Search from '../components/Search';
import WeatherToDay from '../components/WeatherToDay';
import FutureWeather from '../components/FutureWeather';

const Home = () => {
  const [location, setLocation] = useState();
  const { data } = useWeather(location);
  const [cities, setCities] = useState([]);

  const addToFavorites = city => {
    const myFavoites = [...cities];
    myFavoites.push(city);
    setCities(myFavoites);
    localStorage.setItem('city', JSON.stringify(city));
  };

  const addSearch = value => {
    setLocation(value);
  };

  return (
    <VStack>
      <Container maxW="7xl">
        <Box pb="10">
          <Search addSearch={addSearch} location={location} />
        </Box>
        {data && (
          <Box>
            <WeatherToDay weatherCast={data} addToFavorites={addToFavorites} />
            <FutureWeather weatherCast={data} />
          </Box>
        )}
        <Box p={5} shadow="md" borderWidth="1px" pt="27">
          <Heading mb={4} textAlign="start">
            Mine steder
          </Heading>
          <MyFavorites weatherCast={data} cities={cities} />
        </Box>
      </Container>
    </VStack>
  );
};

export default Home;
