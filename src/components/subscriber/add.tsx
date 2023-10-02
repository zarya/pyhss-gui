import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import i18n from '@app/utils/i18n';
import {NetworkBandwidthFormatter, InputField, SelectField} from '@components';

const SubscriberAddItem = (props: { onChange: ReturnType<typeof any>, state: ReturnType<typeof any> }) => {

  const { onChange, state  } = props;

  return (
    <React.Fragment>
          <Grid container rowSpacing={1} spacing={1}>
            <Grid item xs={4}>
              <InputField
                value={state.imsi}
                onChange={onChange}
                id="imsi"
                label="IMSI"
              >International mobile subscriber identity</InputField>
            </Grid>
            <Grid item xs={2}>
              <InputField
                value={state.auc_id}
                onChange={onChange}
                id="AUC ID"
                label="auc_id"
              >AUC ID</InputField>
            </Grid>
            <Grid item xs={3}>
              <InputField
                value={state.msisdn}
                onChange={onChange}
                id="msisdn"
                label="MSISDN"
              >MSISDN</InputField>
            </Grid>
            <Grid item xs={3}>
              <SelectField
                value={state.enabled}
                onChange={onChange}
                id="enabled"
                label="Enabled"
                helper="Subscriber enabled?"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </SelectField>
            </Grid>
            <Grid item xs={3}>
              <SelectField
                value={state.nam}
                onChange={onChange}
                id="nam"
                label="NAM"
                helper="Network Access Mode [3GPP TS. 123 008 2.1.1.2]"
              >
                <MenuItem value="0">Packet and circuit</MenuItem>
                <MenuItem value="2">Packet only</MenuItem>
              </SelectField>
            </Grid>
            <Grid item xs={12}><h3>APN</h3></Grid>
            <Grid item xs={4}>
              <InputField
                value={state.default_apn}
                onChange={onChange}
                id="default_apn"
                label="Default APN (id)"
              >ID of the default APN</InputField>
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={state.apn_list}
                onChange={onChange}
                id="apn_list"
                label="APN list"
              >List of APN ids comma seperated</InputField>
            </Grid>
            <Grid item xs={12}><h3>Bandwidth</h3></Grid>
            <Grid item xs={6}>
              <InputField
                value={state.ue_ambr_ul}
                onChange={onChange}
                id="ue_ambr_ul"
                label="AMBR Upload"
              >Upload bandwidth: <NetworkBandwidthFormatter data={state.ue_ambr_ul} /></InputField>
            </Grid>
            <Grid item xs={6}>
              <InputField
                value={state.ue_ambr_dl}
                onChange={onChange}
                id="ue_ambr_dl"
                label="AMBR Download"
              >Download bandwidth: <NetworkBandwidthFormatter data={state.ue_ambr_dl} /></InputField>
            </Grid>
            <Grid item xs={12}><h3>Timers</h3></Grid>
            <Grid item xs={4}>
              <InputField
                value={state.subscribed_rau_tau_timer}
                onChange={onChange}
                id="subscribed_rau_tau_timer"
                label="subscribed_rau_tau_timer"
              >Periodic Tracking Area Update timer</InputField>
            </Grid>
          </Grid>
    </React.Fragment>
  );
}

export default SubscriberAddItem;
