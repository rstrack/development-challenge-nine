import { useState, useEffect } from 'react'
import {
  Button,
  Divider,
  Grid,
  Snackbar,
  SnackbarContent,
  Typography,
} from '@mui/material'
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import ControlledTextField from '../../components/ControlledTextField/ControlledTextField'
import ControlledDatePicker from '../../components/ControlledDatePicker/ControlledDatePicker'
import { add, isBefore, isValid } from 'date-fns'
import { CustomForm, CustomPaper } from './styles'
import { maxLengths } from '../../global/maxLenghts'
import { api } from '../../services/axios'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { states } from '../../global/states'

type PatientFormInput = {
  birthDate: string
  email: string
  name: string
  address: {
    zipCode: string
    publicPlace: string
    number: string
    complement: string
    city: string
    country: string
  }
}

const CreatePatient = () => {
  const [open, setOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const formMethods = useForm<PatientFormInput>()

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<PatientFormInput> = async (data) => {
    try {
      const response = await api.post('/patient', data)
      console.log(response.data)
      navigate('/patients', { state: { showSuccessSnackbar: true } })
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
    if (/^[0-9]{8}/.test(zipCodeValue)) {
      axios
        .get(`https://viacep.com.br/ws/${zipCodeValue}/json/`)
        .then((response) => {
          console.log(response.data)
          formMethods.setValue('address.publicPlace', response.data.logradouro)
          formMethods.setValue('address.city', response.data.localidade)
          // @ts-ignore
          formMethods.setValue('address.state', states.get(response.data.uf)) // TS acusando erro devido ao nome 'state'
          formMethods.setValue('address.country', 'Brasil')
        })
    }
  }, [zipCodeValue])

  return (
    <CustomPaper>
      <Typography variant="h4">Novo Paciente</Typography>
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
          message={errorMsg.split(':', 2)[1]}
          sx={{ backgroundColor: 'error.main' }}
        />
      </Snackbar>
    </CustomPaper>
  )
}

export default CreatePatient
