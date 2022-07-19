import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useState } from 'react'
import { TextareaAutosize } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import CreateRecords from './components/CreateRecords';



const App = () => {
  let navigate = useNavigate();

  const [tabValue, setTabValue] = useState('/create_record')

  const handleChange = (event, value)  =>{
    navigate(value)
    setTabValue(value)
  }


  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Создать запись" value="/create_record" />
              <Tab label="Записи" value="/records" />
            </TabList>
          </Box>
        </TabContext>
      
      </Box>
      
      <Routes>
        <Route path='/create_record' element={<CreateRecords/>}/>
        <Route path='/records' element={<div>records</div>}/>
        <Route path='/' element={<Navigate to='/create_record'/>}/>
      </Routes>

    </>
  )
}

export default App