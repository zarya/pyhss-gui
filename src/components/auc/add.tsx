import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import i18n from '@app/utils/i18n';
import {InputField, SelectField} from '@components';


const AucAddItem = (props: { onChange: ReturnType<typeof any>, state: ReturnType<typeof any>, forceKeys: ReturnType<typeof Boolean>, edit: ReturnType<typeof Boolean> }) => {

  const { onChange, state, forceKeys, edit } = props;

  return (
    <React.Fragment>
            <Grid container spacing={1} rowSpacing={1}>
              <Grid item xs={3}>
                <InputField
                  value={state.imsi}
                  onChange={onChange}
                  id="imsi"
                  label="IMSI"
                >International mobile subscriber identity</InputField>
              </Grid>
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.ki}
                  onChange={onChange}
                  id="ki"
                  label="Ki"
                >Secret</InputField>
              </Grid>}
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.opc}
                  onChange={onChange}
                  id="opc"
                  label="OPc"
                >Operator key</InputField>
              </Grid>}
              <Grid item xs={3}>
                <InputField
                  value={state.iccid}
                  onChange={onChange}
                  id="iccid"
                  label="ICCID"
                >ICCID</InputField>
              </Grid>
              <Grid item xs={2}>
                <SelectField
                  value={state.esim}
                  onChange={onChange}
                  id="esim"
                  label="eSIM"
                  helper="Is this a eSIM?"
                >
                  <MenuItem value={true}>{i18n.t('generic.yes')}</MenuItem>
                  <MenuItem value={false}>{i18n.t('generic.no')}</MenuItem>
                </SelectField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.sim_vendor}
                  onChange={onChange}
                  id="sim_vendor"
                  label="Vendor"
                >SIM Vendor</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.batch_name}
                  onChange={onChange}
                  id="batch_name"
                  label="Batch"
                >Batch name</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.amf}
                  onChange={onChange}
                  id="amf"
                  label="AMF"
                >Access and Mobility Management Function</InputField>
              </Grid>
              {state.esim === true && <Grid item xs={5}>
                <InputField
                  value={state.lpa}
                  onChange={onChange}
                  id="lpa"
                  label="LPA"
                >LPA URL for activating eSIM</InputField>
              </Grid>}
              <Grid item xs={12}><h3>User info</h3></Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.pin1}
                  onChange={onChange}
                  id="pin1"
                  label="PIN 1"
                >User PIN 1</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.puk1}
                  onChange={onChange}
                  id="puk1"
                  label="PUK 1"
                >User PUK 1</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.pin2}
                  onChange={onChange}
                  id="pin2"
                  label="PIN 2"
                >User PIN 2</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.puk2}
                  onChange={onChange}
                  id="puk2"
                  label="PUK 2"
                >User PUK 2</InputField>
              </Grid>
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.kid}
                  onChange={onChange}
                  id="kid"
                  label="KID"
                >KID</InputField>
              </Grid>}
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.psk}
                  onChange={onChange}
                  id="psk"
                  label="PSK"
                >PSK</InputField>
              </Grid>}
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.des}
                  onChange={onChange}
                  id="des"
                  label="DES"
                >DES</InputField>
              </Grid>}
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.adm1}
                  onChange={onChange}
                  id="adm1"
                  label="ADM1"
                >ADM1</InputField>
              </Grid>}
              <Grid item xs={12}><h3>Misc</h3></Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.misc1}
                  onChange={onChange}
                  id="misc1"
                  label="misc1"
                >misc1</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.misc2}
                  onChange={onChange}
                  id="misc2"
                  label="misc2"
                >misc2</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.misc3}
                  onChange={onChange}
                  id="misc3"
                  label="misc3"
                >misc3</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.misc4}
                  onChange={onChange}
                  id="misc4"
                  label="misc4"
                >misc4</InputField>
              </Grid>
            </Grid>
    </React.Fragment>
  );
}

export default AucAddItem;
