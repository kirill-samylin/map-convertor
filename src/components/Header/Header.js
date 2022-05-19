import {Box, IconButton, Input, Tooltip, Text, useToast, Spinner, Select, Button} from '@chakra-ui/react'
import {AddIcon, DownloadIcon, DeleteIcon} from '@chakra-ui/icons'
import {useCallback, useRef, useState} from 'react'
import {useConvertorMapContext} from '../../lib/ConvertorMapProvider'

export const Header = () => {
  const {
    fileName,
    loading,
    onLoadFile,
    onDownloadFile,
    onClean,
    zones,
    destZones,
    onConversion,
    table
  } = useConvertorMapContext()
  const toast = useToast()
  const fileInput = useRef(null);
  const [destName, setDestName] = useState('WGS84')
  const [sourceName, setSourceName] = useState('MB:6335404')
  const onCurrentFile = useCallback(() => fileInput.current.click(), [])
  const selectSourceName = useCallback(({target}) => setSourceName(target.value), [])
  const selectDestName= useCallback(({target}) => setDestName(target.value), [])
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
  const handleConversion = useCallback(() =>
    onConversion(sourceName, destName), [onConversion, sourceName, destName])
  return (
    <Box
      padding={2}
      mb={2}
      px={4}
      display={'flex'}
      justifyContent={'space-between'}
      borderTop={'1px lightgreen dashed'}
      borderBottom={'1px lightgreen dashed'}
      flexDirection={{
        base: 'column',
        lg: 'row'
      }}>
      <Box display='flex' gap={2}>
        <Input type="file" ref={fileInput} display="none" onChange={onLoadingFile} accept=".xls, .xlsx" />
        <Tooltip label='Загрузить файл с координатами (.xml)'>
          <IconButton aria-label='Загрузить' icon={<AddIcon />} onClick={onCurrentFile} />
        </Tooltip>
        <Tooltip label={`Скачать ${fileName.split('.')[0]}.geojson`}>
          <IconButton aria-label='Скачать' icon={<DownloadIcon />} onClick={onDownloadFile} disabled={!fileName || loading}/>
        </Tooltip>
        <Tooltip label='Очистить'>
          <IconButton aria-label='Очистить' icon={<DeleteIcon />} onClick={onClean} disabled={!fileName || loading}/>
        </Tooltip>
        <Select placeholder='Входные координаты' maxWidth='240px' value={sourceName} onChange={selectSourceName}>
          {zones.map(({zone, title}) => (
            <option key={zone} value={zone}>{`${zone} - ${title}`}</option>
          ))}
        </Select>
        <Select placeholder='Выходные координаты' maxWidth='170px' value={destName} onChange={selectDestName}>
          {destZones.map((zone) => (
            <option key={zone} value={zone}>{zone}</option>
          ))}
        </Select>
        <Button isDisabled={!Boolean(table)} type='button' onClick={handleConversion}>Конвертировать</Button>
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
