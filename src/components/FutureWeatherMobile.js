import {
  Tr,
  Th,
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
import HourForHour from '../components/HourForHour';
import { Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { Stat, StatLabel, StatHelpText } from '@chakra-ui/react';

const FutureWeatherMobile = ({
  item,
  id,
  isOpen,
  onClose,
  onOpen,
  maxwindTwoDecimals,
  city,
  weatherCast,
}) => {
  return (
    <Tr key={id}>
      <Td>
        <Stat>
          <StatLabel>{id === 0 ? 'I dag' : item.date}</StatLabel>
          <StatHelpText pt={2}>
            {item?.day?.maxtemp_c}° / {item?.day?.mintemp_c}°
          </StatHelpText>
          <StatHelpText>{maxwindTwoDecimals} mm</StatHelpText>
        </Stat>
      </Td>

      <Td>
        <Image
          boxSize="50px"
          objectFit="cover"
          src={item?.hour[6]?.condition?.icon}
          alt="weather"
        />
      </Td>
      <Td>
        <Image
          boxSize="50px"
          objectFit="cover"
          src={item?.hour[14]?.condition?.icon}
          alt="weather"
        />
      </Td>

      <Td>
        <Image
          boxSize="50px"
          objectFit="cover"
          src={item?.hour[20]?.condition?.icon}
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
