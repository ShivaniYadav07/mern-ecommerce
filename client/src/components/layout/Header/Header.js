import React, { useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  DrawerHeader,
  VStack,
  HStack,
  
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {Search2Icon} from "@chakra-ui/icons"
import { BiMenuAltLeft } from 'react-icons/bi';
const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
    
      <Button
        pos={'fixed'}
        top={'4'}
        left={'4'}
        colorScheme="purple"
        p={'0'}
        w={'10'}
        h={'10'}
        borderRadius={'full'}
        zIndex={"overlay"}
        onClick={onOpen}
      >
        <BiMenuAltLeft size={'20'} />
      </Button>

      <Button
        pos={'fixed'}
        top={'4'}
        right={'14'}
        colorScheme="purple"
        p={'0'}
        w={'10'}
        h={'10'}
        borderRadius={'full'}
        zIndex={'overlay'}
        onClick={toggleSearch}
      >
        <Link to={'/search'}><Search2Icon size={'20'} /></Link>
        
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>ECOMMERCE</DrawerHeader>
          <DrawerBody>
            <VStack alignItems={'flex-start'}>
              <Button onClick={onClose} variant={'ghost'} colorScheme="purple">
                <Link to={'/'}>Home</Link>
              </Button>

              <Button onClick={onClose} variant={'ghost'} colorScheme="purple">
                <Link to={'/products'}>Products</Link>
              </Button>

              <Button onClick={onClose} variant={'ghost'} colorScheme="purple">
                <Link to={'/'}>Contact</Link>
              </Button>

              <Button onClick={onClose} variant={'ghost'} colorScheme="purple">
                <Link to={'/'}>About</Link>
              </Button>
            </VStack>

            <HStack
              pos={'absolute'}
              bottom={'10'}
              left={'0'}
              w={'full'}
              justifyContent={'space-evenly'}
            >
              <Button onClick={onClose} colorScheme={'purple'}>
                <Link to={'/login'}> Log In </Link>
              </Button>
              <Button onClick={onClose}  colorScheme={'purple'} variant={'outline'}>
                <Link to={'/signup'}> Sign Up </Link>
              </Button>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;