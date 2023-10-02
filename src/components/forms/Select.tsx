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
  onChange: ReturnType<typeof Function>
}) => {
  const {value, onChange, helper, label, id, children} = props;
  return (
    <FormControl fullWidth style={{ marginLeft: 8, marginTop: 8 }}>
      <InputLabel id={`${id}_label`}>{label}</InputLabel>
      <Select                      
        labelId={`${id}_label`}
        value={value}
        onChange={onChange}
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

