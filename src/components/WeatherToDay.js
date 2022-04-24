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

import {
  useMediaQuery,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';

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
    <Box p={2} shadow="md" borderWidth="1px" minH="40">
      <Heading fontSize={{ base: 'medium', md: 'xl' }}>
        Været nå i {city} ({region})
        <IconButton
          aria-label="Star"
          variant="unstyled"
          icon={<StarIcon color={isFavorite ? 'orange' : ''} />}
          onClick={() =>
            isFavorite ? removeFromFavorites(city) : addToFavorites(city)
          }
          ml="5"
        />
      </Heading>
      <StatGroup>
        <Stat>
          <Image
            boxSize="70px"
            objectFit="contain"
            src={weatherData.condition.icon}
            alt="weather"
          />
        </Stat>
        <Stat>
          <StatLabel>Nå</StatLabel>
          <StatNumber>{temp}°</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Føles som {temp_feelslike}°</StatLabel>
          <StatNumber>{rain} mm</StatNumber>
          <StatHelpText>{windTwoDecimals} m/s</StatHelpText>
        </Stat>
      </StatGroup>
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
    <Box pb={6}>
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
