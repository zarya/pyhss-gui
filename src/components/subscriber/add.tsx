import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import {SubscriberApi} from '../../services/pyhss';

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

const subscriberTemplate = {
  "imsi": "",
  "enabled": true,
  "auc_id": 0,
  "default_apn": 0,
  "apn_list": "",
  "msisdn": "",
  "ue_ambr_dl": 0,
  "ue_ambr_ul": 0,
  "nam": 0,
  "subscribed_rau_tau_timer": 0,
  "serving_mme": "",
  "serving_mme_realm": "",
  "serving_mme_peer": ""
}

const SubscriberAddItem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof any> }) => {
  const { open, handleClose } = props;
  const [state, setState] = React.useState(subscriberTemplate);
  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSave = () => {
    SubscriberApi.create(state).then((data) => {
      console.log(state, data);
      setState(subscriberTemplate);
      handleClose();
    })
  }

  const handleLocalClose = () => {
    handleClose();
    setState(subscriberTemplate);
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
            label="IMSI"
            onChange={handleChange}
            value={state.imsi}
            name="imsi"
          />
          <TextField
            required
            id="outlined-required"
            label="AUC"
            onChange={handleChange}
            value={state.auc_id}
            name="auc_id"
          />
          <FormControl fullWidth>
          <InputLabel id="enabled_label">Enable</InputLabel>
          <Select
            labelId="enabled_label"
            value={state.arp_preemption_vulnerability}
            label="enabled"
            onChange={handleChange}
            name="enabled"
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
          </FormControl>
          <TextField
            required
            id="outlined-required"
            label="Default APN (id)"
            onChange={handleChange}
            value={state.default_apn}
            name="default_apn"
          />
          <TextField
            required
            id="outlined-required"
            label="APN list (id)"
            onChange={handleChange}
            value={state.apn_list}
            name="apn_list"
          />
          <TextField
            required
            id="outlined-required"
            label="MSISDN"
            onChange={handleChange}
            value={state.msisdn}
            name="msisdn"
          />
          <TextField
            required
            id="outlined-required"
            label="ue_ambr_dl"
            onChange={handleChange}
            value={state.ue_ambr_dl}
            name="ue_ambr_dl"
          />
          <TextField
            required
            id="outlined-required"
            label="ue_ambr_ul"
            onChange={handleChange}
            value={state.ue_ambr_ul}
            name="ue_ambr_ul"
          />
          <TextField
            required
            id="outlined-required"
            label="subscribed_rau_tau_timer"
            onChange={handleChange}
            value={state.subscribed_rau_tau_timer}
            name="subscribed_rau_tau_timer"
          />
         </Box>
         <Button onClick={() => handleSave()}>Save</Button>
       </Box>
     </Modal>

    </React.Fragment>
  );
}

export default SubscriberAddItem;
