import { TableCell, styled } from '@mui/material'

export const CustomTableCell = styled(TableCell)({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
})

export const PaginationDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})

export const SearchAndPageLengthDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '32px',
})
