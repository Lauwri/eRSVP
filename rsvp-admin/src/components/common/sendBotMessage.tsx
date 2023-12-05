import React, { useState } from "react";
import { TextField } from "@mui/material";
import styled from "styled-components";
import { postMessage } from "../../api/rsvpApi";
import { useAppSelector } from "../../store/root";
import { selectLogin } from "../../store/features/loginSlice";
enum SentState {
  "none" = "none",
  "ok" = "ok",
  "fail" = "fail",
  "loading" = "loading",
}
export const SendBotMessage = () => {
  const token = useAppSelector(selectLogin);

  const [message, setMessage] = useState("");
  const [passphrase, setPassphrase] = useState("");

  const [sentState, setSentState] = useState<SentState>(SentState.none);

  const sendBotMessage = async () => {
    if (token) {
      setSentState(SentState.loading);
      console.log("Message", message);
      const result = await postMessage(message, passphrase, token);
      if (result) return setSentState(SentState.ok);
      setSentState(SentState.fail);
    }
  };
  return (
    <BotMessageContainer>
      <BotMessageForm>
        <MessageText>Send message to everyone arriving</MessageText>
        <TextField
          id="filter"
          label="salaus"
          type="text"
          variant="outlined"
          margin="normal"
          size="small"
          value={passphrase}
          onChange={(evt) => setPassphrase(evt.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Message"
          variant="outlined"
          margin="normal"
          value={message}
          style={{ width: "100%" }}
          multiline
          rows={8}
          onChange={(evt) => setMessage(evt.target.value)}
        />
        <Button
          onClick={() => {
            console.log("sending message");
            if (message.length > 10) sendBotMessage();
          }}
        >
          Send message
        </Button>
        {sentState === SentState.ok ? (
          <p>Lähetetty ok</p>
        ) : sentState === SentState.loading ? (
          <p>Lähetetään...</p>
        ) : (
          sentState === SentState.fail && <p>Ei lähetetty</p>
        )}
      </BotMessageForm>
    </BotMessageContainer>
  );
};

const BotMessageContainer = styled.div`
  min-width: 50%;
`;

const BotMessageForm = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid;
  padding: 5px;
  text-align: center;
  align-items: center;
`;

const MessageText = styled.p`
  margin: 5px;
  padding: 3px;
`;

const Button = styled.button`
  background: #bf4f74;
  border-radius: 3px;
  padding: 4px;
  margin: 10px;
  border: none;
  color: white;
`;
