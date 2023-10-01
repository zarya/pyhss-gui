import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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

const DeleteDialog = (props: { id: ReturnType<typeof Number>, callback: ReturnType<typeof any> }) => {
  const { id, callback } = props;
  const [open, setOpen] = React.useState(false);

  const handleSave = () => {
    callback(id);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <React.Fragment>
     <Button onClick={handleOpen}><i class="fas fa-trash"></i></Button>
     <Modal
       open={open}
       onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={style}>
        <h3>Are you sure</h3>
         <Button onClick={() => handleSave()}>Yes</Button>
         <Button onClick={() => handleClose()}>No</Button>
       </Box>
     </Modal>

    </React.Fragment>
  );
}

export default DeleteDialog;
