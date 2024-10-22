import * as React from 'react';
import { BarChart, } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts';
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { desktopOS, valueFormatter } from './webUsageStats';



export default function SimpleCharts() {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));
    const mdDown = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
        <Box padding={smDown ? 0 : 4} margin={smDown ? 0 : 2} display="flex" flexDirection="row">
            <BarChart
                xAxis={[
                    {
                        id: 'barCategories',
                        data: ['bar A', 'bar B', 'bar C'],
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: [2, 5, 3],
                    },
                ]}
                width={500}
                height={300}
            />
            <BarChart
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                width={500}
                height={300}
                colors={["#FF2323", "#AAAA22", "#2299AA"]} />
                

           
        </Box>
            
        <Box padding={smDown ? 0 : 4} margin={smDown ? 0 : 2} display="flex" justifyContent="center">
                <PieChart
                     series={[
                        {
                          data: desktopOS,
                          highlightScope: { fade: 'global', highlight: 'item' },
                          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                          valueFormatter,
                        },
                      ]}
                      height={250} />
            </Box>
        </>
    );
}