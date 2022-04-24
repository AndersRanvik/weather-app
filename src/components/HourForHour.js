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
import moment from 'moment';

const HourForHour = ({ weatherCast }) => {
  const data =
    weatherCast?.weatherCast?.forecast?.forecastday[0]?.hour ||
    weatherCast?.forecast?.forecastday[0]?.hour;
  console.log(weatherCast, 'weatherCast12');
  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <TableCaption>
          Oppdatert {weatherCast?.weatherCast?.current?.last_updated}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Tid</Th>
            <Th>Vær</Th>
            <Th>Temp</Th>
            <Th>Vindkast (m/s)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item, id) => {
            const maxwind = item?.wind_mph * 0.44704;
            var maxwindTwoDecimals = parseFloat(maxwind).toFixed(0);
            return (
              <Tr key={id}>
                <Td>{moment(item?.time).format('HH')}</Td>
                <Td>
                  <Image
                    boxSize="35px"
                    objectFit="cover"
                    src={item?.condition?.icon}
                    alt="weather"
                  />
                </Td>
                <Td>{item?.temp_c}°</Td>
                <Td>
                  {maxwindTwoDecimals} {item?.wind_dir}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default HourForHour;
