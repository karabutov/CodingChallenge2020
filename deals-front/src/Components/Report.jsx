import React, {useState, useEffect} from 'react';
import BarChart from 'react-easy-bar-chart';
import axios from 'axios';
import { environment } from '../utils';

const Report = () =>{
    const [reportData, setReportData] = useState([{
        title: 0,
        value: 1,
        color: "white",
      },]);

    useEffect(() => {
        getReportData();
    }, []);

    const getReportData = async () => {
        try {
            const res = await axios.get(environment.url + "/getRealizedProfitLoss");
        let reportDataArr = await res.data.map((item) => {
            return{
                title: item.cpty,
                value: item.realized,
                color: "#196f3d"
            }
        });

            setReportData(reportDataArr);
          } catch (e) {
        }
        
    };

    return(
        <BarChart 
          xAxis='React Bar Chart'
          yAxis="Values"
          height={400}
          width={800}
          data={reportData}
        />
    );
}

export default Report;