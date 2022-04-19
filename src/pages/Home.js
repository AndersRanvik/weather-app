import React, { useState } from 'react';
import { Container, VStack } from '@chakra-ui/react';
import useWeather from '../hooks/useWeather';
import Search from '../components/Search';
import WeatherToDay from '../components/WeatherToDay';
import FutureWeather from '../components/FutureWeather';

const Home = () => {
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

export default Home;

// Need this hook to get lat and Lon with old api, not necessary with https://www.weatherapi.com/ :)
//const { data: position } = useLatLon(location);
//import useLatLon from '../hooks/useLatLon';
// const queryClient = new QueryClient()
