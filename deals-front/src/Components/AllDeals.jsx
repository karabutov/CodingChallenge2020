import React, { useState, useEffect } from 'react';
import Deal from './Deal';
import {environment} from '../utils';
import axios from 'axios';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from'@material-ui/core';

const AllDeals = props =>{
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        getDeals();
    }, []);

    const getDeals = async () => {
        try {
          const res = await axios.get(environment.url + "/client/testservice");
          const deals = [];
          let newDeal = await res.data;
          deals.push(newDeal);
          setDeals(deals);
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
    );
}

export default AllDeals;