import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FieldValues, FormProvider, useForm, useWatch } from 'react-hook-form'
import { add, isBefore, isValid } from 'date-fns'
import axios from 'axios'
import {
  Button,
  Divider,
  Grid,
  Snackbar,
  SnackbarContent,
  Typography,
} from '@mui/material'
import { CustomForm, CustomPaper } from './styles'
import ControlledTextField from '../../components/ControlledTextField/ControlledTextField'
import ControlledDatePicker from '../../components/ControlledDatePicker/ControlledDatePicker'
import { maxLengths } from '../../global/maxLenghts'
import { states } from '../../global/states'
import { api } from '../../services/axios'

const CreatePatient = () => {
  const { id } = useParams()

  const [open, setOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [addressId, setAddressId] = useState(null)

  const formMethods = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data: FieldValues) => {
    try {
      console.log(data)
      if (id) {
        await api.put(`/patient/${id}`, {
          id,
          birthDate: data.birthDate,
          email: data.email,
          name: data.name,
          address: {
            id: addressId,
            patientId: id,
            ...data.address,
          },
        })
        navigate('/patients', {
          state: { showSuccessSnackbar: true, update: true },
        })
      } else {
        await api.post('/patient', data)
        navigate('/patients', {
          state: { showSuccessSnackbar: true, update: false },
        })
      }
    } catch (e: any) {
      console.log(e)
      setOpen(true)
      setErrorMsg(e.response.data.message)
    }
  }

  const zipCodeValue = useWatch({
    control: formMethods.control,
    name: 'address.zipCode',
  })

  useEffect(() => {
    if (id) {
      api.get(`patient/${id}`).then((response) => {
        const dt = new Date(response.data.birthDate)
        const utcDate = new Date(
          dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000
        )
        setAddressId(response.data.address.id)
        formMethods.setValue('name', response.data.name)
        formMethods.setValue('email', response.data.email)
        formMethods.setValue('birthDate', utcDate)
        formMethods.setValue('address.zipCode', response.data.address.zipCode)
        formMethods.setValue(
          'address.publicPlace',
          response.data.address.publicPlace
        )
        formMethods.setValue('address.number', response.data.address.number)
        formMethods.setValue(
          'address.complement',
          response.data.address.complement
        )
        formMethods.setValue('address.city', response.data.address.city)
        // @ts-ignore
        formMethods.setValue('address.state', response.data.address.state) // TS acusando erro devido ao nome 'state'
        formMethods.setValue('address.country', response.data.address.country)
      })
    }
  }, [])

  useEffect(() => {
    if (/^[0-9]{8}/.test(zipCodeValue)) {
      axios
        .get(`https://viacep.com.br/ws/${zipCodeValue}/json/`)
        .then((response) => {
          console.log(response.data)
          formMethods.setValue('address.publicPlace', response.data.logradouro)
          formMethods.setValue('address.city', response.data.localidade)
          // @ts-ignore
          formMethods.setValue('address.state', states.get(response.data.uf))
          formMethods.setValue('address.country', 'Brasil')
        })
    }
  }, [zipCodeValue])

  return (
    <CustomPaper>
      <Typography variant="h4">
        {id ? 'Editar Paciente' : 'Novo Paciente'}
      </Typography>
      <FormProvider {...formMethods}>
        <CustomForm onSubmit={formMethods.handleSubmit(onSubmit)}>
          <div>
            <Typography variant="body1">Dados Pessoais</Typography>
            <Divider />
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ControlledTextField
                name="name"
                label="Nome"
                required
                rules={{
                  required: {
                    value: true,
                    message: 'Campo obrigatório',
                  },
                  maxLength: {
                    value: maxLengths.NAME_MAX_LENGTH,
                    message: 'Tamanho máximo de nome excedido',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <ControlledTextField
                name="email"
                label="Email"
                required
                rules={{
                  required: {
                    value: true,
                    message: 'Campo obrigatório',
                  },
                  maxLength: {
                    value: maxLengths.EMAIL_MAX_LENGTH,
                    message: 'Tamanho máximo de email excedido',
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Email inválido',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <ControlledDatePicker
                name="birthDate"
                label="Data de Nascimento"
                required
                rules={{
                  required: {
                    value: true,
                    message: 'Campo obrigatório',
                  },
                  validate: (date: Date) => {
                    if (!isValid(date)) {
                      return 'Data inválida'
                    }
                    date.setHours(0, 0, 0, 0)
                    const tomorrow = add(new Date(), { days: 1 })
                    tomorrow.setHours(0, 0, 0, 0)
                    if (!isBefore(date, tomorrow)) {
                      return 'A data deve ser anterior ou igual a data atual'
                    }
                  },
                }}
                disableFuture
              />
            </Grid>
          </Grid>
          <div>
            <Typography variant="body1">Endereço</Typography>
            <Divider />
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={2}>
              <ControlledTextField
                name="address.zipCode"
                label="CEP"
                required
                rules={{
                  required: {
                    value: true,
                    message: 'Campo obrigatório',
                  },
                  pattern: {
                    value: /^[0-9]{8}/,
                    message: 'CEP inválido',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <ControlledTextField
                name="address.publicPlace"
                label="Logradouro"
                required
                rules={{
                  required: {
                    value: true,
                    message: 'Campo obrigatório',
                  },
                  maxLength: {
                    value: maxLengths.PUBLIC_PLACE_MAX_LENGTH,
                    message: 'Tamanho máximo de logradouro excedido',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} lg={2}>
              <ControlledTextField
                name="address.number"
                label="Número"
                required
                rules={{
                  required: {
                    value: true,
                    message: 'Campo obrigatório',
                  },
                  maxLength: {
                    value: maxLengths.NUMBER_MAX_LENGTH,
                    message: 'Tamanho máximo de número excedido',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <ControlledTextField
                name="address.complement"
                label="Complemento"
                rules={{
                  maxLength: {
                    value: maxLengths.COMPLEMENT_MAX_LENGTH,
                    message: 'Tamanho máximo de complemento excedido',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <ControlledTextField
                name="address.city"
                label="Cidade"
                required
                rules={{
                  required: {
                    value: true,
                    message: 'Campo obrigatório',
                  },
                  maxLength: {
                    value: maxLengths.CITY_MAX_LENGTH,
                    message: 'Tamanho máximo de cidade excedido',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <ControlledTextField
                name="address.state"
                label="Estado"
                required
                rules={{
                  required: {
                    value: true,
                    message: 'Campo obrigatório',
                  },
                  maxLength: {
                    value: maxLengths.STATE_MAX_LENGTH,
                    message: 'Tamanho máximo de estado excedido',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <ControlledTextField
                name="address.country"
                label="País"
                required
                rules={{
                  required: {
                    value: true,
                    message: 'Campo obrigatório',
                  },
                  maxLength: {
                    value: maxLengths.COUNTRY_MAX_LENGTH,
                    message: 'Tamanho máximo de país excedido',
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: 256,
              display: 'flex',
              alignSelf: 'center',
            }}
          >
            Enviar
          </Button>
        </CustomForm>
      </FormProvider>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <SnackbarContent
          message={errorMsg}
          sx={{ backgroundColor: 'error.main' }}
        />
      </Snackbar>
    </CustomPaper>
  )
}

export default CreatePatient
