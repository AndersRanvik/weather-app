import React, { useState, useEffect } from 'react';
import { Container, VStack, Box, Heading } from '@chakra-ui/react';
import useWeather from '../hooks/useWeather';
import MyFavorites from '../components/MyFavorites';
import Search from '../components/Search';
import WeatherToDay from '../components/WeatherToDay';
import FutureWeather from '../components/FutureWeather';

const Home = () => {
  const [search, setSearch] = useState();
  const [favoriteCookie, setFavoriteCookie] = useState([]);
  const { data } = useWeather(search);
  console.log(data, 'data');

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
            <WeatherToDay
              weatherCast={data}
              addToFavorites={addToFavorites}
              favoriteCookie={favoriteCookie}
              removeFromFavorites={removeFromFavorites}
            />
            <FutureWeather weatherCast={data} />
          </Box>
        )}
        <Box p={5} shadow="md" borderWidth="1px" pt="27">
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
