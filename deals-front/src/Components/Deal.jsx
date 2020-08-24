import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const Deal = props =>{
    return(
        <TableRow>
            <TableCell scope="row">
                {props.deal.instrumentName}
            </TableCell>
            <TableCell scope="row">
                {props.deal.cpty}
            </TableCell>
            <TableCell scope="row">
                {props.deal.price}
            </TableCell>
            <TableCell scope="row">
                {props.deal.type}
            </TableCell>
            <TableCell scope="row">
                {props.deal.quantity}
            </TableCell>
            <TableCell scope="row">
                {props.deal.time}
            </TableCell>
        </TableRow>
    );
}
export default Deal;