import React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const SelectField = (props: {
  children: React.ReactNode,
  id: ReturnType<typeof String>,
  value: ReturnType<typeof String>,
  label: ReturnType<typeof String>,
  helper: ReturnType<typeof String>,
  onChange: ReturnType<typeof Function>,
  error: ReturnType<typeof Boolean>,
  errorMsg: ReturnType<typeof String>
}) => {
  const {value, onChange, helper, label, id, children, error, errorMsg} = props;
  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}_label`}>{label}</InputLabel>
      <Select
        error={error} 
        labelId={`${id}_label`}
        value={value}
        onChange={onChange}
        name={id}
        aria-describedby={`${id}-helper`}
      >
        {children}
      </Select>
      <FormHelperText id={`${id}}-helper`}>{(error?errorMsg:helper)}</FormHelperText>
    </FormControl>

  )
}

export default SelectField;

