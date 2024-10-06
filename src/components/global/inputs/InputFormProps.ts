import { TextField } from '@mui/material';
import { Controller, FieldValues, FieldPath } from 'react-hook-form'
export interface InputFormProps<TFieldValues extends FieldValues = FieldValues> {
    name: FieldPath<TFieldValues>;
    label?: string | null;
    variant?: 'outlined' | 'standard' | 'filled';
    className?: React.CSSProperties;
    control: any; // Replace with the actual type for react-hook-form's `control`
    validations?: Record<string, unknown>; // Adjust this type as needed
    disabled?: boolean;
    fullWidth?: boolean;
    placeholder?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    InputProps?: React.ComponentProps<typeof TextField>['InputProps'];
    required?: boolean;
    replace?: (val: string) => string;
    defaultValue?: string;
    onClick?: () => void;
    type?: string;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    multiline?: boolean;
    focused?: boolean;
    requiredShow?: boolean;
    rows?: number;
    focusError?: boolean;
    activeDelete?: boolean;
    callBackDeleteIcon?: () => void;
    setValue?: (name: FieldPath<TFieldValues>, value: any) => void;
  }