import * as React from 'react';
import { BarChart, } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts';
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { desktopOS, valueFormatter } from './webUsageStats';
import { useEffect, useState } from 'react';



export default function SimpleCharts() {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));
    const mdDown = useMediaQuery(theme.breakpoints.down("md"));
    // const [desktopOS, setDesktopOS] = useState<[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('');
    //             if (!response.ok) {
    //                 throw new Error('Erro ao buscar dados');
    //             }
    //             const data = await response.json();
    //             setDesktopOS(data);
    //         } catch (error: unknown) {
    //             if (error instanceof Error) {
    //                 setError(error.message);
    //             } else {
    //                 setError('Erro desconhecido');
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    
    //     fetchData();
    // }, []);

    // if (loading) return <div>Carregando...</div>;
    // if (error) return <div>Erro: {error}</div>;

    return (
        <>
        <Box padding={smDown ? 0 : 4} margin={smDown ? 0 : 2} display="flex" flexDirection="row">
            <BarChart
                xAxis={[
                    {
                        id: 'barCategories',
                        data: ['Empresa A', 'Empresa B', 'Empresa C'],
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
                colors={["#003383"]}
            />
            <BarChart
                xAxis={[{ scaleType: 'band', data: ['Empresa A', 'Empresa B', 'Empresa C'] }]}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                width={500}
                height={300}
                colors={["#003383", "#F0CE00", "#2299AA"]} />
                

           
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
                      height={250}
                      colors={["#003383","#F0CE00"]} />
            </Box>
        </>
    );
}