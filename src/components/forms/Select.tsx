import React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const SelectField = (props: {
  children: React.ReactNode,
  id: string, 
  value: string,
  label: string,
  helper: string,
  onChange: ReturnType<typeof Function>,
  required?: boolean, 
  error?: string 
}) => {
  const {value, onChange, helper, label, id, children, error='', required=false} = props;
  const reqT = ((value === ''||String(value) === "0")  && required)
  const err = (error !== '' || reqT)
  const errValue = (reqT?'Field is required!':(err?error:''))

  const onChangeLocal = (e: any) => { 
    const {name, value} = e.target;
    onChange(name, value);
  } 

  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}_label`}>{label}{err&&` ${errValue}`}</InputLabel>
      <Select
        required={required}
        error={err} 
        labelId={`${id}_label`}
        value={value}
        onChange={onChangeLocal}
        name={id}
        aria-describedby={`${id}-helper`}
      >
        {children}
      </Select>
      <FormHelperText id={`${id}}-helper`}>{helper}</FormHelperText>
    </FormControl>

  )
}

export default SelectField;

