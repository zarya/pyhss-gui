import React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const InputField = (props: {
  children: React.ReactNode,
  id: string, 
  value: string, 
  label: string, 
  onChange: ReturnType<typeof Function>,
  error?: string,
  required?: boolean,
  disabled?: boolean
}) => {
  const {value, onChange, children, label, id, error='', required=false, disabled=false} = props;

  const reqT = ((value === ''||String(value) === "0")  && required)
  const err = (error !== '' || reqT)
  const errValue = (reqT?'Field is required!':(err?error:''))

  const onChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    onChange(name, value);
  }

  return (
    <FormControl fullWidth>
      <TextField
        disabled={disabled}
        error={err}
        style={{ width: "100%" }}
        required={required}
        label={`${label} ${errValue}`}
        onChange={onChangeLocal}
        value={value}
        name={id}
        aria-describedby={`${id}-helper`}
        InputLabelProps={{ required: false }}
      />
      <FormHelperText id={`${id}}-helper`}>{children}</FormHelperText>
    </FormControl>

  )
}

export default InputField;
