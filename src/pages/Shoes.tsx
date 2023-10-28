import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import { ShoeModal } from "../components/ShoeModal";

export const Shoes = () => {
  return (
    <Container>
      <ShoeModal />
      <ShoeTable />
    </Container>
  );
};

function Row() {
  return (
    <React.Fragment>
      <TableRow>
        <TableCell align="right">
          <Typography style={{ fontFamily: "Poppins" }}>w</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography style={{ fontFamily: "Poppins" }}>a</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography style={{ fontFamily: "Poppins" }}>d</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography style={{ fontFamily: "Poppins" }}>a</Typography>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const ShoeTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell width="10vw" />
            <TableCell>
              <Typography variant="h6" style={{ fontFamily: "Poppins" }}>
                Shoe
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" style={{ fontFamily: "Poppins" }}>
                Miles
              </Typography>
            </TableCell>
            <TableCell align="right" width="10vw" />
          </TableRow>
        </TableHead>
        <TableBody>{"body"}</TableBody>
      </Table>
    </TableContainer>
  );
};
