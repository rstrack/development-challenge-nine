import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './global/theme'
import Header from './components/Header/Header'
import ListPatients from './pages/ListPatients/ListPatients'
import { BaseDiv } from './pages/styles'
import SavePatient from './pages/SavePatient/SavePatient'
import Home from './pages/Home/Home'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Header />
          <BaseDiv>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/patients" element={<ListPatients />} />
              <Route path="/patients/create" element={<SavePatient />} />
              <Route path="/patients/edit/:id" element={<SavePatient />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </BaseDiv>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>
)
