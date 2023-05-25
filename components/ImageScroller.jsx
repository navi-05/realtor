import React, { useContext } from 'react'
import Image from 'next/image'
import { Box, Icon, Flex } from '@chakra-ui/react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext)
  return (
    <Flex justifyContent='center' alignItems='center' marginRight='1'>
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize='2xl'
        cursor='pointer'
      />
    </Flex>
  )
}
const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext)
  return (
    <Flex justifyContent='center' alignItems='center' marginRight='1'>
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize='2xl'
        cursor='pointer'
      />
    </Flex>
  )
}

const ImageScroller = ({ data }) => {
  return (
    <ScrollMenu leftArrow={LeftArrow} rightArrow={RightArrow} style={{ overflow: 'hidden' }}>
      {data.map((item) => (
        <Box width='910px' itemId={item.id} overflow='hidden' p='1'>
          <Image 
            placeholder='blur' 
            blurDataURL={item.url} 
            src={item.url} 
            width={1000} 
            height={500} 
            alt='property'
            key={item.id}
            sizes="(max-width:500px) 100px, (max-width:1024px) 400px, 1000px"
            />
        </Box>
      ))}
    </ScrollMenu>
  )
}

export default ImageScroller