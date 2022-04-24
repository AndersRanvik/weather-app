import {
  Tr,
  Td,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import HourForHour from './HourForHour';
import { Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { Stat, StatHelpText } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const FutureWeatherMobile = ({
  isOpen,
  onClose,
  onOpen,
  maxwindTwoDecimals,
  city,
  weatherCast,
  removeFromFavorites,
  favoriteData,
}) => {
  return (
    <Tr>
      <Td>
        <IconButton
          aria-label="Star"
          icon={<StarIcon color="orange" />}
          onClick={() => removeFromFavorites(city)}
        />
      </Td>
      <Td>
        <Stat>
          <StatHelpText pt={2}>
            {favoriteData?.day?.maxtemp_c}° / {favoriteData?.day?.mintemp_c}°
          </StatHelpText>
          <StatHelpText>{maxwindTwoDecimals} mm</StatHelpText>
        </Stat>
      </Td>
      <Td>{city}</Td>

      <Td>
        <Image
          boxSize="50px"
          objectFit="cover"
          src={favoriteData?.hour[6]?.condition?.icon}
          alt="weather"
        />
      </Td>

      <Td>
        <Image
          boxSize="50px"
          objectFit="cover"
          src={favoriteData?.hour[20]?.condition?.icon}
          alt="weather"
        />
      </Td>
      <Td>
        <Button onClick={onOpen} variant="link">
          <IconButton
            aria-label="Star"
            icon={<ArrowForwardIcon />}
            variant="unstyled"
          />
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
};

export default FutureWeatherMobile;
