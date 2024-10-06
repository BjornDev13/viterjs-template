import React, { useRef } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import {
  Controller,
  FieldValues,
  FieldPath,
} from 'react-hook-form';

interface InputFormProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>;
  label?: string | null;
  variant?: 'standard' | 'outlined' | 'filled';
  className?: React.CSSProperties;
  control: any;
  validations?: Record<string, unknown>; // Cambia esto al tipo correcto para tus validaciones
  disabled?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  InputProps?: any;
  required?: boolean;
  replace?: (val: string) => string;
  defaultValue?: any;
  onClick?: () => void;
  type?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  multiline?: boolean;
  focused?: boolean;
  requiredShow?: boolean;
  rows?: number;
}

const InputForm: React.FC<InputFormProps> = ({
  name,
  label = null,
  variant = 'outlined',
  className = {},
  control,
  validations = {},
  disabled = false,
  fullWidth = true,
  placeholder = '',
  inputProps = {},
  InputProps = {},
  required = false,
  replace = (val) => val,
  defaultValue = '',
  onClick = () => {},
  type = 'text',
  onKeyDown = () => {},
  multiline = false,
  focused = false,
  requiredShow = false,
  rows,
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
        <Box sx={className} width="100%">
          <FormControl
            fullWidth={fullWidth}
            onChange={({ target }: any) => {
              field.onChange(replace(target?.value, field.value));
            }}
            onClick={() => onClick()}
            error={fieldState.error ? true : false}
            ref={inputRef}
            {...props}
          >
            <TextField
              id={name}
              variant={variant}
              placeholder={placeholder}
              type={type}
              inputProps={inputProps}
              required={required}
              error={fieldState.error ? true : false}
              InputProps={InputProps}
              label={
                requiredShow ? (
                  <Box sx={{ fontFamily: 'Roboto Regular' }}>
                    {label}{' '}
                    <Typography component="span" color="red">
                      *
                    </Typography>
                  </Box>
                ) : (
                  label
                )
              }
              disabled={disabled}
              aria-describedby={name}
              onKeyDown={onKeyDown}
              multiline={multiline}
              rows={rows}
              {...field}
              sx={{ fontFamily: 'Roboto Regular', fontSize: '15px' }}
            />
            {fieldState.error && (
              <FormHelperText sx={{ fontFamily: 'Roboto Regular' }}>
                {fieldState.error?.message}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
      )}
    />
  );
};

export default InputForm;
