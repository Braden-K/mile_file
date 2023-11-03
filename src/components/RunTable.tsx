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
import { deleteApiRun, getApiRunById, getApiRunsByUserId } from "../api/runs";
import { useNavigate, Link } from "react-router-dom";
import { formatDate } from "../utils/date";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { loadRuns } from "../redux/runsSlice";
import { DotMenu } from "./DotMenu";

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

function Row(props: { row: RunTableRow; userId: number }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editRunHandler = () => {
    navigate("/editRun");
  };

  const deleteRunHandler = async () => {
    await deleteApiRun(row.id);
    const runs = await getApiRunsByUserId(props.userId);
    dispatch(loadRuns(runs));
  };

  const handlerArr = [editRunHandler, deleteRunHandler];
  const optionArr = ["Edit Run", "DeleteRun"];

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <DotMenu optionArr={optionArr} handlerArr={handlerArr} />
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
    </React.Fragment>
  );
}

const RunTable = (props: { runs: Run[] }) => {
  const user = useSelector((state: RootState) => state.user);
  const rows: RunTableRow[] = runDataToRows(props.runs);

  const sortRowsByDate = (rows: RunTableRow[]) => {
    return rows.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
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
          {sortRowsByDate(rows).map((row) => (
            <Row key={row.id} row={row} userId={user.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RunTable;
