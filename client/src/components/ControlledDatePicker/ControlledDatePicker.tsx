import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form'

type ControlledDatePickerProps = {
  name: string
  label: string
  defaultValue?: number | string
  required?: boolean
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  disablePast?: boolean
  disableFuture?: boolean
  minDate?: any
  maxDate?: any
}

const ControlledDatePicker = ({
  name,
  label,
  defaultValue,
  required,
  rules,
  disablePast,
  disableFuture,
  minDate,
  maxDate,
  ...rest
}: ControlledDatePickerProps) => {
  const { control, formState, getFieldState } = useFormContext()
  const getErrorMsg = () => {
    const { error } = getFieldState(name, formState)
    return {
      hasError: !!error,
      message: error?.message || '',
    }
  }
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={null}
      render={({ field: { value, onChange } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            {...rest}
            format="dd/MM/yyyy"
            label={label}
            value={value || null}
            onChange={onChange}
            slotProps={{
              textField: {
                error: getErrorMsg().hasError,
                helperText: getErrorMsg().message,
                fullWidth: true,
                required: required,
              },
            }}
            disablePast={disablePast}
            disableFuture={disableFuture}
            minDate={minDate}
            maxDate={maxDate}
          />
        </LocalizationProvider>
      )}
    />
  )
}

export default ControlledDatePicker
