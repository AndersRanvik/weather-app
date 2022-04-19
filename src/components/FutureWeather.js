import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
} from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';

const FutureWeather = weatherCast => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const data = weatherCast?.weatherCast?.forecast?.forecastday;

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Oppdatert 12:45</TableCaption>
        <Thead>
          <Tr>
            <Th>Dato</Th>
            <Th>Natt</Th>
            <Th>Morgen</Th>
            <Th>Ettermiddag</Th>
            <Th>Kveld</Th>
            <Th>Maks/Min.temp</Th>
            <Th>Nedbør</Th>
            <Th>Vind</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item, id) => {
            const maxwind = item?.day?.maxwind_mph * 0.44704;
            var maxwindTwoDecimals = parseFloat(maxwind).toFixed(0);
            return (
              <Tr key={id}>
                <Td>{item.date}</Td>
                <Td>
                  <Image
                    boxSize="60px"
                    objectFit="cover"
                    src={item?.hour[0]?.condition?.icon}
                    alt="weather"
                  />
                </Td>
                <Td>
                  <Image
                    boxSize="60px"
                    objectFit="cover"
                    src={item?.hour[6]?.condition?.icon}
                    alt="weather"
                  />
                </Td>
                <Td>
                  <Image
                    boxSize="60px"
                    objectFit="cover"
                    src={item?.hour[14]?.condition?.icon}
                    alt="weather"
                  />
                </Td>
                <Td>
                  <Image
                    boxSize="60px"
                    objectFit="cover"
                    src={item?.hour[20]?.condition?.icon}
                    alt="weather"
                  />
                </Td>
                <Td>
                  {item?.day?.maxtemp_c}° / {item?.day?.mintemp_c}
                </Td>
                <Td>{item?.day?.daily_will_it_rain} mm</Td>
                <Td>{maxwindTwoDecimals} m/s</Td>
                <Td>Se time for time </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default FutureWeather;
