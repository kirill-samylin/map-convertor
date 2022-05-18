import {Box, IconButton, Input, Tooltip, Text, useToast, Spinner} from '@chakra-ui/react'
import {AddIcon, DownloadIcon} from '@chakra-ui/icons'
import {useCallback, useRef} from 'react'
import {useConvertorMapContext} from '../../lib/ConvertorMapProvider'

export const Header = () => {
  const {fileName, loading, onLoadFile, onDownloadFile} = useConvertorMapContext()
  const toast = useToast()

  const fileInput = useRef(null)
  const onCurrentFile = useCallback(() => fileInput.current.click(), [])
  const onLoadingFile = useCallback(() => {
    const file = fileInput.current.files[0];
    if (file) {
      onLoadFile(file)
        .then(() => {
          toast({
            title: 'Файл загружен',
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
        })
        .catch((error) => {
          toast({
            title: 'Ошибка загрузки',
            description: JSON.stringify(error, null, 2),
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        })
    } else {
      toast({
        title: 'Файл не найден',
        description: "Пожалуйста загрузите файл формата xls, .xlsx",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [toast, onLoadFile])

  return (
    <Box padding={2} mb={2} px={4} display={'flex'} justifyContent={'space-between'} borderTop={'1px lightgreen dashed'} borderBottom={'1px lightgreen dashed'} flexDirection={{
      base: 'column',
      lg: 'row'
    }}>
      <Box>
        <Input type="file" ref={fileInput} display="none" onChange={onLoadingFile} accept=".xls, .xlsx" />
        <Tooltip label='Загрузить файл с координатами (.xml)'>
          <IconButton icon={<AddIcon />} onClick={onCurrentFile} />
        </Tooltip>
        <Tooltip label={`Скачать ${fileName.split('.')[0]}.geojson`}>
          <IconButton icon={<DownloadIcon />} onClick={onDownloadFile} ml={2} disabled={!fileName || loading}/>
        </Tooltip>
      </Box>
      <Box display="flex" alignItems='center'>
        {loading ? (
          <>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='md'
              marginRight={2}
            />
            <Text color='blue.500' as="i">Загрузка...</Text>
          </>
        ) : (
          <Text
            color={fileName ? 'green.600' : 'red.200'}
            as={fileName ? 'samp' : 'i'}
          >
            {fileName || 'Добавьте файл с координатами'}
          </Text>
        )}
      </Box>
    </Box>
  )
}
