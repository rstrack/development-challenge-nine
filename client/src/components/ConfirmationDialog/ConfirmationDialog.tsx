import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { CustomDialog } from './styles'

interface ConfirmationDialogProps {
  title: string
  children: JSX.Element
  open: boolean
  setOpen: (value: boolean) => void
  onConfirm: () => void
}

const ConfirmationDialog = ({
  title,
  children,
  open,
  setOpen,
  onConfirm,
}: ConfirmationDialogProps) => {
  return (
    <CustomDialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)} color="info">
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false)
            onConfirm()
          }}
          color="error"
        >
          Confirmar
        </Button>
      </DialogActions>
    </CustomDialog>
  )
}

export default ConfirmationDialog
