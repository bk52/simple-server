import React from 'react';
import formatDate from "../common/formatDate";
import RouterOutlinedIcon from '@material-ui/icons/RouterOutlined';
import DevicesOtherOutlinedIcon from '@material-ui/icons/DevicesOtherOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CancelIcon from '@material-ui/icons/Cancel';



export function DateCell({ value }) {
    let dt = formatDate(value);
    return <div>
        <div>{dt[0]}</div>
        <div>{dt[1]}</div>
    </div>
}

export function DeviceType({ value }) {
    let deviceIcon = "";
    if (value == 1) { deviceIcon = <RouterOutlinedIcon /> }
    else if (value == 2) { deviceIcon = <DevicesOtherOutlinedIcon /> }
    else { deviceIcon = <HelpOutlineOutlinedIcon /> }
    return deviceIcon;
}

export function LogType({ value }) {
    let deviceIcon = "";
    if (value == 1) { deviceIcon = <CheckCircleIcon style={{ color: "#28A745" }}/> }
    else if (value == 2) { deviceIcon = <InfoIcon style={{ color: "#17A2B8" }}/> }
    else if (value == 3) { deviceIcon = <WarningIcon style={{ color: "#FFC107" }}/> }
    else if (value == 4) { deviceIcon = <CancelIcon style={{ color: "#DC3545" }}/> }
    else { deviceIcon = null }
    return deviceIcon;
}