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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import { Button } from '@chakra-ui/react';
import HourForHour from '../components/HourForHour';

const FutureWeather = weatherCast => {
  const city = weatherCast?.weatherCast?.location?.name;
  const data = weatherCast?.weatherCast?.forecast?.forecastday;
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                <Td>{id === 0 ? 'I dag' : item.date}</Td>
                <Td minWidth="100px">
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
                  {item?.day?.maxtemp_c}° / {item?.day?.mintemp_c}°
                </Td>
                <Td>{item?.day?.daily_will_it_rain} mm</Td>
                <Td>{maxwindTwoDecimals} m/s</Td>
                <Td>
                  <Button onClick={onOpen} variant="link">
                    Se time for time
                  </Button>
                  <Modal
                    blockScrollOnMount={false}
                    isOpen={isOpen}
                    onClose={onClose}
                    size="5xl"
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Time for time - {city}</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <HourForHour city={city} weatherCast={weatherCast} />
                      </ModalBody>

                      <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                          Lukk
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default FutureWeather;
