import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import {ChargingRuleApi} from '../../services/pyhss';

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

const charging_ruleTemplate = {
  "rule_name": "",
  "qci": 0,
  "arp_priority": 0,
  "arp_preemption_capability": false,
  "arp_preemption_vulnerability": false,
  "mbr_dl": 0,
  "mbr_ul": 0,
  "gbr_dl": 0,
  "gbr_ul": 0,
  "tft_group_id": 0,
  "precedence": 0,
  "rating_group": 0
}

const ChargingRuleAddItem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof any> }) => {
  const { open, handleClose } = props;
  const [state, setState] = React.useState(charging_ruleTemplate);
  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSave = () => {
    ChargingRuleApi.create(state).then((data) => {
      console.log(state, data);
      setState(charging_ruleTemplate);
      handleClose();
    })
  }

  const handleLocalClose = () => {
    handleClose();
    setState(charging_ruleTemplate);
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
            label="Name"
            onChange={handleChange}
            value={state.rule_name}
            name="rule_name"
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
            label="tft_group_id"
            onChange={handleChange}
            value={state.tft_group_id}
            name="tft_group_id"
          />
          <TextField
            required
            id="outlined-required"
            label="mbr_dl"
            onChange={handleChange}
            value={state.mbr_dl}
            name="mbr_dl"
          />
          <TextField
            required
            id="outlined-required"
            label="mbr_ul"
            onChange={handleChange}
            value={state.mbr_ul}
            name="mbr_ul"
          />
          <TextField
            required
            id="outlined-required"
            label="gbr_dl"
            onChange={handleChange}
            value={state.gbr_dl}
            name="gbr_dl"
          />
          <TextField
            required
            id="outlined-required"
            label="gbr_ul"
            onChange={handleChange}
            value={state.gbr_ul}
            name="gbr_ul"
          />
          <TextField
            required
            id="outlined-required"
            label="arp_priority"
            onChange={handleChange}
            value={state.arp_priority}
            name="arp_priority"
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
          <TextField
            required
            id="outlined-required"
            label="precedence"
            onChange={handleChange}
            value={state.precedence}
            name="precedence"
          />
          <TextField
            required
            id="outlined-required"
            label="rating_group"
            onChange={handleChange}
            value={state.rating_group}
            name="rating_group"
          />
         </Box>
         <Button onClick={() => handleSave()}>Save</Button>
       </Box>
     </Modal>

    </React.Fragment>
  );
}

export default ChargingRuleAddItem;
