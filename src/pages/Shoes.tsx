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
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Shoe } from "../models/Shoe";

export const Shoes = () => {
  const shoes = useSelector((state: RootState) => state.shoes);

  return (
    <Container>
      <ShoeModal />
      <ShoeTable shoes={shoes} />
    </Container>
  );
};

function Row(props: { shoe: Shoe }) {
  return (
    <React.Fragment>
      <TableRow>
        <TableCell align="right">
          <Typography style={{ fontFamily: "Poppins" }}>
            {props.shoe.shoe_name}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography style={{ fontFamily: "Poppins" }}>
            {props.shoe.miles}
          </Typography>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const ShoeTable = (props: { shoes: Shoe[] }) => {
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
        <TableBody>
          {props.shoes.map((shoe) => (
            <Row key={shoe.id} shoe={shoe} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
