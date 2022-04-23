import { Container } from '@chakra-ui/react';
import '../App.css';
import logo from '../assets/logotype-black.svg';
// import logo3 from '../assets/YR_blaa_rgb.png';
import { IconButton } from '@chakra-ui/react';
import { HamburgerIcon, WarningTwoIcon, CalendarIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem, Box } from '@chakra-ui/react';
//import logo2 from '../assets/Infront_logo.png';

function Nav() {
  return (
    <Container maxW="7xl">
      <Box display="flex" justifyContent="space-between" py="3">
        <Box>
          <h3>
            <img alt="logo" src={logo} />
          </h3>
        </Box>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<CalendarIcon />} command="⌘T">
              Vanntemperatur (Ikke ferdig)
            </MenuItem>
            <MenuItem icon={<WarningTwoIcon />} command="⌘N">
              Farevarsler (Ikke ferdig)
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Container>
  );
}

export default Nav;
