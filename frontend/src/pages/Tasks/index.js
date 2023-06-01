import {
  Box,
  Button,
  Divider,
  List,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import TaskListItem from "./taskListItem";
import useRequestResource from "../../hooks/useRequestResource";
import { Pagination } from "@mui/material";
import Filters from "./filters";

const pageSize = 5;

export default function Tasks() {
  const { resourceList, getResourceList, deleteResource, updateResource } =
    useRequestResource({
      endpoint: "tasks/task/",
    });

  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const handleConfirmDelete = () => {
    if (idToDelete) {
      deleteResource(idToDelete, () => {
        setIdToDelete(null);
      });
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    setOpen(true);
    setIdToDelete(id);
  };

  const handleDeleteClose = () => {
    setOpen(false);
  };

  const handleTaskCompleteToggle = (task) => {
    task.completed = !task.completed;
    updateResource(task.id, task);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const query = queryString.parse(location.search);

  const handleChangePagination = (event, value) => {
    const newQuery = {
      ...query,
      page: value,
    };

    const newSearch = queryString.stringify(newQuery);
    navigate(`${location.pathname}?${newSearch}`);
  };

  const handleFilter = (values) => {
    const searchParams = {
      completed: values.completed !== "ALL" ? values.completed : undefined,

      priority: values.priority !== "ALL" ? values.priority : undefined,

      category: values.category !== "ALL" ? values.category : undefined,
    };

    const newQuery = {
      ...query,
      ...searchParams,
    };

    const newSearch = queryString.stringify(newQuery);
    navigate(`${location.pathname}?${newSearch}`);
  };

  useEffect(() => {
    getResourceList({ query: location.search });
  }, [getResourceList, location.search]);

  return (
    <div>
      <Dialog open={open} onClose={handleDeleteClose}>
        <DialogTitle>Are you sure ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirmDelete}>Confirm</Button>
          <Button onClick={handleDeleteClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ mb: 3, mt: 3, p: 1 }}>
        <Filters handleFilter={handleFilter} query={query} />
      </Box>
      <Typography
        variant="subtitle1"
        sx={{
          marginLeft: (theme) => theme.spacing(1),
          marginBottom: (theme) => theme.spacing(2),
        }}
        color="text.primary"
      >
        {`Total Tasks: ${resourceList.count || 0}`}
      </Typography>
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
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {resourceList.results.map((task) => {
          return (
            <Fragment key={task.id}>
              <TaskListItem
                item={task}
                handleDelete={handleDelete}
                handleTaskCompleteToggle={handleTaskCompleteToggle}
              />
              <Divider variant="inset" component="li" />
            </Fragment>
          );
        })}
      </List>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          color="primary"
          count={Math.ceil(resourceList.count / pageSize)}
          page={query.page ? parseInt(query.page) : 1}
          onChange={handleChangePagination}
        />
      </Box>
    </div>
  );
}
