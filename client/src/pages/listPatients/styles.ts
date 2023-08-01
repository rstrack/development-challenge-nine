import { TableCell, styled, tableCellClasses } from '@mui/material'

export const CustomTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    padding: '16px 32px',
  },
  [`&.${tableCellClasses.body}`]: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    padding: '12px 32px',
  },
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
