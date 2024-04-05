import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import config from "../../config.json";

export default function ViewTable({ selectedCompany }) {
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    if (selectedCompany) {
      fetch(`${config.BACKEND_URL}/company_info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ company_name: selectedCompany })
      })
        .then((response) => response.json())
        .then((data) => {
          setCompanyData(data.company_info);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedCompany]);

  useEffect(() => {
    // 更新表格数据
    if (companyData) {
      console.log("Company data updated:", companyData);
    }
  }, [companyData]);

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
                <TableCell key={column}>
                  {column === "metric_name" ? (
                    <>
                      {item[column]}{" "}
                      <Tooltip title={item.metric_description}>
                        <IconButton>
                          <ErrorOutlineOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    item[column]
                  )}
                </TableCell>
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
