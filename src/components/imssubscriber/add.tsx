import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {ImsSubscriberApi} from '../../services/pyhss';

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

const imsSubscriberTemplate = {
  "msisdn": "",
  "msisdn_list": "",
  "imsi": "",
  "ifc_path": "default_ifc.xml",
  "sh_profile": "default_sh_user_data.xml",
  "scscf": "",
  "scscf_realm": "",
  "scscf_peer": ""
}

const ImsSubscriberAddItem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof any> }) => {
  const { open, handleClose } = props;
  const [state, setState] = React.useState(imsSubscriberTemplate);
  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSave = () => {
    ImsSubscriberApi.create(state).then((data) => {
      console.log(state, data);
      setState(imsSubscriberTemplate);
      handleClose();
    })
  }

  const handleLocalClose = () => {
    handleClose();
    setState(imsSubscriberTemplate);
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
            label="MSISDN"
            onChange={handleChange}
            value={state.msisdn}
            name="msisdn"
          />
          <TextField
            required
            id="outlined-required"
            label="MSISDN list"
            onChange={handleChange}
            value={state.msisdn_list}
            name="msisdn_list"
          />
          <TextField
            required
            id="outlined-required"
            label="ifc_path"
            onChange={handleChange}
            value={state.ifc_path}
            name="ifc_path"
          />
          <TextField
            required
            id="outlined-required"
            label="sh_profile"
            onChange={handleChange}
            value={state.sh_profile}
            name="sh_profile"
          />
         </Box>
         <Button onClick={() => handleSave()}>Save</Button>
       </Box>
     </Modal>

    </React.Fragment>
  );
}

export default ImsSubscriberAddItem;
