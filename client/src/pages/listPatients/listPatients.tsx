import { useEffect, useState } from 'react'
import { api } from '../../services/axios'
import {
  Button,
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Select,
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

type PatientFields = {
  id: string
  name: string
  email: string
  birthDate: string
}

const ListPatients = () => {
  const [page, setPage] = useState(1)
  const [pageLength, setPageLength] = useState<number>(10)
  const [searchInput, setSearchInput] = useState<string>('')
  const [patients, setPatients] = useState<PatientFields[]>([])
  const [patientsCount, setPatientsCount] = useState<number>(0)

  const getPatients = async () => {
    const result = await api.get(
      `patients?page=${page - 1}&length=${pageLength}&input=${searchInput}`
    )
    setPatientsCount(result.data.count)
    setPatients(result.data.data)
  }

  const formatDate = (dateString: string) => {
    const date = dateString.split('T')[0]
    const [year, month, day] = date.split('-')
    const formattedDate = `${day}/${month}/${year}`
    return formattedDate
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
      <Button variant="contained" startIcon={<Add />} sx={{ width: 196 }}>
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
                  <Button>Excluir</Button>
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
    </>
  )
}

export default ListPatients
