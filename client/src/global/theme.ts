import { createTheme } from '@mui/material'
import { colors } from './colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.PRIMARY,
    },
    secondary: {
      main: colors.SECONDARY,
    },
    background: {
      default: colors.BACKGROUND,
    },
  },
})
