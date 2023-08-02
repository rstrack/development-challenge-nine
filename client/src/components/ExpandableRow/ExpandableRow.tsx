import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Collapse, IconButton, TableCell, TableRow } from '@mui/material'
import { useState } from 'react'
import { CustomTableCell } from './styles'

type ExpandableRowProps = {
  items: Array<JSX.Element | string>
  children: JSX.Element
}

const ExpandableRow = ({ items, children }: ExpandableRowProps) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <TableRow>
        <CustomTableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </CustomTableCell>
        {items.map((item, index) => (
          <CustomTableCell key={index}>{item}</CustomTableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {children}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default ExpandableRow
