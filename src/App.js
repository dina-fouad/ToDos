import "./style.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ComplitedTsks from "./ComplitedTasks";
import { TodoContext } from "./TodoContext";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useReducer } from "react";
import reducer from "./TodoReducer";


const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bb86fc",
      dark: "#3700b3",
    },
    secondary: {
      main: "#03dac6",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
});

function App() {
  // const [showTasks, setShowTasks] = useState([]);
  const [displayTasks, setDisplayTasks] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [showTasks, dispatch] = useReducer(reducer, []);


  function toastMsg(msg, type) {
    enqueueSnackbar(msg, { variant: type });
  }

  

  const completedTasks = showTasks.filter((task) => {
    console.log("completed");
    return task.isCompleted;
  });

  const inCompletedTasks = showTasks.filter((task) => {
    console.log("incompleted");
    return !task.isCompleted;
  });

  let typeTasks = [];

  if (displayTasks === "completed") {
    typeTasks = completedTasks;
  } else if (displayTasks === "incompleted") {
    typeTasks = inCompletedTasks;
  } else {
    typeTasks = showTasks;
  }

  return (
    <>
      <TodoContext.Provider value={{ showTasks ,dispatch}}>
        <ThemeProvider theme={theme}>
          <Container
            maxWidth="sm"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              paddingY: "30px",
            }}
          >
            <Box
              sx={{
                bgcolor: "background.paper",
                minHeight: "550px",
                width: "450px",
                borderRadius: "15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
                boxShadow: 3,
              }}
            >
              <h1 style={{ marginBottom: "10px", color: "#ffffff" }}>
                المهمات
              </h1>
              <hr
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  borderColor: "#444",
                }}
              />

              <ButtonGroup
                sx={{ marginBottom: "20px" }}
                variant="contained"
                aria-label="Basic button group"
              >
                <Button
                  value="incompleted"
                  onClick={(e) => setDisplayTasks(e.target.value)}
                  sx={{ "&:hover": { bgcolor: "#9f6eff" } }}
                >
                  غير منجز
                </Button>

                <Button
                  value="completed"
                  onClick={(e) => setDisplayTasks(e.target.value)}
                  sx={{ "&:hover": { bgcolor: "#8a5fdc" } }}
                >
                  منجز
                </Button>
                <Button
                  value="all"
                  onClick={(e) => setDisplayTasks(e.target.value)}
                  sx={{ "&:hover": { bgcolor: "#7345b7" } }}
                >
                  الكل
                </Button>
              </ButtonGroup>

              <ComplitedTsks
                typeTasks={typeTasks}
                toastMsg={toastMsg}
               
              />
            </Box>
          </Container>
        </ThemeProvider>
      </TodoContext.Provider>
    </>
  );
}

export default App;
