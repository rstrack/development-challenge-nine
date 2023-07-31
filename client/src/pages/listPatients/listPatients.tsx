import { useEffect, useState } from 'react'
import { api } from '../../services/axios'
import {
  Button,
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Snackbar,
  SnackbarContent,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { Add, Search } from '@mui/icons-material'
import {
  CustomTableCell,
  PaginationDiv,
  SearchAndPageLengthDiv,
} from './styles'
import { useLocation, useNavigate } from 'react-router-dom'
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog'

type PatientFields = {
  id: string
  name: string
  email: string
  birthDate: string
}

const ListPatients = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [page, setPage] = useState(1)
  const [pageLength, setPageLength] = useState<number>(10)
  const [searchInput, setSearchInput] = useState<string>('')
  const [patients, setPatients] = useState<PatientFields[]>([])
  const [patientsCount, setPatientsCount] = useState<number>(0)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(
    location.state?.showSuccessSnackbar || false
  )
  const [patientIdToDelete, setPatientIdToDelete] = useState<string | null>()

  const getPatients = async () => {
    const result = await api.get(
      `patients?page=${page - 1}&length=${pageLength}&input=${searchInput}`
    )
    setPatientsCount(result.data.count)
    setPatients(result.data.data)
  }

  const handlePageLength = (value: number) => {
    setPageLength(value)
    if (page * value > patientsCount) {
      setPage(1)
    }
  }

  const handleSearch = (value: string) => {
    setSearchInput(value)
    if (page * pageLength > patientsCount) {
      setPage(1)
    }
  }

  const handleDeleteClick = (patientId: string) => {
    setPatientIdToDelete(patientId)
    setIsDialogOpen(true)
  }

  const handleDelete = async () => {
    try {
      await api.delete(`patient/${patientIdToDelete}`)
      setPatients(
        patients.filter((patient) => patient.id !== patientIdToDelete)
      )
      setIsSnackBarOpen(true)
      setPatientsCount(patientsCount - 1)
      if (page * pageLength > patientsCount) {
        setPage(page - 1)
      }
    } catch (e) {}
  }

  const formatDate = (dateString: string) => {
    const date = dateString.split('T')[0]
    const [year, month, day] = date.split('-')
    const formattedDate = `${day}/${month}/${year}`
    return formattedDate
  }

  useEffect(() => {
    getPatients()
  }, [page, pageLength])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getPatients()
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [searchInput])

  return (
    <>
      <Typography variant="h4">Pacientes</Typography>
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ width: 196 }}
        onClick={() => navigate('create')}
      >
        Novo Paciente
      </Button>
      <SearchAndPageLengthDiv>
        <TextField
          label="Buscar"
          size="small"
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          value={searchInput}
          onChange={(e) => {
            handleSearch(e.target.value)
          }}
        />
        <Select
          onChange={(e) => handlePageLength(e.target.value as number)}
          size="small"
          sx={{ width: 256 }}
          name="paginationSize"
          defaultValue={10}
        >
          <MenuItem value={5}>5 itens por página</MenuItem>
          <MenuItem value={10}>10 itens por página</MenuItem>
          <MenuItem value={20}>20 itens por página</MenuItem>
        </Select>
      </SearchAndPageLengthDiv>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: 'fixed', flexGrow: '1' }}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Nome</CustomTableCell>
              <CustomTableCell>Email</CustomTableCell>
              <CustomTableCell>Data de Nascimento</CustomTableCell>
              <CustomTableCell width="256px">Opções</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow hover key={index}>
                <CustomTableCell>{patient.name}</CustomTableCell>
                <CustomTableCell>{patient.email}</CustomTableCell>
                <CustomTableCell>
                  {formatDate(patient.birthDate)}
                </CustomTableCell>
                <CustomTableCell>
                  <Button>Editar</Button>
                  <Button onClick={() => handleDeleteClick(patient.id)}>
                    Excluir
                  </Button>
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationDiv>
        <Pagination
          count={Math.ceil(patientsCount / pageLength)}
          page={page}
          onChange={(_, page) => setPage(page)}
        />
      </PaginationDiv>
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackBarOpen(false)}
      >
        <SnackbarContent
          message={
            patientIdToDelete
              ? 'Paciente excluído com sucesso!'
              : 'Paciente cadastrado com sucesso!'
          }
        />
      </Snackbar>
      <ConfirmationDialog
        title="Aviso"
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        onConfirm={handleDelete}
      >
        <Typography>Tem certeza que deseja excluir este paciente?</Typography>
      </ConfirmationDialog>
    </>
  )
}

export default ListPatients
