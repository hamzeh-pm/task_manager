import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import TaskListItem from "./taskListItem";

const results = [
  {
    id: 1,
    title: "task title",
    description: "task description",
    priority: "task prio",
    category: "task category",
    completed: false,
  },
];

export default function Tasks() {
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3, mt: 3 }}>
        <Button
          component={Link}
          variant="contained"
          color="primary"
          to="/tasks/create"
        >
          Create New Task
        </Button>
      </Box>
      {results.map((task) => {
        return (
          <div key={task.id}>
            <TaskListItem item={task} />
          </div>
        );
      })}
    </div>
  );
}
