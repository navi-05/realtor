'use client'

import React, { useEffect, useState } from 'react'
import { Box, Flex, Spacer, Text, Avatar, Spinner } from '@chakra-ui/react'
import { FaBed, FaBath } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import millify from 'millify'

import { baseUrl, fetchApi } from '@utils/fetchApi'
import ImageScroller from '@components/ImageScroller'


const PropertyDetails = ({ params: { id } }) => {

	const [propertyDetails, setPropertyDetails] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		const propertyData = async() => {
			await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`)
				.then((data) => setPropertyDetails(data))
				.finally(setIsLoading(false))
		}
		propertyData()
	}, [id])

	if(isLoading) return ( 
		<Flex alignItems='center' justifyContent='center'>
			<Spinner size='xl' color='red.500' />
		</Flex>
	)

  return (
    <Box maxWidth='1000px' margin='auto' p='4'>
        {propertyDetails?.photos && <ImageScroller data={propertyDetails?.photos} />}
				<Box w='full' p='6'>
				<Flex paddingTop="2" alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
              <Box paddingRight="3" color="green.400">
                {propertyDetails?.isVerified && <GoVerified />}
              </Box>
              <Text fontWeight="bold" fontSize="lg">AED {millify(propertyDetails?.price)}{propertyDetails?.rentFrequency && `/${propertyDetails?.rentFrequency}`}</Text>
            </Flex>
            <Box>
              <Avatar size="sm" src={propertyDetails?.agency?.logo?.url} />
            </Box>
          </Flex>
          <Flex alignItems="center" p="1" justifyContent='space-between' w="250px" color="blue.400">
            {propertyDetails?.rooms} <FaBed /> | {propertyDetails?.baths} <FaBath /> | {millify(propertyDetails?.area)} sqft<BsGridFill />
          </Flex>
					<Box marginTop='2'>
						<Text fontSize="lg" marginBottom='2' fontWeight='bold'>
							{propertyDetails?.title}
						</Text>
						<Text lineHeight='2' color='gray.600'>
							{propertyDetails?.description}
						</Text>
					</Box>
					<Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>
						<Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
							<Text>TYPE</Text>
							<Text fontWeight='bold'>{propertyDetails?.type}</Text>
						</Flex>
						<Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
							<Text>PURPOSE</Text>
							<Text fontWeight='bold'>{propertyDetails?.purpose}</Text>
						</Flex>
						{propertyDetails?.furnishingStatus && (
							<Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
								<Text>FURNISHING STATUS</Text>
								<Text fontWeight='bold'>{propertyDetails?.furnishingStatus}</Text>
							</Flex>
						)}
					</Flex>
					<Box>
						{propertyDetails?.amenities?.length && <Text fontSize='2xl' fontWeight='black' marginTop='5'>Amenities</Text>}
						<Flex flexWrap='wrap'>
							{propertyDetails?.amenities?.map((item) => (
								item.amenities.map((amenity) => (
									<Text 
										key={amenity.text}
										fontWeight='bold'
										color='blue.400'
										fontSize='l'
										p='2'
										bg='gray.200'
										m='1'
										borderRadius='5'
									>
										{amenity.text}</Text>
								))
							))}
						</Flex>
					</Box>
				</Box>
    </Box>
  )
}

export default PropertyDetails
