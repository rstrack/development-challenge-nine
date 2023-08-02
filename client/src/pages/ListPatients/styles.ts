import {
  Box,
  Divider,
  TableCell,
  styled,
  tableCellClasses,
} from '@mui/material'

export const CustomBox = styled(Box)({
  margin: ' 16px 8px',
})

export const CustomDivider = styled(Divider)({
  marginBottom: '16px',
})

export const CustomTableCell = styled(TableCell)({
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
