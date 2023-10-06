import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
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

const ImsSubscriberAddModal = (props: {
  open: boolean,
  handleClose: any,
  data: object,
  edit: boolean,
}) => {
  const { open, handleClose, data, edit } = props;
  const [state, setState] = React.useState(data);
  const [error, setError] = React.useState(true);

  React.useEffect(() => {
      setState(data);
  }, [data])

  const handleChange = (name: string, value: string) => {
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

  const handleError = (e: boolean) => {
    console.log(e);
    setError(e);
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
            <ImsSubscriberAddItem onChange={handleChange} state={state} onError={handleError} />
          </Box>
          <SaveButtons onClickClose={handleLocalClose} onClickSave={handleSave} disabled={error} />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default ImsSubscriberAddModal;
