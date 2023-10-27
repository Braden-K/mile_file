import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { RunTableRow } from "../models/RunTableRow";
import "../css/runs.css";
import { Run } from "../models/Run";
import { Button, Tab } from "@mui/material";
import { deleteApiRun } from "../api/runs";
import { useNavigate, Link } from "react-router-dom";
import { formatDate } from "../utils/date";

const runDataToRows = (runs: Run[]): RunTableRow[] => {
  return runs.map((run) => {
    const secondsPerMile = run.duration / run.distance;
    const minutesPerMile = Math.floor(secondsPerMile / 60);
    const secondsLeftOver = Math.floor(secondsPerMile % 60);
    let secondsLeftOverString = secondsLeftOver.toString();
    if (secondsLeftOver < 10) {
      secondsLeftOverString = `0${secondsLeftOverString}`;
    }
    const pace = `${minutesPerMile}:${secondsLeftOverString} min/mi`;

    return {
      id: run.id,
      date: formatDate(run.date, true),
      distance: run.distance,
      pace: pace,
      hr: run.avg_hr,
      type: run.type,
    };
  });
};

function Row(props: { row: RunTableRow; deleteRun: (runId: number) => void }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography style={{ fontFamily: "Poppins" }}>
            <Link to={`/runs/${row.id}`}>{row.date}</Link>
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography style={{ fontFamily: "Poppins" }}>
            {row.distance} Miles
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography style={{ fontFamily: "Poppins" }}>{row.pace}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography style={{ fontFamily: "Poppins" }}>
            {row.hr} BPM
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography style={{ fontFamily: "Poppins" }}>{row.type}</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Button color="error" onClick={() => props.deleteRun(row.id)}>
                <Typography>Delete Run</Typography>
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const RunTable = (props: { runs: Run[] }) => {
  const rows: RunTableRow[] = runDataToRows(props.runs);

  const deleteRun = async (runId: number) => {
    console.log("delete run");
    await deleteApiRun(runId);
  };

  console.log("props", props);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell width="10vw" />
            <TableCell>
              <Typography variant="h6" style={{ fontFamily: "Poppins" }}>
                {" "}
                Date{" "}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" style={{ fontFamily: "Poppins" }}>
                {" "}
                Distance{" "}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" style={{ fontFamily: "Poppins" }}>
                {" "}
                Pace{" "}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" style={{ fontFamily: "Poppins" }}>
                {" "}
                Avg Heart Rate{" "}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" style={{ fontFamily: "Poppins" }}>
                {" "}
                Type{" "}
              </Typography>
            </TableCell>
            <TableCell align="right" width="10vw" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} deleteRun={deleteRun} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RunTable;
