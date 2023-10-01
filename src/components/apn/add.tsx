import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Unstable_Grid2';
import FormHelperText from '@mui/material/FormHelperText';

import {ApnApi} from '../../services/pyhss';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ApnAddItem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof Function>, data: ReturnType<typeof Object>, edit: ReturnType<typeof Boolean> }) => {
  const { open, handleClose, data, edit } = props;
  const [state, setState] = React.useState(data);

   React.useEffect(() => {
       setState(data);
   }, [data]) 
  
  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSave = () => {
    if (edit) {
      ApnApi.update(data.apn_id, state).then(() => {
        handleClose();
      })
    } else {
      ApnApi.create(state).then(() => {
        handleClose();
      })
    }
  }

  const handleLocalClose = () => {
    handleClose();
  }

  return (
    <React.Fragment>
     <Modal
       open={open}
       onClose={handleLocalClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={style}>
        <h3>{(edit?'Edit':'Add')}</h3>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
        <Grid container rowSpacing={1}>
          <Grid xs={6}>
            <FormControl fullWidth>
            <TextField
              required
              label="APN"
              id="apn"
              onChange={handleChange}
              value={state.apn}
              name="apn"
              aria-describedby="apn-helper-text"
            />
            <FormHelperText id="apn-helper-text">APN Name</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={6}>
            <FormControl fullWidth>
              <InputLabel id="qci_label">QCI</InputLabel>
              <Select
                labelId="qci_label"
                value={state.qci}
                label="qci"
                onChange={handleChange}
                name="qci"
                aria-describedby="qci-helper-text"
              >
                {Array.from(Array(9), (e, i) => (<MenuItem key={i+1+e} value={i+1}>{i+1}</MenuItem>))}
              </Select>
            <FormHelperText id="qci-helper-text">QCI Value</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={8}>
            <FormControl fullWidth>
              <InputLabel id="ip_version_label">IP Version</InputLabel>
              <Select
                labelId="ip_version_label"
                value={state.ip_version}
                label="ip_version"
                onChange={handleChange}
                name="ip_version"
                aria-describedby="ip_version-helper-text"
              >
                <MenuItem key={1} value={0}>ipv4</MenuItem>
                <MenuItem key={2} value={1}>ipv6</MenuItem>
                <MenuItem key={3} value={2}>ipv4 and ipv6</MenuItem>
                <MenuItem key={4} value={3}>ipv4 or ipv6</MenuItem>
              </Select>
              <FormHelperText id="ip_version-helper-text">Version(s) of the ip that are enabled</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={6}>
          <TextField
            required
            id="outlined-required"
            label="PGW"
            onChange={handleChange}
            value={state.pgw_address}
            name="pgw_address"
          />
          </Grid>
          <Grid xs={6}>
          <TextField
            required
            id="outlined-required"
            label="SGW"
            onChange={handleChange}
            value={state.sgw_address}
            name="sgw_address"
          />
          </Grid>
          <Grid xs={6}>
          <TextField
            id="outlined-required"
            label="charging_characteristics"
            onChange={handleChange}
            value={state.charging_characteristics}
            name="charging_characteristics"
          />
          </Grid>
          <Grid xs={6}>
          <TextField
            required
            id="outlined-required"
            label="apn_ambr_ul"
            onChange={handleChange}
            value={state.apn_ambr_ul}
            name="apn_ambr_ul"
          />
          </Grid>
          <Grid xs={6}>
          <TextField
            required
            id="outlined-required"
            label="apn_ambr_dl"
            onChange={handleChange}
            value={state.apn_ambr_dl}
            name="apn_ambr_dl"
          />
          </Grid>
            <Grid xs={6}>
            <TextField
              required
              id="outlined-required"
              label="charging_rule_list"
              onChange={handleChange}
              value={state.charging_rule_list}
              name="charging_rule_list"
            />
            </Grid>
            <Grid xs={12}><h3>Arp</h3></Grid>
            <Grid xs={6}>
              <TextField
                required
                id="outlined-required"
                label="arp_priority"
                onChange={handleChange}
                value={state.arp_priority}
                name="arp_priority"
              />
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <InputLabel id="arp_preemption_capability_label">arp_preemption_capability</InputLabel>
                <Select
                  labelId="arp_preemption_capability_label"
                  value={state.arp_preemption_capability}
                  label="arp_preemption_capability"
                  onChange={handleChange}
                  name="arp_preemption_capability"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <InputLabel id="arp_preemption_vulnerability_label">arp_preemption_vulnerability</InputLabel>
                <Select
                  labelId="arp_preemption_vulnerability_label"
                  value={state.arp_preemption_vulnerability}
                  label="arp_preemption_vulnerability"
                  onChange={handleChange}
                  name="arp_preemption_vulnerability"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
         </Box>
         <Button onClick={() => handleSave()}>Save</Button>
       </Box>
     </Modal>

    </React.Fragment>
  );
}

export default ApnAddItem;
