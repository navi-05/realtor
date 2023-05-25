import React, { useState, useEffect, useCallback } from 'react'
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { MdCancel } from 'react-icons/md'
import Image from 'next/image'

import { filterData } from '@utils/filterData'

const SearchFilters = ({ forRouting, setForRouting, searchTerm, setSearchTerm, showLocations, setShowLocations, locationData }) => {

  const [filters, setFilters] = useState(filterData)
  
  const searchProperties = (name, value) => {
    setForRouting({
      ...forRouting,
      [name]: value
    })
  }

  return (
    <Flex bg="gray.100" p="4" justifyContent='center' flexWrap='wrap'>
      {filters.map((filter) => (
        <Box key={filter.queryName}>
          <Select 
            onChange={(e) => searchProperties(filter.queryName, e.target.value)}
            placeholder={filter.placeholder}
            w='fit-content'
            p='2'
          >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>{item.name}</option>
            ))}
          </Select>
        </Box>
      ))}
      <Flex flexDir='column'>
        <Button onClick={() => setShowLocations(!showLocations)} border='1px' borderColor='gray.200' marginTop='2'>
          Search Location
        </Button>
        {showLocations && (
          <Flex flexDir='column' pos='relative' paddingTop='2'>
            <Input
              placeholder='Type Here'
              value={searchTerm}
              w='300px'
              focusBorderColor='gray.300'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm !== '' && (
              <Icon
                as={MdCancel}
                pos='absolute'
                cursor='pointer'
                right='5'
                top='5'
                zIndex='100'
                onClick={() => setSearchTerm('')}
              />
            )}
            {showLocations && (
              <Box height='300px' overflow='auto'>
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties('locationExternalIDs', location.externalID)
                      setShowLocations(false)
                      setSearchTerm(location.name)
                    }}
                  >
                    <Text cursor='pointer' bg='gray.200' p='2' borderBottom='1px' borderColor='gray.100'>
                      {location.name}
                    </Text>
                  </Box>
                ))}
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default SearchFilters