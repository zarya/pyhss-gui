import React from 'react';


const NetworkBandwidthFormatter = (props: { data: ReturnType<typeof Number> }) => {
  const { data } = props;


  const formatBandwidth = (bandwidth: number) => {
    if (bandwidth >= 1000000) {
      return (bandwidth / 1000000).toFixed(2) + ' Gbps';
    } else if (bandwidth >= 1000) {
      return (bandwidth / 1000).toFixed(2) + ' Mbps';
    } else if (bandwidth >= 1) {
      return bandwidth.toFixed(2) + ' Kbps';
    } else {
      return (bandwidth * 1000).toFixed(2) + ' bps';
    }
  }
  return (
   <span style={{whiteSpace: 'nowrap'}}>{formatBandwidth(data)}</span> 
  )

}

export default NetworkBandwidthFormatter;
