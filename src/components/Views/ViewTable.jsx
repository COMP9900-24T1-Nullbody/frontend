import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import config from "../../config.json";

export default function ViewTable({ selectedCompany }) {
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    if (selectedCompany) {
      // 发送POST请求
      fetch(`${config.BACKEND_URL}/company_info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ company_name: selectedCompany })
      })
        .then((response) => response.json())
        .then((data) => {
          // 保存数据到状态变量
          setCompanyData(data.company_info);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedCompany]); // 仅在 selectedCompany 发生变化时执行回调

  if (!companyData) {
    return <div>Loading...</div>;
  }

  const columns = ["metric_name", "score", "year"];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {companyData.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>{item[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ViewTable.propTypes = {
  selectedCompany: PropTypes.string.isRequired
};
