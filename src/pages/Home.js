import React, { useState, useEffect } from 'react';
import {
  Container,
  VStack,
  Image,
  Box,
  Stack,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

import useWeather from '../hooks/useWeather';
import MyFavorites from '../components/MyFavorites';
import Search from '../components/Search';
import WeatherToDay from '../components/WeatherToDay';
import FutureWeather from '../components/FutureWeather';
import WeatherBox from '../components/WeatherBox';

const Home = () => {
  const [search, setSearch] = useState();
  const [favoriteCookie, setFavoriteCookie] = useState([]);
  const { data } = useWeather(search);

  const addToFavorites = city => {
    if (localStorage.getItem('items') == null) {
      localStorage.setItem('items', '[]');
    }

    // gets the array from localStorage
    var array = JSON.parse(localStorage.getItem('items'));

    //push new city to array
    array?.push(city);

    localStorage.setItem('items', JSON.stringify(array));
    var getDataFromCookies = JSON.parse(localStorage.getItem('items'));
    setFavoriteCookie(getDataFromCookies);
  };

  useEffect(() => {
    var getDataFromCookies = JSON.parse(localStorage.getItem('items'));
    setFavoriteCookie(getDataFromCookies);
  }, []);

  //remove favorites to array
  const removeFromFavorites = city => {
    setFavoriteCookie(favoriteCookie.filter(value => value !== city));
    localStorage.removeItem('items', JSON.stringify(city));
  };

  //add search value to state
  const addSearch = value => {
    setSearch(value);
  };

  return (
    <VStack>
      <Container maxW="7xl">
        <Box pb="10">
          <Search addSearch={addSearch} location={search} />
        </Box>
        {data && (
          <Box>
            <Tabs>
              <TabList>
                <Tab>Oversikt</Tab>
                <Tab>I nærheten</Tab>
                <Tab>Kart</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <WeatherToDay
                    weatherCast={data}
                    addToFavorites={addToFavorites}
                    favoriteCookie={favoriteCookie}
                    removeFromFavorites={removeFromFavorites}
                  />
                  <FutureWeather weatherCast={data} />
                  <WeatherBox location={search} />
                </TabPanel>
                <TabPanel>
                  <Box p={5} pt="27">
                    <Stack
                      direction={{ base: 'column', md: 'row' }}
                      spacing={2}
                      justifyContent="space-around"
                    >
                      <WeatherBox location="Sandefjord" />
                      <WeatherBox location="Oslo" />
                      <WeatherBox location="Fredrikstad" />
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box height="max-content" justifyContent="space-around">
                    <Image
                      src="https://api.met.no/weatherapi/radar/2.0/.gif?area=central_norway&content=animation&type=5level_reflectivity"
                      alt="map"
                    />
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        )}
        <Box p={5} pt="27">
          <Heading mb={4} textAlign="start">
            Mine favoritter
          </Heading>
          <MyFavorites
            weatherCast={data}
            cities={favoriteCookie}
            removeFromFavorites={removeFromFavorites}
          />
        </Box>
      </Container>
    </VStack>
  );
};

export default Home;
