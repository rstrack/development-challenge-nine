import { useEffect, useState } from 'react'
import { api } from '../../services/axios'
import {
  Button,
  Grid,
  InputAdornment,
  LinearProgress,
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
  CustomBox,
  CustomDivider,
  CustomTableCell,
  PaginationDiv,
} from './styles'
import { useLocation, useNavigate } from 'react-router-dom'
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog'
import ExpandableRow from '../../components/ExpandableRow/ExpandableRow'
import { CustomPaper } from '../styles'

type PatientFields = {
  id: string
  name: string
  email: string
  birthDate: string
  address: {
    zipCode: string
    publicPlace: string
    number: string
    city: string
    state: string
  }
}

const ListPatients = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState('')
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
    try {
      setIsLoading(true)
      const result = await api.get(
        `patients?page=${page - 1}&length=${pageLength}&input=${searchInput}`
      )
      setPatientsCount(result.data.count)
      setPatients(result.data.data)
      setIsLoading(false)
    } catch (e: any) {
      setErrorMsg(e.response?.data.message || 'Erro de conexão com o Servidor')
      setIsSnackBarOpen(true)
      setIsLoading(false)
    }
  }

  const handlePageLength = (value: number) => {
    setPageLength(value)
    if (patientsCount < (page - 1) * value) {
      setPage(1)
    }
  }

  const handleSearch = (value: string) => {
    setSearchInput(value)
    if (patientsCount < (page - 1) * pageLength) {
      setPage(1)
    }
  }

  const handleDeleteClick = (patientId: string) => {
    setPatientIdToDelete(patientId)
    setIsDialogOpen(true)
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await api.delete(`patient/${patientIdToDelete}`)
      setIsSnackBarOpen(true)
      getPatients()
      if (patientsCount - 1 < (page - 1) * pageLength) {
        setPage(page - 1)
      }
      setIsLoading(false)
    } catch (e: any) {
      setErrorMsg(e.response.data.message || 'Erro de conexão com o servidor')
      setIsSnackBarOpen(true)
      setIsLoading(false)
    }
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
    <CustomPaper>
      <Typography variant="h4">Pacientes</Typography>
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ width: 196, marginBottom: '16px' }}
        onClick={() => navigate('create')}
      >
        Novo Paciente
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <TextField
            label="Buscar"
            size="small"
            variant="outlined"
            fullWidth
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
        </Grid>
        <Grid item xs={12} md={3}>
          <Select
            onChange={(e) => handlePageLength(e.target.value as number)}
            size="small"
            fullWidth
            name="paginationSize"
            defaultValue={10}
          >
            <MenuItem value={5}>5 itens por página</MenuItem>
            <MenuItem value={10}>10 itens por página</MenuItem>
            <MenuItem value={20}>20 itens por página</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell />
              <CustomTableCell>Nome</CustomTableCell>
              <CustomTableCell>Email</CustomTableCell>
              <CustomTableCell>Data de Nascimento</CustomTableCell>
              <CustomTableCell>Opções</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <ExpandableRow
                key={index}
                items={[
                  patient.name,
                  patient.email,
                  formatDate(patient.birthDate),
                  <>
                    <Button onClick={() => navigate(`edit/${patient.id}`)}>
                      Editar
                    </Button>
                    <Button onClick={() => handleDeleteClick(patient.id)}>
                      Excluir
                    </Button>
                  </>,
                ]}
              >
                <CustomBox>
                  <Typography variant="subtitle2">Endereço</Typography>
                  <CustomDivider />
                  <Grid container spacing="8px">
                    <Grid item xs={12} md={6}>
                      <b>CEP</b>: {patient.address.zipCode}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <b>Cidade</b>: {patient.address.city}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <b>Logradouro</b>:{' '}
                      {`${patient.address.publicPlace} 
                      nº ${patient.address.number}`}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <b>Estado</b>: {patient.address.state}
                    </Grid>
                  </Grid>
                </CustomBox>
              </ExpandableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading && <LinearProgress />}
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
            errorMsg != ''
              ? errorMsg.split(':')[1] || errorMsg
              : patientIdToDelete
              ? 'Paciente excluído com sucesso!'
              : location.state?.update
              ? 'Paciente editado com sucesso!'
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
    </CustomPaper>
  )
}

export default ListPatients
