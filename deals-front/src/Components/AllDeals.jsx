import React, { useState, useEffect } from 'react';
import Deal from './Deal';
import {environment} from '../utils';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from'@material-ui/core';
import { useObservable } from 'rxjs-hooks';
import { Observable } from 'rxjs';
import {useHistory} from 'react-router-dom';
import { map, withLatestFrom } from 'rxjs/operators';

const AllDeals = props =>{
    const [deals, setDeals] = useState([]);
    const history = useHistory();
    const dealsArr = [];
    const dealsObservable = Observable.create(observer => {
        const source = new EventSource(environment.url + "/deals");
            source.addEventListener("message", (deal) => {
              observer.next(deal.data);
        }, false);
    });
    dealsObservable.subscribe({
        next: val => {
            dealsArr.unshift(JSON.parse(val));
            setDeals(dealsArr);
            if (dealsArr.length >= 50) {
                dealsArr.pop();
            }
        },
        error: err => console.error('something wrong occurred: ' + err)
    });
    const getDeals = async () => {
        try {
          const res = await axios.get(environment.url2 + "/getTopDeals");
          let dealsArr = await res.data;
          setDeals(dealsArr);
        } catch (e) {
        }
    };
    let dealsElements = deals.map(currentDeal => (
        <Deal
          deal={currentDeal}
          key={currentDeal.time}
        />
    ));

    const redirectToReport = () =>{
        history.push("/report");
        history.go(0);
    }

    return(
        <>
            {/* <Button onClick={getDeals}> Refresh</Button> */}
            <Button onClick={redirectToReport}> Report</Button>
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