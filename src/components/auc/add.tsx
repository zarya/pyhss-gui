import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import i18n from '@app/utils/i18n';

import {AucApi} from '../../services/pyhss';

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


const AucAdditem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof any>, data: ReturnType<typeof Object>, edit: ReturnType<typeof Boolean> }) => {
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
          <Grid container spacing={1} rowSpacing={1}>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
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
            </Grid>
            {!edit && <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  required
                  label="Ki"
                  onChange={handleChange}
                  value={state.ki}
                  name="ki"
                  aria-describedby="ki-helper"
                />
                <FormHelperText id="ki-helper">Ki key</FormHelperText>
              </FormControl>
            </Grid>}
            {!edit && <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  required
                  label="Opc"
                  onChange={handleChange}
                  value={state.opc}
                  name="opc"
                  aria-describedby="opc-helper"
                />
                <FormHelperText id="opc-helper">Opc key</FormHelperText>
              </FormControl>
            </Grid>}
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  required
                  label="ICCID"
                  onChange={handleChange}
                  value={state.iccid}
                  name="iccid"
                  aria-describedby="iccid-helper"
                />
                <FormHelperText id="iccid-helper">ICCID</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth style={{ marginTop: 8 }}>
                <InputLabel id="esim_label">eSim</InputLabel>
                <Select
                  labelId="esim_label"
                  value={state.esim}
                  label="eSim"
                  onChange={handleChange}
                  name="esim"
                  aria-describedby="esim-helper-text"
                >
                  <MenuItem value={true}>{i18n.t('generic.yes')}</MenuItem>
                  <MenuItem value={false}>{i18n.t('generic.no')}</MenuItem>
                </Select>
                <FormHelperText id="esim-helper-text">Is this a eSim?</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  label="Vendor"
                  onChange={handleChange}
                  value={state.sim_vendor}
                  name="sim_vendor"
                  aria-describedby="vendor-helper"
                />
                <FormHelperText id="vendor-helper">Vendor</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  label="Batch"
                  onChange={handleChange}
                  value={state.batch_name}
                  name="batch_name"
                  aria-describedby="batch-helper"
                />
                <FormHelperText id="batch-helper">Batch</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  label="LPA"
                  onChange={handleChange}
                  value={state.lpa}
                  name="lpa"
                  aria-describedby="lpa-helper"
                />
                <FormHelperText id="lpa-helper">LPA</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  required
                  label="AMF"
                  onChange={handleChange}
                  value={state.amf}
                  name="amf"
                  aria-describedby="amf-helper"
                />
                <FormHelperText id="amf-helper">AMF</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}><h3>User info</h3></Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  label="PIN 1"
                  onChange={handleChange}
                  value={state.pin1}
                  name="pin1"
                  aria-describedby="pin1-helper"
                />
                <FormHelperText id="pin1-helper">PIN 1</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  label="PUK 1"
                  onChange={handleChange}
                  value={state.puk1}
                  name="puk1"
                  aria-describedby="puk1-helper"
                />
                <FormHelperText id="puk1-helper">PUK 1</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  label="PIN 2"
                  onChange={handleChange}
                  value={state.pin2}
                  name="pin2"
                  aria-describedby="pin2-helper"
                />
                <FormHelperText id="pin2-helper">PIN 2</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  label="PUK 2"
                  onChange={handleChange}
                  value={state.puk2}
                  name="puk2"
                  aria-describedby="puk2-helper"
                />
                <FormHelperText id="puk2-helper">PUK 2</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}><h3>Misc</h3></Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  label="misc1"
                  onChange={handleChange}
                  value={state.misc1}
                  name="misc1"
                  aria-describedby="misc1-helper"
                />
                <FormHelperText id="misc1-helper">MISC 1</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  label="misc2"
                  onChange={handleChange}
                  value={state.misc2}
                  name="misc2"
                  aria-describedby="misc2-helper"
                />
                <FormHelperText id="misc2-helper">MISC 2</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  label="misc3"
                  onChange={handleChange}
                  value={state.misc3}
                  name="misc3"
                  aria-describedby="misc3-helper"
                />
                <FormHelperText id="misc3-helper">MISC 3</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField
                  style={{width: '99%'}}
                  label="misc4"
                  onChange={handleChange}
                  value={state.misc4}
                  name="misc4"
                  aria-describedby="misc4-helper"
                />
                <FormHelperText id="misc4-helper">MISC 4</FormHelperText>
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

export default AucAdditem;
