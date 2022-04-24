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
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import useFavorites from '../hooks/useFavorites';
import HourForHour from '../components/HourForHour';
import { useMediaQuery } from '@chakra-ui/react';
import MyFavoritesMobile from '../components/MyFavoritesMobile';
import './styles.css';

const Product = ({ item, removeFromFavorites, weatherCast }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useFavorites(item);
  const favoriteData = data?.forecast?.forecastday?.[0];
  const city = data?.location?.name;
  const maxwind = favoriteData?.day?.maxwind_mph * 0.44704;
  var maxwindTwoDecimals = parseFloat(maxwind).toFixed(0);
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  return isLargerThan768 ? (
    <Tr>
      <Td>
        <IconButton
          aria-label="Star"
          icon={<StarIcon color="orange" />}
          onClick={() => removeFromFavorites(city)}
          ml="5"
        />
      </Td>
      <Td>{city}</Td>
      <Td minWidth="100px">
        <Image
          boxSize="60px"
          objectFit="cover"
          src={favoriteData?.hour[0]?.condition?.icon}
          alt="weather"
        />
      </Td>
      <Td>
        <Image
          boxSize="60px"
          objectFit="cover"
          src={favoriteData?.hour[6]?.condition?.icon}
          alt="weather"
        />
      </Td>
      <Td>
        <Image
          boxSize="60px"
          objectFit="cover"
          src={favoriteData?.hour[14]?.condition?.icon}
          alt="weather"
        />
      </Td>
      <Td>
        <Image
          boxSize="60px"
          objectFit="cover"
          src={favoriteData?.hour[20]?.condition?.icon}
          alt="weather"
        />
      </Td>
      <Td>
        {favoriteData?.day?.maxtemp_c}° / {item?.day?.mintemp_c}°
      </Td>
      <Td>{favoriteData?.day?.daily_will_it_rain} mm</Td>
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
  ) : (
    <MyFavoritesMobile
      favoriteData={favoriteData}
      item={item}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      maxwindTwoDecimals={maxwindTwoDecimals}
      city={city}
      weatherCast={weatherCast}
      removeFromFavorites={removeFromFavorites}
    />
  );
};

const MyFavorites = ({ cities, removeFromFavorites, weatherCast }) => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  if (cities == null)
    return (
      <Box w="100%" py={4} color="black">
        Her vil du se de siste stedene du har sett værvarsel for. Søk etter
        steder
      </Box>
    );
  return (
    <TableContainer>
      <Table size="sm" className="table-tiny">
        <TableCaption>Oppdatert 12:45</TableCaption>
        <Thead>
          {isLargerThan768 ? (
            <Tr>
              <Th></Th>
              <Th>Sted</Th>
              <Th>Natt</Th>
              <Th>Morgen</Th>
              <Th>Ettermiddag</Th>
              <Th>Kveld</Th>
              <Th>Maks/Min.temp</Th>
              <Th>Nedbør</Th>
              <Th>Vind</Th>
              <Th></Th>
            </Tr>
          ) : (
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>Sted</Th>
              <Th>Dag</Th>
              <Th>Kveld</Th>
            </Tr>
          )}
        </Thead>
        <Tbody>
          {cities?.map(item => {
            return (
              <Product
                item={item}
                removeFromFavorites={removeFromFavorites}
                weatherCast={weatherCast}
              />
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default MyFavorites;
