import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './global/theme'
import Header from './components/header/header'
import ListPatients from './pages/listPatients/listPatients'
import { BaseDiv } from './pages/styles'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Header />
          <BaseDiv>
            <Routes>
              <Route path="/patients" element={<ListPatients />} />
            </Routes>
          </BaseDiv>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>
)
