import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import {
  NetworkBandwidthFormatter,
  InputField,
  SelectField,
} from '@components';

import i18n from '@app/utils/i18n';

import {ChargingRuleApi} from '../../services/pyhss';

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

const ChargingRuleAddItem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof any>, data: ReturnType<typeof Object>, edit: ReturnType<typeof Boolean> }) => {
  const { open, handleClose, data, edit } = props;
  const [state, setState] = React.useState(data);
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
      ChargingRuleApi.update(data.charging_rule_id, state).then((data) => {
        handleLocalClose();
      });
    } else {
      ChargingRuleApi.create(state).then((data) => {
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
        <h3>{i18n.t('chargingRule.headAdd', {"mode": (edit?i18n.t('generic.edit'):i18n.t('generic.add'))})}</h3>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={1} rowSpacing={1}>
              <Grid item xs={3}>
                <InputField
                  required
                  value={state.rule_name}
                  onChange={handleChange}
                  id="rule_name"
                  label={i18n.t('inputFields.header.name')}
                >
                  {i18n.t('inputFields.desc.name')}
                </InputField>
              </Grid>
              <Grid item xs={2}>
                <InputField
                  required
                  label="tft_group_id"
                  onChange={handleChange}
                  value={state.tft_group_id}
                  id="tft_group_id"
                >
                  {i18n.t('inputFields.desc.tftGroup')}
                </InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  required
                  label={i18n.t('inputFields.header.ratingGroup')}
                  onChange={handleChange}
                  value={state.rating_group}
                  id="rating_group"
                >
                  {i18n.t('inputFields.desc.ratingGroup')}
                </InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  required
                  label={i18n.t('inputFields.header.precedence')}
                  onChange={handleChange}
                  value={state.precedence}
                  id="precedence"
                >
                  {i18n.t('inputFields.desc.precedence')}
                </InputField>
              </Grid>
              <Grid item xs={12}><h3>{i18n.t('apn.qosHead')}</h3></Grid>
              <Grid item xs={2}>
                 <SelectField
                   required
                   value={state.qci}
                   onChange={handleChange}
                   id="qci"
                   label={i18n.t('inputFields.header.qci')}
                   helper={i18n.t('inputFields.desc.qci')}
                 >
                   {Array.from(Array(9), (e, i) => (<MenuItem key={i+1+e} value={i+1}>{i+1}</MenuItem>))}
                 </SelectField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  required
                  label={i18n.t('inputFields.header.mbr_dl')}
                  onChange={handleChange}
                  value={state.mbr_dl}
                  id="mbr_dl"
                >
                  {i18n.t('inputFields.desc.mbr_dl')} <NetworkBandwidthFormatter data={state.mbr_dl} />
                </InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  required
                  label={i18n.t('inputFields.header.mbr_ul')}
                  onChange={handleChange}
                  value={state.mbr_ul}
                  id="mbr_ul"
                >
                  {i18n.t('inputFields.desc.mbr_ul')} <NetworkBandwidthFormatter data={state.mbr_ul} />
                </InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  required
                  label={i18n.t('inputFields.header.gbr_dl')}
                  onChange={handleChange}
                  value={state.gbr_dl}
                  id="gbr_dl"
                 >
                 {i18n.t('inputFields.desc.gbr_dl')} <NetworkBandwidthFormatter data={state.gbr_dl} />
               </InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  required
                  label={i18n.t('inputFields.header.gbr_ul')}
                  onChange={handleChange}
                  value={state.gbr_ul}
                  id="gbr_ul"
                >
                  {i18n.t('inputFields.desc.gbr_ul')} <NetworkBandwidthFormatter data={state.gbr_ul} />
                </InputField>
              </Grid>
              <Grid item xs={12}><h4>{i18n.t('apn.arpHead')}</h4></Grid>
              <Grid item xs={3}>
                <SelectField
                  value={state.arp_priority}
                  onChange={handleChange}
                  id="arp_priority"
                  label={i18n.t('inputFields.header.arpPriority')}
                  helper={i18n.t('inputFields.desc.arpPriority')}
                >
                  {Array.from(Array(15), (e, i) => (<MenuItem key={i+1+e} value={i+1}>{i+1}</MenuItem>))}
                </SelectField>
              </Grid>
              <Grid item xs={3}>
                <SelectField
                  value={state.arp_preemption_capability}
                  onChange={handleChange}
                  id="arp_preemption_capability"
                  label={i18n.t('inputFields.header.arpPreemptionCapability')}
                  helper={i18n.t('inputFields.desc.arpPreemptionCapability')}
                >
                  <MenuItem value={true}>{i18n.t('generic.yes')}</MenuItem>
                  <MenuItem value={false}>{i18n.t('generic.no')}</MenuItem>
                </SelectField>
              </Grid>
              <Grid item xs={3}>
                <SelectField
                  value={state.arp_preemption_vulnerability}
                  onChange={handleChange}
                  id="arp_preemption_vulnerability"
                  label={i18n.t('inputFields.header.arpPreemptionVulnerability')}
                  helper={i18n.t('inputFields.desc.arpPreemptionVulnerability')}
                >
                  <MenuItem value={true}>{i18n.t('generic.yes')}</MenuItem>
                  <MenuItem value={false}>{i18n.t('generic.no')}</MenuItem>
                </SelectField>
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

export default ChargingRuleAddItem;
