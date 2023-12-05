import React from "react";
import styled from "styled-components";
import { RSVPTable } from "../common/RSVPTable";

export const RSVPListing = () => {
  return (
    <RSVPViewContainer>
      <TableContainer>
        <RSVPTable />
      </TableContainer>
    </RSVPViewContainer>
  );
};

const RSVPViewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const TableContainer = styled.div``;
