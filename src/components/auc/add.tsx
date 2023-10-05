import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import i18n from '@app/utils/i18n';
import {InputField, SelectField} from '@components';


const AucAddItem = (props: { onChange: ReturnType<typeof any>, state: ReturnType<typeof any>, forceKeys: ReturnType<typeof Boolean>, edit: ReturnType<typeof Boolean> }) => {

  const { onChange, state, forceKeys, edit } = props;
  const [errors, setErrors ] = React.useState({'imsi':''})

  const setError = (name,value) => {
    setErrors(prevState => ({
        ...prevState,
        [name]: value
    }));
  }

  const onValidate = (field) => {
    if (field==='imsi' && state.imsi.length < 15)
      setError('imsi','To short!');
    else if (field==='imsi')
      setError('imsi','');

    if (field==='ki' && state.ki === '' && (!edit || forceKeys))
      setError('ki','To short!');
    else if (field==='ki')
      setError('ki','');
  }

  const onChangeLocal = (e) => {
    onValidate(e.target.name);
    onChange(e);
  }

  return (
    <React.Fragment>
            <Grid container spacing={1} rowSpacing={1}>
              <Grid item xs={3}>
                <InputField
                  value={state.imsi}
                  onChange={onChangeLocal}
                  id="imsi"
                  label="IMSI"
                  error={errors.imsi}
                  required
                >{i18n.t('inputFields.desc.imsi')}</InputField>
              </Grid>
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.ki}
                  onChange={onChangeLocal}
                  id="ki"
                  label="Ki"
                  required
                >{i18n.t('inputFields.desc.ki')}</InputField>
              </Grid>}
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  required
                  value={state.opc}
                  onChange={onChangeLocal}
                  id="opc"
                  label="OPc"
                >{i18n.t('inputFields.desc.opc')}</InputField>
              </Grid>}
              <Grid item xs={3}>
                <InputField
                  value={state.iccid}
                  onChange={onChangeLocal}
                  id="iccid"
                  label="ICCID"
                >{i18n.t('inputFields.desc.iccid')}</InputField>
              </Grid>
              <Grid item xs={2}>
                <SelectField
                  value={state.esim}
                  onChange={onChangeLocal}
                  id="esim"
                  label="eSIM"
                  helper={i18n.t('inputFields.desc.esim')}
                >
                  <MenuItem value={true}>{i18n.t('generic.yes')}</MenuItem>
                  <MenuItem value={false}>{i18n.t('generic.no')}</MenuItem>
                </SelectField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.sim_vendor}
                  onChange={onChangeLocal}
                  id="sim_vendor"
                  label="Vendor"
                >{i18n.t('inputFields.desc.sim_vendor')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.batch_name}
                  onChange={onChangeLocal}
                  id="batch_name"
                  label="Batch"
                >Batch name</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.amf}
                  onChange={onChangeLocal}
                  id="amf"
                  label="AMF"
                >{i18n.t('inputFields.desc.amf')}</InputField>
              </Grid>
              {state.esim === true && <Grid item xs={5}>
                <InputField
                  value={state.lpa}
                  onChange={onChangeLocal}
                  id="lpa"
                  label="LPA"
                >{i18n.t('inputFields.desc.lpa')}</InputField>
              </Grid>}
              <Grid item xs={12}><h3>User info</h3></Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.pin1}
                  onChange={onChangeLocal}
                  id="pin1"
                  label="PIN 1"
                >{i18n.t('inputFields.desc.pin1')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.puk1}
                  onChange={onChangeLocal}
                  id="puk1"
                  label="PUK 1"
                >{i18n.t('inputFields.desc.puk1')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.pin2}
                  onChange={onChangeLocal}
                  id="pin2"
                  label="PIN 2"
                >{i18n.t('inputFields.desc.pin2')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.puk2}
                  onChange={onChangeLocal}
                  id="puk2"
                  label="PUK 2"
                >{i18n.t('inputFields.desc.puk2')}</InputField>
              </Grid>
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.kid}
                  onChange={onChangeLocal}
                  id="kid"
                  label="KID"
                >{i18n.t('inputFields.desc.kid')}</InputField>
              </Grid>}
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.psk}
                  onChange={onChangeLocal}
                  id="psk"
                  label="PSK"
                >{i18n.t('inputFields.desc.psk')}</InputField>
              </Grid>}
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.des}
                  onChange={onChangeLocal}
                  id="des"
                  label="DES"
                >{i18n.t('inputFields.desc.des')}</InputField>
              </Grid>}
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.adm1}
                  onChange={onChangeLocal}
                  id="adm1"
                  label="ADM1"
                >{i18n.t('inputFields.desc.adm1')}</InputField>
              </Grid>}
              <Grid item xs={12}><h3>Misc</h3></Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.misc1}
                  onChange={onChangeLocal}
                  id="misc1"
                  label="misc1"
                >{i18n.t('inputFields.desc.misc1')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.misc2}
                  onChange={onChangeLocal}
                  id="misc2"
                  label="misc2"
                >{i18n.t('inputFields.desc.misc2')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.misc3}
                  onChange={onChangeLocal}
                  id="misc3"
                  label="misc3"
                >{i18n.t('inputFields.desc.misc3')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.misc4}
                  onChange={onChangeLocal}
                  id="misc4"
                  label="misc4"
                >{i18n.t('inputFields.desc.misc4')}</InputField>
              </Grid>
            </Grid>
    </React.Fragment>
  );
}

export default AucAddItem;
