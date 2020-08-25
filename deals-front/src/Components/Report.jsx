import React, {useState, useEffect} from 'react';
import BarChart from 'react-easy-bar-chart';
import axios from 'axios';
import { environment } from '../utils';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from'@material-ui/core';

const Report = () =>{
    const [reportData, setReportData] = useState([]);
    const history = useHistory();
    useEffect(() => {
        getReportData();
    });

    const getReportData = async () => {
        try {
            const res = await axios.get(environment.url + "/getRealizedProfitLoss");
        /*let reportDataArr = await res.data.map((item) => {
            return{
                title: item.cpty,
                value: item.realized,
                color: "#196f3d"
            }
        });*/
            let reportDataArr = await res.data;
            setReportData(reportDataArr);
          } catch (e) {
        }
        
    };

    let dataElements = reportData.map(currentItem => (
        <TableRow>
            <TableCell scope="row">
                {currentItem.cpty}
            </TableCell>
            <TableCell scope="row">
                {currentItem.realized}
            </TableCell>
        </TableRow>
    ));

    const redirectToDeals = () =>{
        history.push("/deals");
        history.go(0);
    }

    return(
        <>
            <Button onClick={redirectToDeals}> Deals</Button>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Contragent</TableCell>
                            <TableCell>Realized</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{dataElements}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Report;