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
import {InputField, SelectField, SaveButtons} from '@components';

import CryptoJS from 'crypto-js';

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
  const [forceKeys, setForceKeys] = React.useState(false);

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

  const hexToBytes = (hex: string) => {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.slice(c, c+2), 16));
    return bytes;
  }
  const bytesToHex = (bytes: Uint8Array) => {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xF).toString(16));
    }
    return hex.join("");
  }

  const handleOPGenerate = (ki: string, op: string) => {
    const opBytes = CryptoJS.enc.Hex.parse(op);
    const kiBytes = CryptoJS.enc.Hex.parse(ki);
    const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
    var ciphertext = CryptoJS.AES.encrypt(opBytes, kiBytes, { iv: iv });

    const encryptedOp = hexToBytes(ciphertext.ciphertext.toString());
    const preOp = hexToBytes(op);
    const opc = new Uint8Array(preOp.length);
    for (let i = 0; i < preOp.length; i++) {
        opc[i] = encryptedOp[i] ^ preOp[i];
    }
    return bytesToHex(opc);
  }

  const handleForceKeys = () => {
    setForceKeys(true);
  }

  const handleSave = () => {
    if (edit) {
      const aucSaveTemplate = {
        "amf": state.amf,
        "iccid": state.iccid,
        "imsi": state.imsi,
        "batch_name": state.batch_name,
        "sim_vendor": state.sim_vendor,
        "esim": state.esim,
        "lpa": state.lpa,
        "pin1": state.pin1,
        "pin2": state.pin2,
        "puk1": state.puk1,
        "puk2": state.puk2,
        "misc1": state.misc1,
        "misc2": state.misc2,
        "misc3": state.misc3,
        "misc4": state.misc4 
      }
      if (!forceKeys)
        AucApi.update(data.auc_id, aucSaveTemplate).then((data) => {
          handleLocalClose();
        })
      else
        AucApi.update(data.auc_id, state).then((data) => {
          handleLocalClose();
        })
    }else{
      AucApi.create(state).then((data) => {
        handleLocalClose();
      })
    }
  }

  const handleLocalClose = () => {
    setForceKeys(false);
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
          <Button variant="contained" onClick={() => console.log(handleOPGenerate("780E6AC95A2E43449C15BDCDD0450982","D7DECB1F50404CC29ECBF989FE73AFC5"))}>test</Button>
          <h3>{(edit?'Edit':'Add')}</h3>
          {edit && !forceKeys && <Button onClick={handleForceKeys}>Set Keys</Button>}
          <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={1} rowSpacing={1}>
              <Grid item xs={3}>
                <InputField
                  value={state.imsi}
                  onChange={handleChange}
                  id="imsi"
                  label="IMSI"
                >International mobile subscriber identity</InputField>
              </Grid>
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.ki}
                  onChange={handleChange}
                  id="ki"
                  label="Ki"
                >Secret</InputField>
              </Grid>}
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.opc}
                  onChange={handleChange}
                  id="opc"
                  label="OPc"
                >Operator key</InputField>
              </Grid>}
              <Grid item xs={3}>
                <InputField
                  value={state.iccid}
                  onChange={handleChange}
                  id="iccid"
                  label="ICCID"
                >ICCID</InputField>
              </Grid>
              <Grid item xs={2}>
                <SelectField
                  value={state.esim}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  id="sim_vendor"
                  label="Vendor"
                >SIM Vendor</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.batch_name}
                  onChange={handleChange}
                  id="batch_name"
                  label="Batch"
                >Batch name</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.amf}
                  onChange={handleChange}
                  id="amf"
                  label="AMF"
                >Access and Mobility Management Function</InputField>
              </Grid>
              {state.esim === true && <Grid item xs={5}>
                <InputField
                  value={state.lpa}
                  onChange={handleChange}
                  id="lpa"
                  label="LPA"
                >LPA URL for activating eSIM</InputField>
              </Grid>}
              <Grid item xs={12}><h3>User info</h3></Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.pin1}
                  onChange={handleChange}
                  id="pin1"
                  label="PIN 1"
                >User PIN 1</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.puk1}
                  onChange={handleChange}
                  id="puk1"
                  label="PUK 1"
                >User PUK 1</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.pin2}
                  onChange={handleChange}
                  id="pin2"
                  label="PIN 2"
                >User PIN 2</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.puk2}
                  onChange={handleChange}
                  id="puk2"
                  label="PUK 2"
                >User PUK 2</InputField>
              </Grid>
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.kid}
                  onChange={handleChange}
                  id="kid"
                  label="KID"
                >KID</InputField>
              </Grid>}
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.psk}
                  onChange={handleChange}
                  id="psk"
                  label="PSK"
                >PSK</InputField>
              </Grid>}
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.des}
                  onChange={handleChange}
                  id="des"
                  label="DES"
                >DES</InputField>
              </Grid>}
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.adm1}
                  onChange={handleChange}
                  id="adm1"
                  label="ADM1"
                >ADM1</InputField>
              </Grid>}
              <Grid item xs={12}><h3>Misc</h3></Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.misc1}
                  onChange={handleChange}
                  id="misc1"
                  label="misc1"
                >misc1</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.misc2}
                  onChange={handleChange}
                  id="misc2"
                  label="misc2"
                >misc2</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.misc3}
                  onChange={handleChange}
                  id="misc3"
                  label="misc3"
                >misc3</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.misc4}
                  onChange={handleChange}
                  id="misc4"
                  label="misc4"
                >misc4</InputField>
              </Grid>
            </Grid>
          </Box>
          <SaveButtons onClickClose={handleLocalClose} onClickSave={handleSave} />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default AucAdditem;
