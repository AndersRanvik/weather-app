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
import { useMediaQuery } from '@chakra-ui/react';

const BoxInfoWeather = ({ data, title }) => {
  console.log(data, 'data');
  const city = data?.weatherCast.location?.name;
  const region = data?.weatherCast.location?.region;
  const weatherData = data.weatherCast?.current;
  const temp = weatherData?.temp_c;
  const temp_feelslike = weatherData?.feelslike_c;
  const wind = weatherData?.wind_mph * 0.44704;
  const windTwoDecimals = parseFloat(wind).toFixed(0);
  const rain = weatherData?.precip_mm;

  return (
    <Box p={5} shadow="md" borderWidth="1px" minH="40">
      <Heading fontSize="xl">
        Været nå i {city} ({region})
      </Heading>
      <Stack spacing={6} direction="row" justifyContent="flex-start" pt="5">
        <Box height="80px" width="110px">
          <Image
            boxSize="75px"
            objectFit="cover"
            src={weatherData.condition.icon}
            alt="weather"
          />
        </Box>
        <Box height="70px" width="110px">
          <Text fontSize="3xl">{temp}°</Text>
          <Text fontSize="1xl">Føles som {temp_feelslike}°</Text>
        </Box>
        <Box height="70px" width="75px">
          <Text fontSize="3xl">{rain} mm</Text>
        </Box>
        <Box height="70px" width="120px">
          <Text fontSize="3xl">{windTwoDecimals} m/s</Text>
        </Box>
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

const WeatherToDay = data => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  return (
    <Box p={5}>
      <Grid
        templateColumns={isLargerThan768 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'}
        gap={6}
      >
        <GridItem w="100%">
          <BoxInfoWeather title="Været nå" data={data} />
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
