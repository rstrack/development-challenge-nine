import { ListItemButton, styled } from '@mui/material'

export const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  },
}))
