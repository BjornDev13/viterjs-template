import React, { useRef } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { IconX } from '@tabler/icons-react';

interface SelectFormProps {
  name: string;
  label?: string;
  className?: Record<string, string>;
  control: any; // You can replace this with the correct type for react-hook-form's control
  validations?: Record<string, unknown>; // Adjust the type as needed
  data: { label: string; value: string | boolean | number }[];
  disabled?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  variant?: 'outlined' | 'standard' | 'filled'; // Adjust as needed
  inputProps?: Record<string, unknown>; // Adjust the type as needed
  classes?: Record<string, string>; // Adjust the type as needed
  displayEmpty?: boolean;
  onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
  fontSizeForItems?: string;
  marginTopForLabel?: string | null;
  activeDelete?: boolean;
  setValue?: any;
}

const SelectForm: React.FC<SelectFormProps> = ({
  name, // Nombre del campo
  label = '', // label del campo
  className = {}, // estilos para la caja de el input
  control, // control proveniente de react-hook-form
  validations = {}, // Objeto con las validaciones
  data = [], // Items para el listado
  disabled = false, // Marcar campo deshabilitado
  fullWidth = true, // Si ocupa o no toda la caja donde se encuentra
  placeholder = 'Seleccione...', // Placeholder
  required = false, // Marcar campo como requerido
  defaultValue = '', // Valor por defecto
  variant = 'outlined', // Variante del input
  inputProps = {}, // Propiedades del input
  classes = {}, // Propiedades del input de MUI
  displayEmpty = false, // Mostrar vacio
  onChange = {}, // funcion
  fontSizeForItems = '15px',
  marginTopForLabel = null,
  activeDelete = false,
  setValue,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <Controller
        name={name}
        control={control}
        rules={validations}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
          <Box sx={{
            ...className,
            position: 'relative'
          }} width={fullWidth ? '100%' : 'auto'}>
            <FormControl
              fullWidth={fullWidth}
              required={required}
              onChange={({ target: { value } }: any) => {
                field.onChange(value)
              }}
              error={fieldState.error ? true : false}
              ref={inputRef}
              variant={variant}
              {...props}
            >
              {
                label !== ''
                  ? (<InputLabel id={name} sx={{ fontSize: fontSizeForItems, ...(marginTopForLabel && { marginTop: marginTopForLabel }) }}>
                  {
                    validations?.required !== null
                      ? (
                         <>
                           {label}{' '}
                           <Typography component="span" sx={{ backgroundColor: '#fff' }}>
                             *
                           </Typography>
                         </>
                        )
                      : (
                          label
                        )
                  }
                </InputLabel>
                    )
                  : null
              }
              <Select
                labelId={name}
                id={name}
                label={label}
                disabled={disabled}
                placeholder={placeholder}
                inputProps={inputProps}
                displayEmpty={displayEmpty}
                classes={classes}
                autoComplete='off'
                sx={{
                  fontFamily: 'Roboto Regular',
                  backgroundColor: '#fff',
                  fontSize: fontSizeForItems
                }}
                {...field}
              >
                {
                  placeholder
                    ? (
                        <MenuItem disabled value="" sx={{ fontSize: fontSizeForItems }}>
                          <em>{placeholder}</em>
                        </MenuItem>
                      )
                    : null
                }
                {data.map((el: any, index: any) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <MenuItem key={`${name}-${el.label}-${index}`} value={el?.value} sx={{ fontSize: fontSizeForItems }}>
                    {el.label}
                  </MenuItem>
                ))}
              </Select>
              {fieldState.error && (
                <FormHelperText sx={{ fontFamily: 'Roboto Regular' }}>
                  {fieldState.error?.message}
                </FormHelperText>
              )}
            </FormControl>
            {
              (field.value && activeDelete) && (
                <IconButton
                    onClick={() => setValue(name, '')}
                    size="small"
                    sx={{
                      position: 'absolute',
                      left: 'auto',
                      right: '30px',
                      top: '15px',
                      bottom: '0',
                      width: '30px',
                      height: '30px',
                      color: 'error.main',
                      transition: 'all easy-out .2s',
                      fontWeight: 'bolder',
                      border: '1px solid #FA896B !important',
                      '&:hover': {
                        backgroundColor: '#FA896B',
                        color: '#FFF'
                      }
                    }}
                    >
                    <IconX fontSize={'13px !important'}/>
                  </IconButton>
              )
            }
          </Box>
        )}
      />
  )
}

export default SelectForm
