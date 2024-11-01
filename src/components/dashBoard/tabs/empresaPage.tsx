import * as React from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import { Box, CircularProgress, useTheme, useMediaQuery, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { projectClassificationCount } from "../../../type/projectClassificationCount";
import { links } from "../../../api/api";
import { projectMonthCount } from "../../../type/projectMonthCount";
import { projectStatusCount } from "../../../type/projectStatusCount";
import { projectInvestment } from "../../../type/projectInvestment"; 

export default function EmpresaPage() {
  const [countByClassification, setCountByClassification] = useState<projectClassificationCount | null>(null);
  const [countByMonth, setCountByMonth] = useState<projectMonthCount | null>(null);
  const [countByStatus, setCountByStatus] = useState<projectStatusCount | null>(null);
  const [investmentByCompany, setInvestmentByCompany] = useState<projectInvestment | null>(null);
  const [companies, setCompanies] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [loading, setLoading] = useState(true);
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
    fetchData();
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <div className="pesquisa-container">
        <label htmlFor="empresa">Empresa</label>
        <input
          type="text"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          placeholder="Pesquise..."
        />
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

      <Button variant="contained" color="primary" onClick={handleBuscarClick} style={{ marginTop: '10px' }}>
        Buscar
      </Button>

      <Box display="flex" justifyContent="center" flexDirection={"column"} gap={1} marginLeft={5}>
        <Box padding={smDown ? 0 : 6} display="flex" flexDirection="row" justifyContent="space-between" width="100%">
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

        <Box padding={smDown ? 0 : 5} display="flex" justifyContent="center">
          {countByMonth && (
            <BarChart
              xAxis={[{ scaleType: "band", data: Object.keys(countByMonth) }]}
              series={[{ data: Object.values(countByMonth) }]}
              height={300}
              colors={["#003383"]}
            />
          )}
        </Box>

        {investmentByCompany && (
          <Box padding={smDown ? 0 : 5} display="flex" justifyContent="center">
            <Typography variant="h6" color="primary">Investimento Total</Typography>
            <BarChart
              xAxis={[{ id: "investmentCategories", data: ["Investimento Total"], scaleType: "band" }]}
              series={[{ data: [investmentByCompany.totalInvestment] }]}
              height={200}
              colors={["#1E90FF"]}
            />
          </Box>
        )}
      </Box>
    </>
  );
}
