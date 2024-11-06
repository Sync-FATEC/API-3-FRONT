import * as React from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import { Box, CircularProgress, useTheme, useMediaQuery, Button, Typography } from "@mui/material";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { projectClassificationCount } from "../../../type/projectClassificationCount";
import { links } from "../../../api/api";
import { projectMonthCount } from "../../../type/projectMonthCount";
import { projectStatusCount } from "../../../type/projectStatusCount";
import { projectInvestment } from "../../../type/projectInvestment"; 
import "../dashBoard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function EmpresaPage() {
  const [countByClassification, setCountByClassification] = useState<projectClassificationCount | null>(null);
  const [countByMonth, setCountByMonth] = useState<projectMonthCount | null>(null);
  const [countByStatus, setCountByStatus] = useState<projectStatusCount | null>(null);
  const [investmentByCompany, setInvestmentByCompany] = useState<projectInvestment | null>(null);
  const [companies, setCompanies] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [textoEmpresas, setTextoEmpresas] = useState('');
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exibirDropdownEmpresas, setExibirDropdownEmpresas] = useState(false);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

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

    try {
       const [countClassification, countMonth, countStatus, investmentData, responseCompanies] = await Promise.all([
        links.getCountClassificationCompany(selectedCompany, dataInicial, dataFinal),
        links.getCountMonthCompany(selectedCompany, dataInicial, dataFinal),
        links.getCountStatusCompany(selectedCompany, dataInicial, dataFinal),
        links.getInvestmentCompany(selectedCompany, dataInicial, dataFinal),
        links.getCompanies()
     ]);


      setCountByClassification(countClassification.data);
      setCountByMonth(countMonth.data);
      setCountByStatus(countStatus.data);
      setInvestmentByCompany(investmentData.data);
      setCompanies(responseCompanies.data.model);
    } catch (error) {
      console.error("Erro ao buscar os dados da empresa", error);
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
    setInvestmentByCompany(null);
    fetchData();
    setIsFiltered(true);
  };

  const filtrarOpcoesEmpresas = companies.filter(company =>
    company.toLowerCase().includes(textoEmpresas.toLowerCase())
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
    } else if (startMonth > endMonth) {
      for (let i = startMonth; i < months.length; i++) {
        const month = months[i];
        filteredData[month] = data[month] || 0;
      }
      for (let i = 0; i <= endMonth; i++) {
        const month = months[i];
        filteredData[month] = data[month] || 0;
      }
    }
    else {
      for (let i = startMonth; i < months.length; i++) {
        const month = months[i];
        filteredData[month] = data[month] || 0;
      }
    }
    return filteredData;
  }

  const formatTitleFromMapping = (title: string): string => {
    const titleMapping: Record<string, string> = {
      "outros": "Outros",
      "contratos": "Contratos",
      "convenio": "Convênio",
      "patrocinio": "Patrocínio",
      "termoDeCooperacao": "Termo De Cooperação",
      "termoDeOutorga": "Termo De Outorga"
    };
    return titleMapping[title] || title;
  };
  const formatClassificationLabel = (label: string): string => {
    const mapping: Record<string, string> = {
      "naoIniciados": "Não Iniciados",
      "emAndamento": "Em Andamento",
      "finalizados": "Finalizados"
    };
    return mapping[label] || label;
  };

  const formatMonthFromMapping = (month: string): string => {
    const monthMapping: Record<string, string> = {
      "janeiro": "Janeiro",
      "fevereiro": "Fevereiro",
      "marco": "Março",
      "abril": "Abril",
      "maio": "Maio",
      "junho": "Junho",
      "julho": "Julho",
      "agosto": "Agosto",
      "setembro": "Setembro",
      "outubro": "Outubro",
      "novembro": "Novembro",
      "dezembro": "Dezembro"
    };
    return monthMapping[month.toLowerCase()] || month;
  };

  const filteredCountByMonth = () => {
    if (!isFiltered || !countByMonth) {
      return countByMonth;
    }

    if (dataInicial && dataFinal) {
      const startDate = new Date(dataInicial);
      const endDate = new Date(dataFinal);
      startDate.setDate(startDate.getDate() + 1)
      endDate.setDate(endDate.getDate() + 1);

      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();

      let startMonth = startDate.getMonth();
      let endMonth = endDate.getMonth();

      if (startYear < endYear) {
        if (startMonth === endMonth || startMonth < endMonth) {
          startMonth = 0
          endMonth = 11
        }
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
      <div className="container-pesquisa">
        <br />
        <Box display="flex" justifyContent="center" flexDirection={"column"}  paddingLeft={smDown ? 5 : mdDown ? 0 : 50}>
            <div className="pesquisa-container">
              <p>Empresa:</p>
              <label htmlFor="empresa"></label>
              <input
                type="text"
                value={textoEmpresas}
                onChange={(e) => setTextoEmpresas(e.target.value)}
                onFocus={() => setExibirDropdownEmpresas(true)}
                onBlur={() => setTimeout(() => setExibirDropdownEmpresas(false), 200)}
                placeholder="Pesquise"
              />
              {exibirDropdownEmpresas && textoEmpresas && (
                <ul className="dropdown">
                  {filtrarOpcoesEmpresas.map((opcao, index) => (
                    <li key={index} onMouseDown={() => setTextoEmpresas(opcao)}>
                      {opcao}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="data-inicial">
              <p>Data-Inicial:</p>
              <label htmlFor="dataInicial"></label>
              <input
              placeholder="Data-Inicial:"
                type="month"
                id="dataInicial"
                value={dataInicial}
                onChange={handleDataInicialChange}
              />
            </div>
            <div className="data-final">
              <p>Data-Final:</p>
              <label htmlFor="dataFinal"></label>
              <input
                type="month"
                id="dataFinal"
                value={dataFinal}
                onChange={handleDataFinalChange}
              />
            </div>
            <button className="botao-pesquisar" color="primary" onClick={handleBuscarClick} style={{ width: '300px ', marginTop: '10px' }}>
            Buscar
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </div>
      
  <Box marginLeft={smDown ? 2 : mdDown ? 0 : 6} display="flex" flexDirection="column">
  <Box display="flex" flexDirection={smDown ? "column" : "row"} gap={smDown ? 3 : 10}>
    {/* Gráfico de Classificação */}
    <Box display="flex" flexDirection="column" alignItems="center" width={smDown ? "100%" : "50%"} className="hide-legend">
      {countByClassification && (
        <PieChart
          series={[{
            data: Object.entries(countByClassification).map(([classification, value]) => ({
              label: smDown ? '' : formatTitleFromMapping(classification), // Exibe legenda apenas em telas maiores
              value: Number(value),
            })),
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          }]}
          width={smDown ? 280 : 600}
          height={250}
          colors={["#F0CE00", "#D76A03", "#BF3100", "#2B4162", "#2D728F", "#407F99"]}
        />
      )}
    </Box>

    {/* Gráfico de Status */}
    <Box display="flex" flexDirection="column" alignItems="center" width={smDown ? "100%" : "50%"} padding={smDown ? 5 : 10} className="hide-legend">
      {countByStatus && (
        <PieChart
          series={[{
            data: Object.entries(countByStatus).map(([status, value]) => ({
              label: smDown ? '' : formatClassificationLabel(status), // Exibe legenda apenas em telas maiores
              value: Number(value),
            })),
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          }]}
          width={smDown ? 280 : 500}
          height={250}
          colors={["#003383", "#F0CE00", "#2299AA"]}
        />
      )}
    </Box>
  </Box>

  {/* Gráfico de Meses */}
  <Box display="flex" justifyContent="center" marginY={4} className="hide-legend">
    {countByMonth && (
      <BarChart
        xAxis={[{
          scaleType: "band",
          data: Object.keys(filteredCountByMonth() || {}).map(month => formatMonthFromMapping(month)),
        }]}
        series={[{
          data: Object.values(filteredCountByMonth() || {}).map(value => Number(value)),
        }]}
        width={smDown ? 300 : 700}
        height={smDown ? 300 : 500}
        colors={["#003383"]}
      />
    )}
  </Box>

  {/* Gráfico de Investimento por Empresa */}
  <Box display="flex" justifyContent="center" marginY={4} className="hide-legend">
    {investmentByCompany && (
      <BarChart
        xAxis={[{
          scaleType: "band",
          data: Object.keys(investmentByCompany).map(company => company),
        }]}
        series={[{
          data: Object.values(investmentByCompany).map(value => Number(value)),
        }]}
        width={smDown ? 300 : 700}
        height={smDown ? 300 : 500}
        colors={["#003383"]}
      />
    )}
  </Box>
</Box>
    </>
  );
}