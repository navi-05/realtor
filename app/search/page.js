'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Flex, Box, Text, Icon, Spinner } from '@chakra-ui/react'
import { BsFilter } from 'react-icons/bs'
import { useRouter, useSearchParams } from 'next/navigation'

import SearchFilters from '@components/SearchFilters'
import Property from '@components/Property'
import noresult from '@assets/noresult.svg'
import { baseUrl, fetchApi } from '@utils/fetchApi'

const Search = () => {
  
  const [searchFilters, setSearchFilters] = useState(false)
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  const [locationData, setLocationData] = useState([])
  const [showLocations, setShowLocations] = useState(false)

  const router = useRouter()

  const [forRouting, setForRouting] = useState({
    purpose: 'for-rent',
    rentFrequency: 'yearly',
    minPrice: '0',
    maxPrice: '1000000',
    areaMax: '35000',
    roomsMin: '0',
    bathsMin: '0',
    sort: 'price-desc',
    locationExternalIDs: '5002',
    categoryExternalID: '4'
  })

  useEffect(() => {
    setIsLoading(true)
    const searchData = async() => {
      await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${forRouting.locationExternalIDs}&purpose=${forRouting.purpose}&categoryExternalID=${forRouting.categoryExternalID}&bathsMin=${forRouting.bathsMin}&rentFrequency=${forRouting.rentFrequency}&priceMin=${forRouting.minPrice}&priceMax=${forRouting.maxPrice}&roomsMin=${forRouting.roomsMin}&sort=${forRouting.sort}&areaMax=${forRouting.areaMax}`)
        .then((data) => setProperties(data?.hits))
        .finally(setIsLoading(false))
    }
    searchData()
    router.push(
      `/search?purpose=${forRouting.purpose}&rentFrequency=${forRouting.rentFrequency}&minPrice=${forRouting.minPrice}&maxPrice=${forRouting.maxPrice}&areaMax=${forRouting.areaMax}&roomsMin=${forRouting.roomsMin}&bathsMin=${forRouting.bathsMin}&sort=${forRouting.sort}&locationExternalIDs=${forRouting.locationExternalIDs}&categoryExternalID=${forRouting.categoryExternalID}`
    )
  }, [forRouting])

  useEffect(() => {
    if (searchTerm !== '') {
      const fetchData = async () => {
        await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`)
          .then((data) => setLocationData(data?.hits))
      };
      fetchData();
    }
  }, [searchTerm]);

  if(isLoading) return <Spinner />

  return (
    <Box>
      <Flex
        cursor='pointer'
        bg='gray.100'
        borderBottom='1px'
        borderColor='gray.200'
        p='2'
        fontWeight='black'
        fontSize='lg'
        justifyContent='center'
        alignItems='center'
        onClick={() => setSearchFilters((prev) => !prev)}
      >
        <Text>Search Property By Filters</Text>
        <Icon w='7' as={BsFilter} />
      </Flex>
      {searchFilters &&  <SearchFilters
        forRouting={forRouting}
        setForRouting={setForRouting}

        locationData={locationData}
        showLocations={showLocations}
        setShowLocations={setShowLocations}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />}
      <Text fontSize='2xl' p='4' fontWeight='bold'>
        Properties {forRouting.purpose}
      </Text>
      <Flex flexWrap='wrap'>
        {properties?.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {!isLoading && properties?.length === 0 && (
        <Flex justifyContent='center' alignItems='center' flexDirection='column' marginTop='5' marginBottom='5'>
          <Image alt='No results' src={noresult} />
          <Text fontSize='2xl' marginTop='3'>No Results Found</Text>
        </Flex>
      )}
    </Box>
  )
}

export default Search
