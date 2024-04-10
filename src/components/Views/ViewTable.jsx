import React from "react";
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

export default function ViewTable({ data }) {
  const columns = [
    "indicator_name",
    "indicator_weight",
    "metric_name",
    "metric_weight",
    "metric_score",
  ];

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
          {data &&
            data.flatMap((risks) =>
              risks.indicators.flatMap((indicator) =>
                indicator.metrics
                  .filter((metric) => metric.checked)
                  .map((metric) => (
                    <TableRow
                      key={`${risks.name}-${indicator.name}-${metric.name}`}
                    >
                      <TableCell>
                        {indicator.name}{" "}
                        <Tooltip title={indicator.description}>
                          <IconButton>
                            <ErrorOutlineOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        {
                          risks.indicators.find(
                            (item) => item.name === indicator.name
                          ).weight
                        }
                      </TableCell>
                      <TableCell>{metric.name}</TableCell>
                      <TableCell>{metric.weight}</TableCell>
                      <TableCell>{metric.score.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
              )
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ViewTable.propTypes = {
  data: PropTypes.array.isRequired,
};
