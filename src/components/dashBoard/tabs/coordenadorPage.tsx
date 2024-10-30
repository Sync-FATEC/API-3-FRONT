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
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

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
      const countClassification = await links.getCountClassificationCoordinator(textoCoordenadores, dataInicial, dataFinal);
      const countMonth = await links.getCountMonthCoordinator(textoCoordenadores, dataInicial, dataFinal);
      const countStatus = await links.getCountStatusCoordinator(textoCoordenadores, dataInicial, dataFinal);
      const responseCoordinators = await links.getCoordinators();

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
    if (dataInicial && dataFinal && dataInicial > dataFinal) {
      setError("A data inicial não pode ser maior que a data final.");
      return;
    }
    setCountByClassification(null)
    setCountByMonth(null)
    setCountByStatus(null)
    fetchData();
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

  function filterMoth(
    dados: { [key: string]: number },
    mesInicial: string,
    mesFinal: string
  ): { [key: string]: number } {
    const meses = Object.keys(dados);
    const novoObjeto: { [key: string]: number } = {};
  
    const indiceInicial = meses.indexOf(mesInicial);
    const indiceFinal = meses.indexOf(mesFinal);

    if (indiceInicial === -1 || indiceFinal === -1 || indiceInicial > indiceFinal) {
      return novoObjeto;
    }
  
    for (let i = indiceInicial; i <= indiceFinal; i++) {
      const mes = meses[i];
      novoObjeto[mes] = dados[mes] || 0;
    }
  
    return novoObjeto;
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

      {error && <Typography color="error">{error}</Typography>} {/* Mostra a mensagem de erro se houver */}
      
      <Button variant="contained" color="primary" onClick={handleBuscarClick} style={{ marginTop: '10px' }}>
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
                data: Object.keys(filterMoth(countByMonth, new Date(dataInicial).getMonth().toString(), new Date(dataFinal).getMonth().toString())),
              },
            ]}
            series={[
              {
                data: Object.values(filterMoth(countByMonth, new Date(dataInicial).getMonth().toString(), new Date(dataFinal).getMonth().toString()))
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
