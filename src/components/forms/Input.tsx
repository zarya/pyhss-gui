import React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const InputField = (props: {
  children: React.ReactNode,
  id: ReturnType<typeof String>,
  value: ReturnType<typeof String>,
  label: ReturnType<typeof String>,
  onChange: ReturnType<typeof Function>,
  error: ReturnType<typeof String>,
  required: ReturnType<typeof Boolean>
}) => {
  const {value, onChange, children, label, id, error='', required=false} = props;

  const reqT = ((value === ''||String(value) === "0")  && required)
  const err = (error !== ''||reqT)
  const errValue = (reqT?'Field is required!':(err?error:''))

  return (
    <FormControl fullWidth>
      <TextField
        error={err}
        style={{ width: "100%" }}
        required={required}
        label={`${label} ${errValue}`}
        onChange={onChange}
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
