import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import i18n from '@app/utils/i18n';
import {NetworkBandwidthFormatter} from '@components';
import {ApnApi} from '../../services/pyhss';

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

const ApnAddItem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof Function>, data: ReturnType<typeof Object>, edit: ReturnType<typeof Boolean> }) => {
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
      ApnApi.update(data.apn_id, state).then(() => {
        handleClose();
      })
    } else {
      ApnApi.create(state).then(() => {
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
        <h3>{(edit?i18n.t('generic.edit'):i18n.t('generic.add'))} APN</h3>
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
                  style={{width: '99%'}}
                  fullWidth
                  required
                  label="APN"
                  id="apn"
                  onChange={handleChange}
                  value={state.apn}
                  name="apn"
                  aria-describedby="apn-helper-text"
                />
                <FormHelperText id="apn-helper-text">APN Name</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth style={{ marginTop: 8 }}>
                <InputLabel id="qci_label">QCI</InputLabel>
                <Select
                  labelId="qci_label"
                  value={state.qci}
                  label="qci"
                  onChange={handleChange}
                  name="qci"
                  aria-describedby="qci-helper-text"
                >
                  {Array.from(Array(9), (e, i) => (<MenuItem key={i+1+e} value={i+1}>{i+1}</MenuItem>))}
                </Select>
              <FormHelperText id="qci-helper-text">QCI Value</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth style={{ marginTop: 8 }}>
                <InputLabel id="ip_version_label">IP Version</InputLabel>
                <Select
                  labelId="ip_version_label"
                  value={state.ip_version}
                  label="ip_version"
                  onChange={handleChange}
                  name="ip_version"
                  aria-describedby="ip_version-helper-text"
                >
                  <MenuItem key={1} value={0}>ipv4</MenuItem>
                  <MenuItem key={2} value={1}>ipv6</MenuItem>
                  <MenuItem key={3} value={2}>ipv4 and ipv6</MenuItem>
                  <MenuItem key={4} value={3}>ipv4 or ipv6</MenuItem>
                </Select>
                <FormHelperText id="ip_version-helper-text">Version(s) of the ip that are enabled</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}><h3>Gateway</h3></Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                    style={{ width: "100%" }}
                  required
                  id="outlined-required"
                  label="PGW"
                  onChange={handleChange}
                  value={state.pgw_address}
                  name="pgw_address"
                  aria-describedby="pgw_address-helper"
                />
                <FormHelperText id="pgw_address-helper">IP/FQDN of the PGW</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  style={{ width: "100%" }}
                  required
                  id="outlined-required"
                  label="SGW"
                  onChange={handleChange}
                  value={state.sgw_address}
                  name="sgw_address"
                  aria-describedby="sgw_address-helper"
                />
                <FormHelperText id="sgw_address-helper">IP/FQDN of the SGW</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}><h3>Charging</h3></Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  required
                  style={{ width: "100%" }}
                  id="outlined-required"
                  label="Charging Characteristics"
                  onChange={handleChange}
                  value={state.charging_characteristics}
                  name="charging_characteristics"
                  aria-describedby="charging_characteristics-helper"
                />
                <FormHelperText id="charging_characteristics-helper">Charging characteristics</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-required"
                  label="Charging rule list"
                  onChange={handleChange}
                  value={state.charging_rule_list}
                  name="charging_rule_list"
                  aria-describedby="charging_rule_list-helper"
                />
                <FormHelperText id="charging_rule_list-helper">Comma seperated list of charging rules</FormHelperText>
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
                  value={state.apn_ambr_ul}
                  name="apn_ambr_ul"
                  aria-describedby="apn_ambr_ul-helper-text"
                />
                <FormHelperText id="apn_ambr_ul-helper-text">Upload bandwidth: <NetworkBandwidthFormatter data={state.apn_ambr_ul} /></FormHelperText>
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
                  value={state.apn_ambr_dl}
                  name="apn_ambr_dl"
                  aria-describedby="apn_ambr_dl-helper-text"
                />
                <FormHelperText id="apn_ambr_dl-helper-text">Download bandwidth: <NetworkBandwidthFormatter data={state.apn_ambr_dl} /></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}><h3>Arp</h3></Grid>
            <Grid item xs={4}>
              <FormControl fullWidth style={{ marginTop: 8 }}>
                <InputLabel id="arp_priority_label">Priority</InputLabel>
                <Select
                  labelId="arp_priority_label"
                  value={state.arp_priority}
                  label="arp_priority"
                  onChange={handleChange}
                  name="arp_priority"
                  aria-describedby="arp_priority-helper-text"
                >
                  {Array.from(Array(15), (e, i) => (<MenuItem key={i+1+e} value={i+1}>{i+1}</MenuItem>))}
                </Select>
                <FormHelperText id="arp_priority-helper-text">Allocation and Retention Policy - Bearer priority level</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth style={{ marginTop: 8 }}>
                <InputLabel id="arp_preemption_capability_label">Preemption capability</InputLabel>
                <Select
                  labelId="arp_preemption_capability_label"
                  value={state.arp_preemption_capability}
                  label="arp_preemption_capability"
                  onChange={handleChange}
                  name="arp_preemption_capability"
                  aria-describedby="arp_preemption_capability-helper-text"
                >
                  <MenuItem value={true}>{i18n.t('generic.yes')}</MenuItem>
                  <MenuItem value={false}>{i18n.t('generic.no')}</MenuItem>
                </Select>
                <FormHelperText id="arp_preemption_capability-helper-text">Defines whether the service can be preempted by a higher-priority service</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth style={{ marginTop: 8 }}>
                <InputLabel id="arp_preemption_vulnerability_label">Preemption vulnerability</InputLabel>
                <Select
                  labelId="arp_preemption_vulnerability_label"
                  value={state.arp_preemption_vulnerability}
                  label="arp_preemption_vulnerability"
                  onChange={handleChange}
                  name="arp_preemption_vulnerability"
                  aria-describedby="arp_preemption_vulnerability-helper-text"
                >
                  <MenuItem value={true}>{i18n.t('generic.yes')}</MenuItem>
                  <MenuItem value={false}>{i18n.t('generic.no')}</MenuItem>
                </Select>
                <FormHelperText id="arp_preemption_vulnerability-helper-text">Defines whether a bearer is applicable for such dropping by a preemption capable bearer with a higher priority value.</FormHelperText>
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

export default ApnAddItem;
