import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import {ApnApi} from '../../services/pyhss';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const apnTemplate = {
  "apn": "",
  "ip_version": 0,
  "pgw_address": "",
  "sgw_address": "",
  "charging_characteristics": "",
  "apn_ambr_dl": 0,
  "apn_ambr_ul": 0,
  "qci": 0,
  "arp_priority": 0,
  "arp_preemption_capability": false,
  "arp_preemption_vulnerability": false,
  "charging_rule_list": ""
}

const ApnAddItem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof any> }) => {
  const { open, handleClose } = props;
  const [state, setState] = React.useState(apnTemplate);
  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSave = () => {
    ApnApi.create(state).then(() => {
      setState(apnTemplate);
      handleClose();
    })
  }

  const handleLocalClose = () => {
    handleClose();
    setState(apnTemplate);
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
        <h3>Add</h3>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="outlined-required"
            label="APN"
            onChange={handleChange}
            value={state.apn}
            name="apn"
          />
          <FormControl fullWidth>
          <InputLabel id="ip_version_label">ip_version</InputLabel>
          <Select
            labelId="ip_version_label"
            value={state.ip_version}
            label="ip_version"
            onChange={handleChange}
            name="ip_version"
          >
            <MenuItem value={0}>ipv4</MenuItem>
            <MenuItem value={1}>ipv6</MenuItem>
            <MenuItem value={2}>ipv4 and ipv6</MenuItem>
            <MenuItem value={3}>ipv4 or ipv6</MenuItem>
          </Select>
          </FormControl>
          <TextField
            required
            id="outlined-required"
            label="PGW"
            onChange={handleChange}
            value={state.pgw_address}
            name="pgw_address"
          />
          <TextField
            required
            id="outlined-required"
            label="SGW"
            onChange={handleChange}
            value={state.sgw_address}
            name="sgw_address"
          />
          <TextField
            id="outlined-required"
            label="charging_characteristics"
            onChange={handleChange}
            value={state.charging_characteristics}
            name="charging_characteristics"
          />
          <TextField
            required
            id="outlined-required"
            label="apn_ambr_ul"
            onChange={handleChange}
            value={state.apn_ambr_ul}
            name="apn_ambr_ul"
          />
          <TextField
            required
            id="outlined-required"
            label="apn_ambr_dl"
            onChange={handleChange}
            value={state.apn_ambr_dl}
            name="apn_ambr_dl"
          />
          <TextField
            required
            id="outlined-required"
            label="qci"
            onChange={handleChange}
            value={state.qci}
            name="qci"
          />
          <TextField
            required
            id="outlined-required"
            label="arp_priority"
            onChange={handleChange}
            value={state.arp_priority}
            name="arp_priority"
          />
          <TextField
            required
            id="outlined-required"
            label="charging_rule_list"
            onChange={handleChange}
            value={state.charging_rule_list}
            name="charging_rule_list"
          />
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
         </Box>
         <Button onClick={() => handleSave()}>Save</Button>
       </Box>
     </Modal>

    </React.Fragment>
  );
}

export default ApnAddItem;
