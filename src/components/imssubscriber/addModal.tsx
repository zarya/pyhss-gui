import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import i18n from '@app/utils/i18n';

import {ImsSubscriberAddItem, SaveButtons} from '@components';

import {ImsSubscriberApi} from '../../services/pyhss';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ImsSubscriberAddModal = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof any>, data: ReturnType<typeof Object>, edit: ReturnType<typeof Boolean> }) => {
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
      ImsSubscriberApi.update(data.ims_subscriber_id, state).then((data) => {
        handleLocalClose();
      })
    } else {
      ImsSubscriberApi.create(state).then((data) => {
        handleLocalClose();
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
          <h3>{(edit?i18n.t('generic.edit'):i18n.t('generic.add'))} IMS Subscriber</h3>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <ImsSubscriberAddItem onChange={handleChange} state={state} />
          </Box>
          <SaveButtons onClickClose={handleLocalClose} onClickSave={handleSave} />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default ImsSubscriberAddModal;
