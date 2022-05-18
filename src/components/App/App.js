import React from 'react';
import {Header} from '../Header'
import {Table} from '../Table'
import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react'

export const App = () => {
  return (
    <>
      <Header />
      <Tabs>
        <TabList>
          <Tab>Таблица</Tab>
          <Tab>Карта</Tab>
        </TabList>
        <TabPanels>
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
