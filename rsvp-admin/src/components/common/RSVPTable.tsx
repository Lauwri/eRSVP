import React, { useCallback, useEffect, useState } from "react";
import { Box, styled as mstyled, TableBody, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";
import {
  fetchUsers,
  selectAllUsers,
  markUserArrived,
  User,
  Source,
} from "../../store/features/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/root";

const StyledTableCell = mstyled(TableCell)({
  padding: 5,
  minWidth: 150,
});

export const RSVPTable = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const userStatus = useAppSelector((state) => state.tg.status);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filter, setFilter] = useState("");

  const onFilterChange = useCallback(
    (value: string) => {
      setFilteredUsers(
        users.filter((u) => u.name?.toLowerCase().includes(value.toLowerCase()))
      );
    },
    [users, setFilteredUsers]
  );

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  useEffect(() => {
    onFilterChange(filter);
  }, [users, filter, setFilteredUsers, onFilterChange]);

  const onMarkUserArrived = (id: number, arrived: boolean, source: Source) => {
    console.log("onMarkUserArrived", id, arrived, source);
    dispatch(markUserArrived({ id, arrived, source }));
  };

  const sortedUsers = filteredUsers
    .slice()
    .sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0));

  const sisal = users.filter((u) => u.arrived);
  console.log("hmm", sisal);
  return (
    <Box>
      <Box display={"flex"} width="100%" gap={"25px"} alignItems={"center"}>
        <TextField
          id="filter"
          label="Haku"
          type="search"
          variant="outlined"
          margin="normal"
          size="small"
          value={filter}
          onChange={(evt) => setFilter(evt.target.value)}
        />
        <Box margin={1}>
          <p>Vieraita yhteensä: {users.length}</p>
          <p>
            Telegrammista: {users.filter((u) => u.source === Source.TG).length}
          </p>
          <p>
            Formsista: {users.filter((u) => u.source === Source.FORMS).length}
          </p>
          <p>Sisällä: {sisal.length}</p>
        </Box>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <b>Nimi</b>
            </StyledTableCell>
            <StyledTableCell>
              <b>Lähde</b>
            </StyledTableCell>
            <StyledTableCell style={{ textAlign: "center" }}>
              <b>Saapunut</b>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map((u, i) => RSVPUserRow(u, i, onMarkUserArrived))}
        </TableBody>
      </Table>
    </Box>
  );
};

const RSVPUserRow = (
  user: User,
  index: number,
  onChange: (id: number, arrived: boolean, source: Source) => void
) => (
  <TableRow key={index}>
    <StyledTableCell>
      <UserListName>
        {index}. {user.name}
      </UserListName>
    </StyledTableCell>
    <StyledTableCell>
      <UserListName>{user.source}</UserListName>
    </StyledTableCell>
    <StyledTableCell style={{ textAlign: "center" }}>
      <UserListArrivedCheckbox
        type="checkbox"
        id={"UserListArrivedRadio" + index}
        name="arrived"
        checked={user.arrived || false}
        onChange={(evt) => onChange(user.id, evt.target.checked, user.source)}
      />
    </StyledTableCell>
  </TableRow>
);

const UserListName = styled.p`
  margin: 5px;
`;

const UserListArrivedCheckbox = styled.input``;
