import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

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


const AucAddItem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof any>, data: ReturnType<typeof Object>, edit: ReturnType<typeof Boolean> }) => {
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
      AucApi.update(data.auc_id, state).then((data) => {
        handleClose();
      })
    }else{
      AucApi.create(state).then((data) => {
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
        <h3>Add</h3>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl>
          <TextField
            required
            id="outlined-required"
            label="IMSI"
            onChange={handleChange}
            value={state.imsi}
            name="imsi"
            aria-describedby="imsi-helper-text"
          />
          <FormHelperText id="imsi-helper-text">IMSI/Sim Number</FormHelperText>
          </FormControl>
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
