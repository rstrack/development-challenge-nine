import { Dialog, styled } from '@mui/material'

export const CustomDialog = styled(Dialog)({
  '& .MuiDialog-container': {
    '& .MuiPaper-root': {
      padding: '16px',
    },
  },
})
