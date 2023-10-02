import React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const InputField = (props: {
  children: React.ReactNode,
  id: ReturnType<typeof String>,
  value: ReturnType<typeof String>,
  label: ReturnType<typeof String>,
  onChange: ReturnType<typeof Function>
}) => {
  const {value, onChange, children, label, id} = props;
  return (
    <FormControl fullWidth>
      <TextField
          style={{ width: "100%" }}
        required
        label={label}
        onChange={onChange}
        value={value}
        name={id}
        aria-describedby={`${id}-helper`}
      />
      <FormHelperText id={`${id}}-helper`}>{children}</FormHelperText>
    </FormControl>

  )
}

export default InputField;
