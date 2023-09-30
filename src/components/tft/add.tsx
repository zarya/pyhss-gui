import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {TftApi} from '../../services/pyhss';

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

const tftTemplate = {
  "tft_group_id": 1,
  "tft_string": "",
  "direction": 0 
}

const TftAddItem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof any> }) => {
  const { open, handleClose } = props;
  const [state, setState] = React.useState(tftTemplate);
  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSave = () => {
    TftApi.create(state).then((data) => {
      console.log(state, data);
      setState(tftTemplate);
      handleClose();
    })
  }

  const handleLocalClose = () => {
    handleClose();
    setState(tftTemplate);
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
            label="Group"
            onChange={handleChange}
            value={state.tft_group_id}
            name="tft_group_id"
          />
          <TextField
            required
            id="outlined-required"
            label="Rule"
            onChange={handleChange}
            value={state.tft_string}
            name="tft_string"
          />
          <TextField
            required
            id="outlined-required"
            label="Direction (0/1/2/3)"
            onChange={handleChange}
            value={state.direction}
            name="direction"
          />
         </Box>
         <Button onClick={() => handleSave()}>Save</Button>
       </Box>
     </Modal>

    </React.Fragment>
  );
}

export default TftAddItem;
