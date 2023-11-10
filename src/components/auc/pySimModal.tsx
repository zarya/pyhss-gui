import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import i18n from '@app/utils/i18n';
import Highlight from 'react-highlight.js';
import {InputField, SelectField} from '@components';
import {ImsSubscriberApi} from "../../services/pyhss";
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -30%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  '@media(max-height: 600px)': {
    top: '0',
    transform: 'translate(-50%, 0%)'
  }
};


const AucPySimModal = (props: { open: boolean, handleClose: any, rows: object }) => {
  const { open, handleClose, rows } = props;
  const [state, setState] = useState({'options':'','mncLength':2,'networkName':'TestCore','smsc':'','dryrun': false});
  const [output, setOutput] = useState([]);
  const [help, setHelp] = useState(false);
  const [ims, setIms] = useState([]);

  React.useEffect(() => {
    ImsSubscriberApi.findManyByImsi(rows.map(a => a.imsi))
    .then(
      axios.spread((...allData) => {
        setIms(allData.filter(a=>a.statusText==="OK").map(a=> a.data));
      })
    )
  }, [rows]);

  const handleLocalClose = () => {
    handleClose();
    setOutput([]);
  }

  const onChange = (name: string, value: string) => {
    setOutput([]);
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const onOutput = (dryrun: boolean) => {
    setOutput(rows.filter(row=>row.adm1 !== '').map((row) => {
      const mcc = String(row.imsi.substring(0,3))
      const mnc = String(row.imsi.substring(3, Number(state.mncLength) + 3))
      return `read -p "Press Enter to start with ${row.imsi}/${row.iccid}"\n` + 
      `./pySim-prog.py` +
      (dryrun ?` --dryrun`:'') +
      ` --mnclen=${mnc.length}` +
      ` -a ${row.adm1} -i ${row.imsi} -s ${row.iccid} -x ${mcc} -y ${mnc} -n ${state.networkName} -k ${row.ki} -o ${row.opc}` + 
      ` --impi=${row.imsi}@ims.mnc${(mnc.length < 3?'0'+mnc:mnc)}.mcc${mcc}.3gppnetwork.org` +
      ` --impu=sip:${row.imsi}@ims.mnc${(mnc.length < 3?'0'+mnc:mnc)}.mcc${mcc}.3gppnetwork.org` +
      ` --pcscf=pcscf.ims.mnc${(mnc.length < 3?'0'+mnc:mnc)}.mcc${mcc}.3gppnetwork.org` + 
      ` --ims-hdomain=ims.mnc${(mnc.length < 3?'0'+mnc:mnc)}.mcc${mcc}.3gppnetwork.org` +
      (ims.find(a => a.imsi === row.imsi)?` --msisdn=${ims.find(a=>a.imsi === row.imsi).msisdn}`:'') +
      (state.smsc !== ''?` -m ${state.smsc}`:'') +
      (state.options !== '' ? ` ${state.options}`:'')
    }));
  }

  return (
    <React.Fragment>
      <Modal
       open={open}
       onClose={handleLocalClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
       sx={{overflowY: 'scroll'}} disableScrollLock={false}
      >
        <Box sx={style}>
          <h3>pySim</h3>
          <Grid container spacing={1} rowSpacing={1}>
            <Grid item xs={1}>
              <Button variant="outlined" onClick={()=>setHelp(!help)}>Option Help</Button>
            </Grid>
            <Grid item xs={3}>
              <InputField
                value={state.options}
                id="options"
                label="Options"
                onChange={onChange}
              >pySim Commandline Options</InputField>
            </Grid>
            <Grid item xs={3}>
              <SelectField
                value={state.mncLength}
                id="mncLength"
                label="MNC Length"
                onChange={onChange}
                helper="Length of MNC field"
              >
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
              </SelectField>
            </Grid>
            <Grid item xs={3}>
              <InputField
                value={state.networkName}
                id="networkName"
                label="Network name"
                onChange={onChange}
              ></InputField>
            </Grid>
            <Grid item xs={3}>
              <InputField
                value={state.smsc}
                id="smsc"
                label="SMSC number"
                onChange={onChange}
              >SMSC number (Start with + for international no.)</InputField>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={()=>onOutput(false)}>Generate</Button>
              <Button onClick={()=>onOutput(true)}>Generate Dry run</Button>
            </Grid>
            {help && (
            <Grid item xs={12}>
              <Highlight className="codePre">{`
  Options:
    -h, --help            show this help message and exit
    -d DEV, --device=DEV  Serial Device for SIM access [default: /dev/ttyUSB0]
    -b BAUD, --baud=BAUD  Baudrate used for SIM access [default: 9600]
    -p PCSC, --pcsc-device=PCSC
                          Which PC/SC reader number for SIM access
    --modem-device=DEV    Serial port of modem for Generic SIM Access (3GPP TS
                          27.007)
    --modem-baud=BAUD     Baudrate used for modem's port [default: 115200]
    --osmocon=PATH        Socket path for Calypso (e.g. Motorola C1XX) based
                          reader (via OsmocomBB)
    -t TYPE, --type=TYPE  Card type (user -t list to view) [default: auto]
    -T, --probe           Determine card type
    -a PIN_ADM, --pin-adm=PIN_ADM
                          ADM PIN used for provisioning (overwrites default)
    -A PIN_ADM_HEX, --pin-adm-hex=PIN_ADM_HEX
                          ADM PIN used for provisioning, as hex string (16
                          characters long
    -e, --erase           Erase beforehand [default: False]
    -S SOURCE, --source=SOURCE
                          Data Source[default: cmdline]
    -n NAME, --name=NAME  Operator name [default: Magic]
    -c CC, --country=CC   Country code [default: 1]
    -x MCC, --mcc=MCC     Mobile Country Code [default: 901]
    -y MNC, --mnc=MNC     Mobile Network Code [default: 55]
    --mnclen=MNCLEN       Length of Mobile Network Code [default: 2]
    -m SMSC, --smsc=SMSC  SMSC number (Start with + for international no.)
                          [default: '00 + country code + 5555']
    -M SMSP, --smsp=SMSP  Raw SMSP content in hex [default: auto from SMSC]
    -s ID, --iccid=ID     Integrated Circuit Card ID
    -i IMSI, --imsi=IMSI  International Mobile Subscriber Identity
    --msisdn=MSISDN       Mobile Subscriber Integrated Services Digital Number
    -k KI, --ki=KI        Ki (default is to randomize)
    -o OPC, --opc=OPC     OPC (default is to randomize)
    --op=OP               Set OP to derive OPC from OP and KI
    --acc=ACC             Set ACC bits (Access Control Code). not all card types
                          are supported
    --opmode=OPMODE       Set UE Operation Mode in EF.AD (Administrative Data)
    --epdgid=EPDGID       Set Home Evolved Packet Data Gateway (ePDG)
                          Identifier. (Only FQDN format supported)
    --epdgSelection=EPDGSELECTION
                          Set PLMN for ePDG Selection Information. (Only
                          Operator Identifier FQDN format supported)
    --pcscf=PCSCF         Set Proxy Call Session Control Function (P-CSCF)
                          Address. (Only FQDN format supported)
    --ims-hdomain=IMS_HDOMAIN
                          Set IMS Home Network Domain Name in FQDN format
    --impi=IMPI           Set IMS private user identity
    --impu=IMPU           Set IMS public user identity
    --read-imsi           Read the IMSI from the CARD
    --read-iccid          Read the ICCID from the CARD
    -z STR, --secret=STR  Secret used for ICCID/IMSI autogen
    -j NUM, --num=NUM     Card # used for ICCID/IMSI autogen
    --batch               Enable batch mode [default: False]
    --batch-state=FILE    Optional batch state file
    --read-csv=FILE       Read parameters from CSV file rather than command line
    --write-csv=FILE      Append generated parameters in CSV file
    --write-hlr=FILE      Append generated parameters to OpenBSC HLR sqlite3
    --dry-run             Perform a 'dry run', don't actually program the card
    --card_handler=FILE   Use automatic card handling machine
              `}
              </Highlight>
            </Grid>)}
            <Grid item xs={12}>
              <h4>Output</h4>
            </Grid>
            <Grid item xs={12}>
              <Highlight language="bash" className="codePre">
                {output.join('\n')}
              </Highlight>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default AucPySimModal;
