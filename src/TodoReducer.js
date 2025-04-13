import { v4 as uuidv4 } from "uuid";
export default function reducer(currentTask, action) {
  console.log(action);
  switch (action.type) {
    case "added": {
      let newToDo = {
        id: uuidv4(),
        task: action.payload,
        isCompleted: false,
      };

      let updateLocalStorage = [...currentTask, newToDo];
      localStorage.setItem("todos", JSON.stringify(updateLocalStorage));
      return updateLocalStorage;
    }

    case "isCompleted": {
      const isDone = currentTask.map((t) => {
        if (t.id === action.payload) {
          return { ...t, isCompleted: !t.isCompleted };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(isDone));
      return isDone;
    }

    case "deleted": {
      const deleteTask = [...currentTask];
      deleteTask.splice(action.payload, 1);
      localStorage.setItem("todos", JSON.stringify(deleteTask));
      return deleteTask;
    }

    case "updated": {
      const updatedTasks = currentTask.map((t) => {
        if (t.id === action.payload.indexId) {
          return {
            ...t,
            task: action.payload.title,
          };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTasks));
      return updatedTasks;
    }

    case "get": {
      const tasksStorage = JSON.parse(localStorage.getItem("todos")) ?? [];
      return tasksStorage;
    }

    default: {
      throw Error("unknown action" + action.type);
    }
  }
}
