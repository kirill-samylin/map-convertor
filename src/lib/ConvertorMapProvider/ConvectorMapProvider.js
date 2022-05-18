import {downloadFile, loadFile, getGeoJson} from './utils'
import {useCallback, useState} from 'react'
import {ConvertorMapContext} from './ConvectorMapContext'

export const ConvertorMapProvider = ({children}) => {
  const [table, setTable] = useState(null)
  const [fileName, setFileName] = useState('')
  const [loading, setLoading] = useState(false)

  const onLoadFile = useCallback(async (file) => {
    setLoading(true)
    setFileName(file.name);
    const table = await loadFile(file)
    setTable(table)
    setLoading(false)
    return table
  }, [])

  const onDownloadFile = useCallback( async () => {
    if (table && table.body) {
      const data = getGeoJson(table.body)
      downloadFile(fileName.split('.')[0], data)
    }
  }, [table, fileName])

  return (
    <ConvertorMapContext.Provider value={{
      onLoadFile,
      onDownloadFile,
      table,
      loading,
      fileName,
    }}>
      {children}
    </ConvertorMapContext.Provider>
  )
}
