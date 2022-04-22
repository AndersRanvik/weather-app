import React from 'react';
import {
  Stack,
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Image,
} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useMediaQuery } from '@chakra-ui/react';

const BoxInfoWeather = ({
  weatherCast,
  addToFavorites,
  favoriteCookie,
  removeFromFavorites,
}) => {
  const city = weatherCast.location?.name;
  const region = weatherCast.location?.region;
  const weatherData = weatherCast?.current;
  const temp = weatherData?.temp_c;
  const temp_feelslike = weatherData?.feelslike_c;
  const wind = weatherData?.wind_mph * 0.44704;
  const windTwoDecimals = parseFloat(wind).toFixed(0);
  const rain = weatherData?.precip_mm;
  const isFavorite = favoriteCookie?.includes(city);

  return (
    <Box p={5} shadow="md" borderWidth="1px" minH="40">
      <Heading fontSize={{ base: 'medium', md: 'xl' }}>
        Været nå i {city} ({region})
        <IconButton
          aria-label="Star"
          icon={<StarIcon color={isFavorite ? 'orange' : ''} />}
          onClick={() =>
            isFavorite ? removeFromFavorites(city) : addToFavorites(city)
          }
          ml="5"
        />
      </Heading>
      <Stack
        spacing={6}
        direction={{ base: 'row', md: 'row' }}
        justifyContent="flex-start"
        pt="1"
      >
        <Box height="80px" width={{ base: '40px', md: '110px' }}>
          <Image
            boxSize="70px"
            objectFit="contain"
            src={weatherData.condition.icon}
            alt="weather"
          />
        </Box>
        <Box height="80px" width={{ base: '50px', md: '110px' }}>
          <Text fontSize="3xl">{temp}°</Text>
        </Box>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justifyContent="flex-start"
          textAlign="start"
        >
          <Box height={{ base: '20px' }} width={{ base: '140px', md: '110px' }}>
            <Text fontSize={{ md: '1xl' }} pt={{ md: '15px' }}>
              Føles som {temp_feelslike}°
            </Text>
          </Box>
          <Box height={{ base: '20px' }} width={{ base: '50px', md: '75px' }}>
            <Text fontSize={{ md: '3xl' }}>{rain} mm</Text>
          </Box>
          <Box
            height={{ base: '20px', md: '70px' }}
            width={{ base: '50px', md: '120px' }}
          >
            <Text fontSize={{ md: '3xl' }}>{windTwoDecimals} m/s</Text>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

const BoxInfoRain = ({ title, desc }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" minH="40">
      <Heading fontSize="xl">{title}</Heading>
      <Stack spacing={8} direction="row" justifyContent="flex-start" pt="5">
        <Text mt={4}>{desc}</Text>
      </Stack>
    </Box>
  );
};

const WeatherToDay = ({
  weatherCast,
  addToFavorites,
  favoriteCookie,
  removeFromFavorites,
}) => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  return (
    <Box p={5}>
      <Grid
        templateColumns={isLargerThan768 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'}
        gap={6}
      >
        <GridItem w="100%">
          <BoxInfoWeather
            title="Været nå"
            weatherCast={weatherCast}
            addToFavorites={addToFavorites}
            favoriteCookie={favoriteCookie}
            removeFromFavorites={removeFromFavorites}
          />
        </GridItem>
        <GridItem w="100%">
          <BoxInfoRain
            title="Nedbørsvarsel"
            desc="Det blir opphold neste 90 minutter"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default WeatherToDay;
