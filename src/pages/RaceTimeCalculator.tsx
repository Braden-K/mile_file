import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { MultiButtonComponent } from "../components/MultiButtonComponent";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxWidth: "600px",
    margin: "0 auto",
  },
}));

export const RaceTimeCalculator = () => {
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");
  const [hourArr, setHourArr] = useState<string[]>([]);
  const [minArr, setMinArr] = useState<string[] | null>(null);
  const [remSecArr, setRemSecArr] = useState<string[]>([]);
  const classes = useStyles();

  const handleMinuteChange = (event: SelectChangeEvent) => {
    setMin(event.target.value);
  };

  const handleSecondChange = (event: SelectChangeEvent) => {
    setSec(event.target.value);
  };

  const onCalculateClick = () => {
    const totalSeconds = Number(min) * 60 + Number(sec);
    const secArr = [
      totalSeconds * 3.10686,
      totalSeconds * 6.21371,
      totalSeconds * 10,
      totalSeconds * 13.1,
      totalSeconds * 26.2,
    ];
    const hourArr = secArr
      .map((sec) => Math.floor(sec / 3600))
      .map((hour) => ("0" + hour.toString()).slice(-2));
    setHourArr(hourArr);
    const minArr = secArr
      .map((sec) => Math.floor((sec % 3600) / 60))
      .map((min) => ("0" + min.toString()).slice(-2));
    setMinArr(minArr);
    const remSecArr = secArr
      .map((sec) => Math.floor(((sec % 3600) / 60) % 60))
      .map((sec) => ("0" + sec.toString()).slice(-2));
    setRemSecArr(remSecArr);
  };

  return (
    <Container>
      <Typography>Enter a per mile pace to see race times</Typography>
      <Grid
        container
        spacing={2}
        margin={4}
        alignItems={"center"}
        justifyContent={"center"}
        display={"flex"}
        flexDirection={"column"}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <Grid item xs={12}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Minutes</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={String(min)}
              label="Minutes"
              onChange={handleMinuteChange}
            >
              {Array.from(Array(7).keys()).map((i) => (
                <MenuItem value={i + 4}>{i + 4}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Seconds</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={String(sec)}
              label="Seconds"
              onChange={handleSecondChange}
            >
              {Array.from(Array(60).keys()).map((i) => (
                <MenuItem value={i}>{(i < 10 ? "0" : "") + i}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <MultiButtonComponent
            quantity={1}
            buttonTextList={["Calculate"]}
            clickHanlderList={[onCalculateClick]}
            margin={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" style={{ fontFamily: "Poppins" }}>
                      Distance
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" style={{ fontFamily: "Poppins" }}>
                      Finishing Time
                    </Typography>
                  </TableCell>
                  <TableCell align="right" width="10vw" />
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography style={{ fontFamily: "Poppins" }}>
                      5k
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography style={{ fontFamily: "Poppins" }}>
                      {minArr === null
                        ? ""
                        : (hourArr[0] !== "00" ? hourArr[0] + ":" : "") +
                          (minArr != null
                            ? minArr[0] + ":" + remSecArr[0]
                            : "")}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography style={{ fontFamily: "Poppins" }}>
                      10k
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography style={{ fontFamily: "Poppins" }}>
                      {minArr === null
                        ? ""
                        : (hourArr[1] !== "00" ? hourArr[1] + ":" : "") +
                          (minArr != null
                            ? minArr[1] + ":" + remSecArr[1]
                            : "")}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography style={{ fontFamily: "Poppins" }}>
                      10 mi
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography style={{ fontFamily: "Poppins" }}>
                      {minArr === null
                        ? ""
                        : (hourArr[2] !== "00" ? hourArr[2] + ":" : "") +
                          (minArr != null
                            ? minArr[2] + ":" + remSecArr[2]
                            : "")}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography style={{ fontFamily: "Poppins" }}>
                      Half Marathon
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography style={{ fontFamily: "Poppins" }}>
                      {minArr === null
                        ? ""
                        : (hourArr[3] !== "00" ? hourArr[3] + ":" : "") +
                          (minArr != null
                            ? minArr[3] + ":" + remSecArr[3]
                            : "")}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography style={{ fontFamily: "Poppins" }}>
                      Marathon
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography style={{ fontFamily: "Poppins" }}>
                      {minArr === null
                        ? ""
                        : (hourArr[4] !== "00" ? hourArr[4] + ":" : "") +
                          (minArr != null
                            ? minArr[4] + ":" + remSecArr[4]
                            : "")}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};
