import 'date-fns'
import React, { useRef } from 'react'
import { Controller } from 'react-hook-form'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {
  IconButton, Box
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { esES } from '@mui/x-date-pickers/locales';

interface DateCalendarFormProps {
  name: string;
  label?: string;
  className?: string;
  control: any;
  validations?: object;
  fullWidth?: boolean;
  required?: boolean;
  max?: Date | null;
  min?: Date | null;
  views?: Array<'year' | 'month' | 'day'>;
  inputProps?: object;
  placeholder?: string;
  defaultValue?: Date | null;
  disabled?: boolean;
  focusError?: boolean;
  InputProps?: object;
  disableFuture?: boolean;
  disablePast?: boolean;
  callBackDeleteIcon?: () => void;
  onChange?: (date: Date | null) => any;
  activeDelete?: boolean;
  setValue?: (name: string, value: any) => void;
}

const DateCalendarForm: React.FC<DateCalendarFormProps> = ({
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
      render={({ field, fieldState }: any) => (
        

        <Box sx={{
          position: 'relative'
        }}>
          <DateCalendar
            name={name}
            label={label}
            value={field.value}
            disabled={disabled}
            defaultValue={defaultValue}
            required={required}
            disableFuture={disableFuture}
            disablePast={disablePast}
            sx={{
              ...(fullWidth && { width: '100%' }),
              fontSize: '19px',
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
              onChange(date)
            }}
            localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
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
          {fieldState?.error && scrollToinput()}
        </Box>
      )}
    />
  )
}

export default DateCalendarForm
