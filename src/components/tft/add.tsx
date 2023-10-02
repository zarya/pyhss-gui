import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import i18n from '@app/utils/i18n';

import {TftApi} from '../../services/pyhss';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TftAddItem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof any>, data: ReturnType<typeof Object>, edit: ReturnType<typeof Boolean> }) => {
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
      TftApi.update(data.tft_id, state).then((data) => {
        handleLocalClose();
      });
    } else {
      TftApi.create(state).then((data) => {
        handleLocalClose();
      });
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
        <h3>{(edit?i18n.t('generic.edit'):i18n.t('generic.add'))}</h3>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container rowSpacing={1} spacing={1}>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  fullWidth
                  required
                  label="Group"
                  id="tft_group_id"
                  onChange={handleChange}
                  value={state.tft_group_id}
                  name="tft_group_id"
                  aria-describedby="tft_group_id-helper"
                />
                <FormHelperText id="tft_group_id-helper">TFT Group</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  fullWidth
                  required
                  label="Rule"
                  id="tft_string"
                  onChange={handleChange}
                  value={state.tft_string}
                  name="tft_string"
                  aria-describedby="tft_string-helper"
                />
                <FormHelperText id="apn-helper">Rule</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth style={{ marginTop: 8 }}>
                <InputLabel id="direction_label">Direction</InputLabel>
                <Select
                  labelId="direction_label"
                  value={state.direction}
                  label="direction"
                  onChange={handleChange}
                  name="direction"
                  aria-describedby="direction-helper"
                >
                  <MenuItem value={0}>Unspecified</MenuItem>
                  <MenuItem value={1}>Downlink</MenuItem>
                  <MenuItem value={2}>Uplink</MenuItem>
                  <MenuItem value={3}>Bidirectional</MenuItem>
                </Select>
                <FormHelperText id="direction-helper">Defines traffic direction</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
         </Box>
        <Button variant="contained" onClick={() => handleSave()}>{i18n.t('generic.save')}&nbsp;<i className="fas fa-save"></i></Button>
         &nbsp;
        <Button variant="contained" onClick={() => handleLocalClose()}>{i18n.t('generic.cancel')}</Button>
       </Box>
     </Modal>

    </React.Fragment>
  );
}

export default TftAddItem;
