import * as React from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import { Box, CircularProgress, useTheme, useMediaQuery, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { projectClassificationCount } from "../../../type/projectClassificationCount";
import { links } from "../../../api/api";
import { projectMonthCount } from "../../../type/projectMonthCount";
import { projectStatusCount } from "../../../type/projectStatusCount";
import { projectInvestment } from "../../../type/projectInvestment"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../dashBoard.css";

interface EmpresaPageProps {
  dataInicial: string;
  dataFinal: string;
  setDataInicial: (data: string) => void;
  setDataFinal: (data: string) => void;
  textoEmpresas: string;
  setTextoEmpresas: (texto: string) => void;
}

export default function EmpresaPage({ dataInicial, dataFinal, setDataInicial, setDataFinal, textoEmpresas, setTextoEmpresas }: EmpresaPageProps) {
  const [countByClassification, setCountByClassification] = useState<projectClassificationCount | null>(null);
  const [countByMonth, setCountByMonth] = useState<projectMonthCount | null>(null);
  const [countByStatus, setCountByStatus] = useState<projectStatusCount | null>(null);
  const [investmentByCompany, setInvestmentByCompany] = useState<projectInvestment | null>(null);
  const [companies, setCompanies] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState('');
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
        links.getCountClassificationCompany(textoEmpresas, dataInicial, dataFinal),
        links.getCountMonthCompany(textoEmpresas, dataInicial, dataFinal),
        links.getCountStatusCompany(textoEmpresas, dataInicial, dataFinal),
        links.getInvestmentCompany(textoEmpresas, dataInicial, dataFinal),
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
      "termoDeCooperacao": "Cooperação",
      "termoDeOutorga": "Outorga"
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

  const formatInvestmentLabel = (label: string): string => {
    const investmentMapping: Record<string, string> = {
      "totalInvestment": "Investimento Total",
    };
    return investmentMapping[label] || label;
  };

  const formatMonthFromMapping = (month: string): string => {
    const monthMapping: Record<string, string> = {
      "janeiro": "Jan",
      "fevereiro": "Fev",
      "marco": "Mar",
      "abril": "Abr",
      "maio": "Mai",
      "junho": "Jun",
      "julho": "Jul",
      "agosto": "Ago",
      "setembro": "Set",
      "outubro": "Out",
      "novembro": "Nov",
      "dezembro": "Dez"
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
        <Box className={"divPesquisar"}>
          <div className="pesquisa-container input-container">
            <p>Empresa</p>
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
          <div className="data-inicial input-container">
            <p>Data Inicial</p>
            <label htmlFor="dataInicial"></label>
            <input
              placeholder="Data-Inicial:"
              type="month"
              id="dataInicial"
              value={dataInicial}
              onChange={handleDataInicialChange}
            />
          </div>
          <div className="data-final input-container">
            <p>Data Final</p>
            <label htmlFor="dataFinal"></label>
            <input
              type="month"
              id="dataFinal"
              value={dataFinal}
              onChange={handleDataFinalChange}
            />
          </div>
          <button className="botao-pesquisar" onClick={handleBuscarClick}>
            Buscar
            <br />
            <FontAwesomeIcon icon={faSearch} />
          </button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
        
      </div>
      <Box className="chart-container">
        <Box className={smDown ? "flex-column" : "flex-row chart-container-row"}>
          <Box className="chart-section">
            <Typography>Classificação dos Projetos</Typography>
            {countByClassification && (
              <BarChart
                xAxis={[{
                  scaleType: "band",
                  data: Object.keys(countByClassification).map(classification => formatTitleFromMapping(classification)),
                }]}
                series={[{
                  data: Object.values(countByClassification).map(value => Number(value)),
                }]}
                height={250}
                colors={["#F0CE00", "#D76A03", "#BF3100", "#2B4162", "#2D728F", "#407F99"]}
              />
            )}
          </Box>
          <Box className="chart-section">
            <Typography>Status dos Projetos</Typography>
            {countByStatus && (
              <BarChart
                xAxis={[{
                  scaleType: "band",
                  data: Object.keys(countByStatus).map(status => formatClassificationLabel(status)),
                }]}
                series={[{
                  data: Object.values(countByStatus).map(value => Number(value)),
                }]}
                height={250}
                colors={["#003383", "#F0CE00", "#2299AA"]}
              />
            )}
          </Box>
        </Box>
        <div className="chart-container-row">
          <Box className="chart-section chart-section-last">
            <Typography>Projetos por mês</Typography>
            {countByMonth && (
              <BarChart
                xAxis={[{
                  scaleType: "band",
                  data: Object.keys(filteredCountByMonth() || {}).map(month => formatMonthFromMapping(month)),
                }]}
                series={[{
                  data: Object.values(filteredCountByMonth() || {}),
                }]}
                colors={["#003383"]}
              />
            )}
          </Box>
        </div>
        <div className="chart-container-row">
          <Box className="chart-section chart-section-last">
            <Typography>Total Investimentos</Typography>
            {investmentByCompany && (
              
              <PieChart
              series={[
                {
                  data: Object.entries(investmentByCompany).map(([company, value]) => ({
                    value: Number(value),
                  })),
                },
              ]}
              colors={["#003383"]}
              margin={{ right: 0 }} 
            />
            )}
          </Box>
        </div>
      </Box>
    </>
  );
}
