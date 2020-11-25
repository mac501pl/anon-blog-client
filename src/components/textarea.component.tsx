import * as React from 'react';
import { FieldProps } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';

export const TextArea: React.FC<FieldProps & TextFieldProps> = ({ placeholder, form: { isValid, errors }, field }): JSX.Element => (
  <TextField size="small" style={{ marginRight: '.5rem', justifyContent: 'flex-end' }} error={!isValid} helperText={errors.content} fullWidth multiline placeholder={placeholder} {...field} />
);
