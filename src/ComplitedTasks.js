import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Fab from "@mui/material/Fab";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import React from "react";
import DeleteTask from "./DeleteTask";
import { useContext, useEffect } from "react";
import { TodoContext } from "./TodoContext";
import UpdateTask from "./UpdateTask";


export default function ComplitedTsks({ typeTasks }) {
  useEffect(() => {
    const tasksStorage = JSON.parse(localStorage.getItem("todos"));
    setShowTasks(tasksStorage);
  }, []);

  const [newTask, setNewTask] = useState("");
  const { showTasks, setShowTasks } = useContext(TodoContext);

  function addTask() {
    let newToDo = {
      id: uuidv4(),
      task: newTask,
      isCompleted: false,
    };
    let updateLocalStorage = [...showTasks, newToDo];
    setShowTasks([...showTasks, newToDo]);
    localStorage.setItem("todos", JSON.stringify(updateLocalStorage));

    setNewTask("");
  }

  function colorIsDone(task) {
    return task.isCompleted ? "green" : "#9f6eff";
  }
  
  function btnDisabled (){
    if (newTask.length === 0) {
      return true;
    }
  }

function lineThrough(task){
  if(task.isCompleted){
    return "line-through";
  }else{
    return "none";
  }
}

  
  let showAllTasks = typeTasks.map((task, index) => {
    return (
      <React.Fragment key={task.id}>
        <Box
          key={task.id}
          sx={{
            width: "100%",
            height: "60px",
            borderRadius: "10px",
            bgcolor: "#333",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 15px",
            marginBottom: "10px",
            "&:hover": {
              bgcolor: "#444",
            },
          }}
        >
          <p
            style={{
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "bold",
              margin: 0,
              textDecoration: lineThrough(task),
            }}
          >
            {task.task}
          </p>

          <Box sx={{ display: "flex", gap: "5px" }}>
            <Fab
              size="small"
              color="primary"
              aria-label="done"
              sx={{ bgcolor: colorIsDone(task) }}
              onClick={() => {
                const isDone = showTasks.map((t) => {
                  if (t.id === task.id) {
                    return { ...t, isCompleted: !t.isCompleted };
                  } else {
                    return t;
                  }
                });
                localStorage.setItem("todos", JSON.stringify(isDone));
                setShowTasks(isDone);
              }}
            >
              <CheckOutlinedIcon style={{ color: "white" }} fontSize="small" />
            </Fab>

            <UpdateTask indexId={task.id} index={index} />

            <DeleteTask index={index} />
          </Box>
        </Box>
      </React.Fragment>
    );
  });

  return (
    <>
      {showAllTasks}

      <Box sx={{ width: "100%", marginTop: "auto" }}>
        <Stack
          spacing={2}
          direction="row"
          sx={{ width: "100%", justifyContent: "space-between" }}
        >
          <TextField
            value={newTask}
            onChange={(event) => {
              setNewTask(event.target.value);
            }}
            fullWidth
            id="outlined-basic"
            label="المهمة"
            variant="outlined"
            InputLabelProps={{ style: { color: "#b0b0b0" } }}
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#666" },
                "&:hover fieldset": { borderColor: "#555" },
                "&.Mui-focused fieldset": { borderColor: "#bb86fc" },
              },
            }}
          />
          <Button
            onClick={addTask}
            variant="contained"
            sx={{ height: "56px", "&:hover": { bgcolor: "#9f6eff" } }}
            disabled= {btnDisabled()}
          >
            إضافة
          </Button>
        </Stack>
      </Box>
    </>
  );
}
