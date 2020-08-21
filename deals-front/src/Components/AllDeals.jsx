import React from 'react';
import Deal from './Deal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const AllDeals = props =>{
    let deals = props.deals.map(currentDeal => (
        <Deal
          deal={currentDeal}
          key={currentDeal.instrumentName}
        />
    ));
    return(
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Instrument Name</TableCell>
                        <TableCell>Contragent</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{deals}</TableBody>
            </Table>
        </TableContainer>
    );
}

export default AllDeals;