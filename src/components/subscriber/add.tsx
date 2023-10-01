import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import i18n from '@app/utils/i18n';
import {NetworkBandwidthFormatter} from '@components';

import {SubscriberApi} from '../../services/pyhss';

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

const SubscriberAddItem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof any>, data: ReturnType<typeof Object>, edit: ReturnType<typeof Boolean> }) => {
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

  const handleLocalClose = () => {
    handleClose();
  }

  const handleSave = () => {
    if (edit) {
      SubscriberApi.update(data.subscriber_id, state).then((data) => {
        handleLocalClose();
      });
    } else {
      SubscriberApi.create(state).then((data) => {
        handleLocalClose();
      });
    }
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
        <h3>{(edit?i18n.t('generic.edit'):i18n.t('generic.add'))} Subscriber</h3>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container rowSpacing={1} spacing={1}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  style={{ width: "100%" }}
                  required
                  id="outlined-required"
                  label="IMSI"
                  onChange={handleChange}
                  value={state.imsi}
                  name="imsi"
                  aria-describedby="imsi-helper"
                />
                <FormHelperText id="imsi-helper">Sim card number</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <TextField
                  style={{ width: "100%" }}
                  required
                  id="outlined-required"
                  label="AUC ID"
                  onChange={handleChange}
                  value={state.auc_id}
                  name="auc_id"
                  aria-describedby="auc_id-helper"
                />
                <FormHelperText id="auc_id-helper">AUC ID</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  required
                  style={{ width: "100%" }}
                  id="outlined-required"
                  label="MSISDN"
                  onChange={handleChange}
                  value={state.msisdn}
                  name="msisdn"
                  aria-describedby="msisdn-helper"
                />
                <FormHelperText id="msisdn-helper"></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth style={{ marginTop: 8, marginLeft: 8 }}>
                <InputLabel id="enabled_label">Enable</InputLabel>
                <Select
                  labelId="enabled_label"
                  value={state.enabled}
                  label="enabled"
                  onChange={handleChange}
                  name="enabled"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}><h3>APN</h3></Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  style={{ width: "100%" }}
                  required
                  id="outlined-required"
                  label="Default APN (id)"
                  onChange={handleChange}
                  value={state.default_apn}
                  name="default_apn"
                  aria-describedby="default_apn-helper"
                />
                <FormHelperText id="default_apn-helper">ID of the default APN</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  style={{ width: "100%" }}
                  required
                  id="outlined-required"
                  label="APN list"
                  onChange={handleChange}
                  value={state.apn_list}
                  name="apn_list"
                  aria-describedby="apn_list-helper"
                />
                <FormHelperText id="apn_list-helper">List of APN ids comma seperated</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}><h3>Bandwidth</h3></Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  style={{ width: "100%" }}
                  required
                  label="AMBR Upload"
                  onChange={handleChange}
                  value={state.ue_ambr_ul}
                  name="ue_ambr_ul"
                  aria-describedby="ue_ambr_ul-helper-text"
                />
                <FormHelperText id="ue_ambr_ul-helper-text">Upload bandwidth: <NetworkBandwidthFormatter data={state.ue_ambr_ul} /></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  style={{ width: "100%" }}
                  required
                  id="outlined-required"
                  label="AMBR Download"
                  onChange={handleChange}
                  value={state.ue_ambr_dl}
                  name="ue_ambr_dl"
                  aria-describedby="ue_ambr_dl-helper-text"
                />
                <FormHelperText id="ue_ambr_dl-helper-text">Download bandwidth: <NetworkBandwidthFormatter data={state.ue_ambr_dl} /></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}><h3>Timers</h3></Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  style={{ width: "100%" }}
                  required
                  id="outlined-required"
                  label="subscribed_rau_tau_timer"
                  onChange={handleChange}
                  value={state.subscribed_rau_tau_timer}
                  name="subscribed_rau_tau_timer"
                  aria-describedby="subscribed_rau_tau_timer-helper"
                />
                <FormHelperText id="subscribed_rau_tau_timer-helper"></FormHelperText>
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

export default SubscriberAddItem;
