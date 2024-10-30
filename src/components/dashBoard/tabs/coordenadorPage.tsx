import * as React from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import { Box, CircularProgress, useTheme, useMediaQuery, Button, Typography } from "@mui/material";
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
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchData();
  }, []);

  const handleDataInicialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataInicial(event.target.value);
  };

  const handleDataFinalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataFinal(event.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [countClassification, countMonth, countStatus, responseCoordinators] = await Promise.all([
        links.getCountClassificationCoordinator(textoCoordenadores, dataInicial, dataFinal),
        links.getCountMonthCoordinator(textoCoordenadores, dataInicial, dataFinal),
        links.getCountStatusCoordinator(textoCoordenadores, dataInicial, dataFinal),
        links.getCoordinators()
      ]);

      setCountByClassification(countClassification.data);
      setCountByMonth(countMonth.data);
      setCountByStatus(countStatus.data);
      setCoordenadores(responseCoordinators.data.model);
      
    } catch (error) {
      console.error(error);
      setError("Erro ao buscar os dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuscarClick = () => {
    setIsFiltered(false); 
    if (dataInicial && !dataFinal) {
      setError("Se uma data inicial for fornecida, uma data final também deve ser informada.");
      return;
    }
    if (dataInicial && dataFinal && dataInicial > dataFinal) {
      setError("A data inicial não pode ser maior que a data final.");
      return;
    }

    setCountByClassification(null);
    setCountByMonth(null);
    setCountByStatus(null);
    fetchData();
    setIsFiltered(true); 
  };

  const filtrarOpcoesCoordenadores = coordenadores.filter(opcao =>
    opcao.toLowerCase().includes(textoCoordenadores.toLowerCase())
  );

  function filterMonthData(data: { [key: string]: number }, startMonth: number, endMonth: number) {
    const months = [
        "janeiro", "fevereiro", "marco", "abril", "maio", "junho", 
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    const filteredData: { [key: string]: number } = {};

    if (startMonth <= endMonth) {
        for (let i = startMonth; i <= endMonth; i++) {
            const month = months[i];
            filteredData[month] = data[month] || 0;
        }
    }else {
        for (let i = startMonth; i < months.length; i++) {
            const month = months[i];
            filteredData[month] = data[month] || 0; 
        }
    }
    return filteredData;
}

const filteredCountByMonth = () => {
    if (!isFiltered || !countByMonth) {
        return countByMonth; 
    }

    if (dataInicial && dataFinal) {
        const startDate = new Date(dataInicial);
        const endDate = new Date(dataFinal);
        startDate.setDate(startDate.getDate()+1)
        endDate.setDate(endDate.getDate() + 1);

        const startYear = startDate.getFullYear();
        const endYear = endDate.getFullYear();

        let startMonth = 0
        let endMonth = 11

        if (startYear === endYear) {
            startMonth = startDate.getMonth();
            endMonth = endDate.getMonth(); 
        } 

        const result = filterMonthData(countByMonth, startMonth, endMonth);
        console.log("startMonth:", startMonth, "endMonth:", endMonth);
        console.log("startDate:", startDate);
        console.log("endDate:", endDate);
        return result;
    }

    return countByMonth; 
};


  if (loading) {
    return <CircularProgress />;
  }

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

      <div>
        <label htmlFor="dataInicial">Data Inicial:</label>
        <input
          type="month"
          id="dataInicial"
          value={dataInicial}
          onChange={handleDataInicialChange}
        />

        <label htmlFor="dataFinal">Data Final:</label>
        <input
          type="month"
          id="dataFinal"
          value={dataFinal}
          onChange={handleDataFinalChange}
        />
      </div>

      {error && <Typography color="error">{error}</Typography>}
      
      <Button variant="contained" color="primary" onClick={handleBuscarClick} style={{ marginTop: '10px' }}>
        Buscar
      </Button>

      <Box display="flex" justifyContent="center" flexDirection={"column"} gap={1}>
        <Box padding={smDown ? 0 : 6} margin={smDown ? 0 : 6} display="flex" flex={"row"} justifyContent={"space-between"} width={"100%"}>
          {countByClassification && (
            <BarChart
              xAxis={[{ id: "barCategories", data: Object.keys(countByClassification), scaleType: "band" }]}
              series={[{ data: Object.values(countByClassification) }]}
              width={700}
              height={300}
              colors={["#F0CE00"]}
            />
          )}

          {countByStatus && (
            <PieChart
              series={[{
                data: Object.entries(countByStatus).map(([status, value]) => ({
                  label: status,
                  value: Number(value),
                })),
                highlightScope: { fade: "global", highlight: "item" },
                faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              }]}
              width={700}
              height={200}
              colors={["#003383", "#F0CE00", "#2299AA"]}
            />
          )}
        </Box> 
      </Box>
      
      <Box padding={smDown ? 0 : 5} margin={smDown ? 0 : 2} display="flex" justifyContent="center">
        {countByMonth && (
          <BarChart
            xAxis={[{
              scaleType: "band",
              data: Object.keys(filteredCountByMonth() || {}),
            }]}
            series={[{
              data: Object.values(filteredCountByMonth() || {})
            }]}
            height={300}
            colors={["#003383"]}
          />
        )}
      </Box>
    </>
  );
}
