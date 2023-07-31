import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './global/theme'
import Header from './components/Header/Header'
import ListPatients from './pages/ListPatients/ListPatients'
import { BaseDiv } from './pages/styles'
import CreatePatient from './pages/CreatePatient/CreatePatient'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Header />
          <BaseDiv>
            <Routes>
              <Route path="/patients" element={<ListPatients />} />
              <Route path="/patients/create" element={<CreatePatient />} />
            </Routes>
          </BaseDiv>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>
)
