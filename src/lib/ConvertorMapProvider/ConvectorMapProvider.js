import {downloadFile, loadFile, getGeoJson, zones, destZones, conversionCoordinates} from './utils'
import {useCallback, useMemo, useState} from 'react'
import {ConvertorMapContext} from './ConvectorMapContext'

export const ConvertorMapProvider = ({children}) => {
  const [table, setTable] = useState(null)
  const [fileName, setFileName] = useState('')
  const [loading, setLoading] = useState(false)

  const onLoadFile = useCallback(async (file) => {
    setLoading(true)
    setFileName(file.name);
    const data = await loadFile(file)
    setTable(data)
    setLoading(false)
    return data
  }, [])

  const onDownloadFile = useCallback( async () => {
    if (table && table.body) {
      const data = getGeoJson(table.body)
      downloadFile(fileName.split('.')[0], data)
    }
  }, [table, fileName])
  const zonesOptions = useMemo(() =>
    zones.map(([zone, title]) => ({
      zone,
      title: title.replaceAll(/[a-z\+=]/g, '').split('_')[0].trim()
    })
  ), [])

  const onConversion = useCallback((sourceName, destName) =>
    setTable({
      headers: table.headers,
      body: conversionCoordinates(table.body, sourceName, destName)
    }),
    [table]
  )

  const onClean = useCallback(() => {
    setFileName('')
    setTable(null)
  }, [])

  return (
    <ConvertorMapContext.Provider value={{
      onLoadFile,
      onDownloadFile,
      table,
      loading,
      fileName,
      zones: zonesOptions,
      destZones,
      onConversion,
      onClean,
    }}>
      {children}
    </ConvertorMapContext.Provider>
  )
}
