import React from 'react';
import {Header} from '../Header'
import {Table} from '../Table'
import {Link, ListItem, OrderedList, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react'
import {useConvertorMapContext} from '../../lib/ConvertorMapProvider'

export const App = () => {
  const {table} = useConvertorMapContext()
  const isDisabled = !Boolean(table?.headers)
  return (
    <>
      <Header />
      <Tabs>
        <TabList>
          <Tab>Инструкция</Tab>
          <Tab isDisabled={isDisabled}>Таблица</Tab>
          <Tab isDisabled={isDisabled}>Карта</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <OrderedList>
              <ListItem>
                Загрузить файл .xls с таблицей с координатами.
                <Link color="blue.600" target="_blank" href="https://disk.yandex.ru/i/BLVwKwi1QjXvjw">
                  Пример
                </Link>
              </ListItem>
              <ListItem>Выберите входной и выходной формат</ListItem>
              <ListItem>Нажать на кнопку скачать (файл с расширением .geojson)</ListItem>
              <ListItem>
                Зайти на сайт
                <Link color="blue.600" target="_blank" href="ttps://yandex.ru/map-constructor">
                  https://yandex.ru/map-constructor
                </Link>
              </ListItem>
              <ListItem>Слева нажать «Импорт» и импортировать файл .geojson</ListItem>
            </OrderedList>
          </TabPanel>
          <TabPanel>
            <Table />
          </TabPanel>
          <TabPanel>
            <p>В разработке</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
