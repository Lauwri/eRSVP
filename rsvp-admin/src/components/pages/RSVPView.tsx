import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { RSVPContacting } from "./RSVPContacting";
import { RSVPListing } from "./RSVPListing";

export const RSVPView = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <RSVPViewContainer>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Kävijät" {...a11yProps(0)} />
          <Tab label="Viestit" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <RSVPListing />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <RSVPContacting />
      </CustomTabPanel>
    </RSVPViewContainer>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        height: "100%",
        width: "100%",
      }}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const RSVPViewContainer = styled.div`
  width: 100%;
  height: 100%;
`;
