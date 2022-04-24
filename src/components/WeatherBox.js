import { LineChart } from './LineChart';
import { Box } from '@chakra-ui/react';
import useWeather from '../hooks/useWeather';

const WeatherBox = ({ location, width, height }) => {
  const { data } = useWeather(location);
  const city = data?.location?.name;
  const region = data?.location?.region;
  
  const nowTemp = data?.current?.temp_c;

  return (
    <Box width={{ base: '', md: width }} borderWidth="1px" borderRadius="lg">
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {city}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml="2"
          display="flex"
          alignItems="baseline"
        >
          {region}
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="green.600" fontSize="5xl">
            {nowTemp}°
          </Box>
        </Box>
        <LineChart locationData={data} />
      </Box>
    </Box>
  );
};

export default WeatherBox;
