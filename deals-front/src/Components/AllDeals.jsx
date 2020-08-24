import React, { useState, useEffect } from 'react';
import Deal from './Deal';
import {environment} from '../utils';
import axios from 'axios';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from'@material-ui/core';

const AllDeals = props =>{
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        getDeals();
    }, []);

    const getDeals = async () => {
        try {
          const res = await axios.get(environment.url + "/getTopDeals");
          let dealsArr = await res.data;
          setDeals(dealsArr);
        } catch (e) {
        }
    };
    let dealsElements = deals.map(currentDeal => (
        <Deal
          deal={currentDeal}
          key={currentDeal.instrumentName}
        />
    ));
    return(
        <>
            <Button onClick={getDeals}> Refresh</Button>
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
                    <TableBody>{dealsElements}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default AllDeals;