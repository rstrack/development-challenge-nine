import { TextField } from '@mui/material'
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form'

type ControlledTextFieldProps = {
  name: string
  label: string
  defaultValue?: number | string
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
}

const ControlledTextField = ({
  name,
  label,
  defaultValue,
  rules,
  ...rest
}: ControlledTextFieldProps) => {
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
      render={({ field: { value, onChange } }) => (
        <TextField
          {...rest}
          fullWidth
          label={label}
          value={value || ''}
          onChange={(event) => onChange(event.target.value)}
          error={getErrorMsg().hasError}
          helperText={getErrorMsg().message}
        />
      )}
    />
  )
}

export default ControlledTextField
