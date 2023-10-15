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

const ErrorDialog = (props: { error: string }) => {
  const { error } = props;
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  if (error !== '' && !open)
    setOpen(true);

  return (
    <React.Fragment>
     <Modal
       open={open}
       onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={style}>
        {error}
        <Button onClick={() => handleClose()}>Close</Button>
       </Box>
     </Modal>

    </React.Fragment>
  );
}

export default ErrorDialog;
