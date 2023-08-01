import { styled } from '@mui/material'

export const BaseDiv = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    margin: '32px 32px',
  },
  [theme.breakpoints.up('lg')]: {
    margin: '32px 20%',
  },
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
}))
