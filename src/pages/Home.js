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
import { useMediaQuery } from '@chakra-ui/react';
import useMet from '../hooks/useMet';

const Home = () => {
  const [search, setSearch] = useState();
  const [favoriteCookie, setFavoriteCookie] = useState([]);
  const { data } = useWeather(search);
  const lat = data?.location?.lat;
  const lon = data?.location?.lon;
  const { data: dataMet } = useMet(lat, lon);
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const isError = data?.error?.code === 1006;

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
          <Search addSearch={addSearch} location={search} isError={isError} />
          {!search && (
            <Box py={5} px={0} pt="27">
              <Heading mb={4} textAlign="start">
                Mine favoritter
              </Heading>
              <MyFavorites
                weatherCast={data}
                cities={favoriteCookie}
                removeFromFavorites={removeFromFavorites}
              />
            </Box>
          )}
        </Box>
        {!isError && data && (
          <Box>
            <Tabs size="md">
              <TabList>
                <Tab>Oversikt</Tab>
                <Tab>Graf</Tab>
                <Tab> Mine favoritter</Tab>
                <Tab>I nærheten</Tab>
                {isLargerThan768 && <Tab>Kart</Tab>}
              </TabList>
              {!isLargerThan768 && (
                <TabList>
                  <Tab>Kart</Tab>
                </TabList>
              )}

              <TabPanels>
                <TabPanel>
                  <WeatherToDay
                    weatherCast={data}
                    addToFavorites={addToFavorites}
                    favoriteCookie={favoriteCookie}
                    removeFromFavorites={removeFromFavorites}
                    dataMet={dataMet}
                  />
                  <FutureWeather weatherCast={data} />
                </TabPanel>
                <TabPanel>
                  <WeatherBox
                    location={search}
                    width="1200px"
                    height={{ base: '360px', md: '800px' }}
                    dataMet={dataMet}
                  />
                </TabPanel>
                <TabPanel>
                  <Box py={5} pt="27">
                    <Heading mb={4} textAlign="start">
                      Mine favoritter
                    </Heading>
                    <MyFavorites
                      weatherCast={data}
                      cities={favoriteCookie}
                      removeFromFavorites={removeFromFavorites}
                    />
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box pt={5}>
                    <Stack
                      direction={{ base: 'column', md: 'row' }}
                      spacing={2}
                      justifyContent="space-around"
                    >
                      <WeatherBox
                        location="Sandefjord"
                        width={{ base: '', md: '360px' }}
                      />
                      <WeatherBox
                        location="Oslo"
                        width={{ base: '', md: '360px' }}
                      />
                      <WeatherBox
                        location="Fredrikstad"
                        width={{ base: '', md: '360px' }}
                      />
                    </Stack>
                  </Box>
                </TabPanel>

                <TabPanel>
                  <Box height="max-content" justifyContent="space-around">
                    <Image
                      src="https://api.met.no/weatherapi/radar/2.0/?type=reflectivity&area=southern_norway&content=animation"
                      alt="map"
                    />
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        )}
      </Container>
    </VStack>
  );
};

export default Home;
