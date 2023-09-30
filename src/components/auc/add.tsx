import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {AucApi} from '../../services/pyhss';

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

const uacTemplate = {
  "ki": "",
  "opc": "",
  "amf": "",
  "iccid": "",
  "imsi": "",
  "batch_name": "",
  "sim_vendor": "",
  "esim": false,
  "lpa": "",
  "pin1": "",
  "pin2": "",
  "puk1": "",
  "puk2": "",
  "kid": "",
  "psk": "",
  "des": "",
  "adm1": "",
  "misc1": "",
  "misc2": "",
  "misc3": "",
  "misc4": ""
}

const AucAddItem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof any> }) => {
  const { open, handleClose } = props;
  const [state, setState] = React.useState(uacTemplate);
  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSave = () => {
    AucApi.create(state).then((data) => {
      console.log(state, data);
      setState(uacTemplate);
      handleClose();
    })
  }

  const handleLocalClose = () => {
    handleClose();
    setState(uacTemplate);
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
            label="Ki"
            onChange={handleChange}
            value={state.ki}
            name="ki"
          />
          <TextField
            required
            id="outlined-required"
            label="OPC"
            onChange={handleChange}
            value={state.opc}
            name="opc"
          />
          <TextField
            required
            id="outlined-required"
            label="ICCID"
            onChange={handleChange}
            value={state.iccid}
            name="iccid"
          />
          <TextField
            id="outlined-required"
            label="Vendor"
            onChange={handleChange}
            value={state.sim_vendor}
            name="sim_vendor"
          />
         </Box>
         <Button onClick={() => handleSave()}>Save</Button>
       </Box>
     </Modal>

    </React.Fragment>
  );
}

export default AucAddItem;
