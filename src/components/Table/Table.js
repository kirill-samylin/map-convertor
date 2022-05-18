import {
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Table,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Skeleton
} from '@chakra-ui/react'
import {useCallback, useRef, Suspense} from 'react'
import {useConvertorMapContext} from '../../lib/ConvertorMapProvider'

export const TableCoordinates = () => {
  const searchInput = useRef(null)
  const {table} = useConvertorMapContext()
  const handleSearch = useCallback(() => {
    window.location.href = `#number_area_${searchInput.current.value}`;
  }, [])

  const handleKeyPress = useCallback((event) => {
    if(event.key === 'Enter'){
      handleSearch()
    }
  }, [handleSearch])

  if (!table) {
    return null
  }

  const {headers, body} = table
  return (
    <Box w='100%' p={4}>
      <FormControl mb={3} maxWidth='300px'>
        <FormLabel htmlFor='area'>Поиск</FormLabel>
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type='text'
            placeholder='Введите номер участка'
            ref={searchInput}
            onKeyDown={handleKeyPress}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' mr={2} onClick={handleSearch}>
              Найти
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Suspense fallback={<Skeleton />}>
        <TableContainer overflowY="auto" maxHeight="600px">
          <Table size='sm'>
            <Thead>
              <Tr>
                {headers.map((header) => (
                  <Th key={header}>{header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody maxHeight={'500px'}>
              {body.map(([number, square, x, y], index) => (
                <Tr key={index} bg={number ? 'teal.50' : ''} id={number ? `number_area_${number}` : undefined}>
                  <Td>{number}</Td>
                  <Td>{square}</Td>
                  <Td>{x}</Td>
                  <Td>{y}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Suspense>
    </Box>
  )
}
