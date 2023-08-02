import { Paper, styled } from '@mui/material'

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

export const CustomPaper = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  [theme.breakpoints.up('sm')]: {
    padding: '64px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
}))
