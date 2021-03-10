import "./App.css";
import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridPreferencePanelsValue,
  GridToolbar,
  GridToolbarContainer,
  GridFilterToolbarButton,
  GridDensitySelector,
} from "@material-ui/data-grid";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

//styling for table text size
const theme = createMuiTheme({
  typography: {
    fontSize: "1rem",
  },
});

//custom Toolbar above table
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridDensitySelector />
      <GridFilterToolbarButton />
    </GridToolbarContainer>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [time, setTime] = useState("");
  var timeValue = "";
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  //fetch Data once upon loading and set it to {data} variable
  useEffect(() => {
    fetch("https://api.covid19api.com/summary", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(Object.values(result.Countries));
        setTime(
          new Date(result.Date).getDate() +
            "/" +
            new Date(result.Date).getMonth() +
            "/" +
            new Date(result.Date).getFullYear()
        );
      })
      .catch((error) => console.log("error", error));
  }, []);

  //make a columns format for Material UI DataGrid
  const columns = [
    { field: "country", headerName: "Country", flex: 1 },
    {
      field: "totalcases",
      headerName: "Total Confirmed",
      flex: 1,
      filterable: false,
    },
    {
      field: "totaldeaths",
      headerName: "Total Deaths",
      flex: 1,
      filterable: false,
    },
    {
      field: "totalrecoveries",
      headerName: "Total Recovered",
      flex: 1,
      filterable: false,
    },
  ];

  //create an empty array for storing value from API
  let rows = [];

  //counting variable for creating unique id, which is a requirement for displaying DataGrid
  let i = 0;

  //iterate thorugh each country's array of data, then push selected data into {rows}
  data.forEach((each) => {
    //check for 0
    if (each.TotalDeaths == 0) {
      each.TotalDeaths = "unreported";
    }
    if (each.TotalConfirmed == 0) {
      each.TotalConfirmed = "unreported";
    }
    if (each.TotalRecovered == 0) {
      each.TotalRecovered = "unreported";
    }
    rows.push({
      id: i,
      country: each.Country,
      totalcases: each.TotalConfirmed,
      totaldeaths: each.TotalDeaths,
      totalrecoveries: each.TotalRecovered,
    });
    i++;
  });

  return (
    <div className="App">
      <di classNmae="top"></di>
      <CssBaseline />
      <div className="header">
        <h1 className="head1">Corona Virus Situation Report</h1>
        <h3>last updated: {time}</h3>
      </div>
      <MuiThemeProvider theme={theme}>
        <div className="dataTable">
          <DataGrid
            id={Math.random()}
            rows={rows}
            columns={columns}
            scrollbarSize={15}
            pageSize={10}
            disableColumnMenu={true}
            components={{
              Toolbar: CustomToolbar,
            }}
            autoHeight
            sortModel={[
              {
                field: "totalcases",
                sort: "desc",
              },
            ]}
          />
        </div>
      </MuiThemeProvider>
      <footer>
        Made with{" "}
        <a
          href="https://covid19api.com/"
          style={{ textDecoration: "none", color: "#5dbae8" }}
        >
          api.covid19api.com
        </a>
      </footer>
    </div>
  );
}

export default App;
