import 'date-fns'
import React, { useRef } from 'react'
import { Controller } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'
import {
  IconButton, Box
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
const DatePickerForm = ({
  name, // Nombre del campo
  label = '', // label del campo
  className = '', // estilos para la caja de el input
  control, // control proveniente de react-hook-form
  validations = {}, // Objeto con las validaciones
  fullWidth = false, // Si ocupa o no toda la caja donde se encuentra
  required = false, // Marcar campo como requerido
  max = null, // fecha maxima
  min = null, // Fecha minima
  views = ['year', 'month', 'day'], // vista del datepicker
  inputProps = {}, // Propiedades del input je
  placeholder = 'dd/mm/yyyy',
  defaultValue = null,
  disabled = false,
  focusError = false,
  InputProps,
  disableFuture = false,
  disablePast = false,
  callBackDeleteIcon = () => {},
  onChange = () => {},
  activeDelete = false,
  setValue = () => {}
}) => {
  const inputRef = useRef()

  const scrollToinput = () => {
    if (focusError) {
      inputRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      })
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={validations}
      render={({ field, fieldState }) => (
        <Box sx={{
          position: 'relative'
        }}>
          <DatePicker
            name={name}
            label={label}
            value={field.value}
            disabled={disabled}
            defaultValue={defaultValue}
            required={required}
            disableFuture={disableFuture}
            disablePast={disablePast}
            slotProps={{
              textField: {
                readOnly: true,
                disabled,
                required,
                error: !!fieldState.error,
                helperText: fieldState?.error?.message
              }
            }}
            sx={{
              ...(fullWidth && { width: '100%' }),
              '.MuiInputBase-root': {
                background: '#FFF'
              },
              fontSize: '19px',
              '.MuiFormLabel-root': {
                display: 'flex !important'
              }
            }}
            fullWidth={fullWidth}
            maxDate={max}
            minDate={min}
            views={views}
            InputProps={InputProps}
            inputProps={{
              placeholder,
              ...inputProps
            }}
            ref={inputRef}
            onChange={(date) => {
              field.onChange(date)
              onChange()
            }}
          />
          {
            (field.value && activeDelete) && (
              <IconButton
                  onClick={() => {
                    callBackDeleteIcon()
                    setValue(name, null)
                  }}
                  pseudo="-webkit-search-cancel-button" id="search-clear"
                  aria-label="delete"
                  size="small"
                  sx={{
                    position: 'absolute',
                    left: 'auto',
                    right: '40px',
                    top: '15px',
                    bottom: '0',
                    width: '30px',
                    height: '30px',
                    fontSize: '19px !important',
                    color: 'rgb(0 0 0 / 54%)',
                    fontWeight: 'bolder'
                  }}
                  >
                  <CloseIcon sx={{
                    fontSize: '19px !important'
                  }} />
                </IconButton>
            )
          }
          {fieldState.error && scrollToinput()}
        </Box>
      )}
    />
  )
}

export default DatePickerForm
