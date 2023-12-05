import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { fetchEmails } from "../../api/rsvpApi";
import { selectLogin } from "../../store/features/loginSlice";
import { useAppSelector } from "../../store/root";
import { SendBotMessage } from "../common/sendBotMessage";

export const RSVPContacting = () => {
  const token = useAppSelector(selectLogin);

  const [emails, setEmails] = useState([]);
  const [separator, setSeparator] = useState(",");

  const getEmailStr = async () => {
    if (token) {
      const emails = await fetchEmails(token);
      setEmails(emails);
    }
  };

  return (
    <RSVPViewContainer>
      <SendBotMessage />
      <Box>
        <Button onClick={getEmailStr}>Get Emails</Button>
        {emails.length > 0 ? EmailBox(emails, separator, setSeparator) : null}
      </Box>
    </RSVPViewContainer>
  );
};

const EmailBox = (
  emails: string[],
  separator: string,
  setSeparator: (value: string) => void
) => {
  return (
    <Box>
      <TextField
        id="filter"
        label="Erottaja"
        type="search"
        variant="outlined"
        margin="normal"
        size="small"
        value={separator}
        onChange={(evt) => setSeparator(evt.target.value)}
      />
      <EmailsP>{emails.join(separator)}</EmailsP>
      <p>Osoitteita yhteensä {emails.length}</p>
    </Box>
  );
};

const RSVPViewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
`;

const EmailsP = styled.p`
  max-width: 500px;
  max-height: 500px;
  word-wrap: break-word;
  overflow: auto;
`;

const Button = styled.button`
  background: #bf4f74;
  border-radius: 3px;
  padding: 4px;
  margin: 10px;
  border: none;
  color: white;
`;
