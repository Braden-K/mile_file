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
import { RunGroup } from "../models/RunGroup";
import { RunTableRow } from "../models/RunTableRow";
import "../css/runs.css";
import { Run } from "../models/Run";
import { Button } from "@mui/material";
import { deleteApiRun } from "../api/runs";

const monthMap = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "July",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

const weekMap = {
  "0": "Sun",
  "1": "Mon",
  "2": "Tue",
  "3": "Wed",
  "4": "Thu",
  "5": "Fri",
  "6": "Sat",
};

const formatDate = (date: Date, includeDayOfWeek: boolean): string => {
  const dateAsDate = new Date(date);
  const dayOfWeek = dateAsDate.getDay();
  const dateString = date.toString();
  const year = dateString.substring(0, 4);
  const month = dateString.substring(5, 7);
  const day = dateString.substring(8, 10);

  if (includeDayOfWeek) {
    return `${weekMap[dayOfWeek]}, ${monthMap[month]} ${day}`;
  }
  return `${monthMap[month]} ${day}, ${year}`;
};

const runDataToRows = (runs: Run[]): RunTableRow[] => {
  return runs.map((run) => {
    const secondsPerMile = run.duration / run.distance;
    const minutesPerMile = Math.floor(secondsPerMile / 60);
    let secondsLeftOver = Math.floor(secondsPerMile % 60);
    if (secondsLeftOver < 10) {
      secondsLeftOver = Number("0" + secondsLeftOver);
    }
    const pace = `${minutesPerMile}:${secondsLeftOver} min/mi`;

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
          <Typography>{row.date}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>{row.distance}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>{row.pace}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>{row.hr}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>{row.type}</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Button color="error" onClick={() => props.deleteRun(row.id)}>
                <Typography>Delete Run</Typography>
              </Button>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>holder</TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const RunTable = (props: {
  runGroup: RunGroup;
  fetchAndLoadRuns: () => void;
}) => {
  const rows: RunTableRow[] = runDataToRows(props.runGroup.runs);

  const deleteRun = async (runId: number) => {
    console.log("delete run");
    await deleteApiRun(runId);
    props.fetchAndLoadRuns();
  };

  console.log("props", props);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography variant="h6"> Date </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6"> Distance </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6"> Pace </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6"> Avg BPM </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6"> Type </Typography>
            </TableCell>
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
