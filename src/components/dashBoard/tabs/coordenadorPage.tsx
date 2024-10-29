import * as React from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import { Box, CircularProgress, useTheme, useMediaQuery, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { projectClassificationCount } from "../../../type/projectClassificationCount";
import { links } from "../../../api/api";
import { projectMonthCount } from "../../../type/projectMonthCount";
import { projectStatusCount } from "../../../type/projectStatusCount";

export default function SimpleCharts() {
  const [countByClassification, setCountByClassification] = useState<projectClassificationCount | null>(null);
  const [countByMonth, setCountByMonth] = useState<projectMonthCount | null>(null);
  const [countByStatus, setCountByStatus] = useState<projectStatusCount | null>(null);
  const [coordenadores, setCoordenadores] = useState<string[]>([]);
  const [textoCoordenadores, setTextoCoordenadores] = useState('');
  const [exibirDropdownCoordenadores, setExibirDropdownCoordenadores] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchData = async () => {
    setLoading(true); 
    
    try {
      const countClassification = await links.getCountClassificationCoordinator(textoCoordenadores);
      const countMonth = await links.getCountMonthCoordinator(textoCoordenadores);
      const countStatus = await links.getCountStatusCoordinator(textoCoordenadores);
      const responseCoordinators = await links.getCoordinators();

      setCountByClassification(countClassification.data);
      setCountByMonth(countMonth.data);
      setCountByStatus(countStatus.data);
      setCoordenadores(responseCoordinators.data.model);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const filtrarOpcoesCoordenadores = coordenadores.filter(opcao =>
    opcao.toLowerCase().includes(textoCoordenadores.toLowerCase())
  );

  return (
    <>
      <div className="pesquisa-container">
        <label htmlFor="coordenador">Coordenador</label>
        <input
          type="text"
          value={textoCoordenadores}
          onChange={(e) => setTextoCoordenadores(e.target.value)}
          onFocus={() => setExibirDropdownCoordenadores(true)}
          onBlur={() => setTimeout(() => setExibirDropdownCoordenadores(false), 200)}
          placeholder="Pesquise..."
        />
        {exibirDropdownCoordenadores && textoCoordenadores && (
          <ul className="dropdown">
            {filtrarOpcoesCoordenadores.map((opcao, index) => (
              <li key={index} onMouseDown={() => setTextoCoordenadores(opcao)}>
                {opcao}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <Button variant="contained" color="primary" onClick={fetchData} style={{ marginTop: '10px' }}>
        Buscar
      </Button>

      <Box padding={smDown ? 0 : 4} margin={smDown ? 0 : 2} display="flex" flexDirection="row">
        {countByClassification && (
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: Object.keys(countByClassification),
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: Object.values(countByClassification),
              },
            ]}
            width={500}
            height={300}
            colors={["#003383"]}
          />
        )}

        {countByStatus && (
          <PieChart
            series={[
              {
                data: Object.entries(countByStatus).map(([status, value]) => ({
                    label: status.toUpperCase(),
                  value: Number(value),
                })),
                highlightScope: { fade: "global", highlight: "item" },
                faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              },
            ]}
            height={250}
            colors={["#003383", "#F0CE00", "#2299AA"]}
          />
        )}
      </Box>

      <Box padding={smDown ? 0 : 4} margin={smDown ? 0 : 2} display="flex" justifyContent="center">
        {countByMonth && (
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: Object.keys(countByMonth),
              },
            ]}
            series={[
              {
                data: Object.values(countByMonth),
              },
            ]}
            width={500}
            height={300}
            colors={["#003383"]}
          />
        )}
      </Box>
    </>
  );
}
