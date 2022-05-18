import React from 'react'
import {zones} from './constants/zones'
import {destZones} from './utils'

export const ConvertorMapContext = React.createContext({
  zones,
  destZones,
})
