import Typography from "@mui/material/Typography";
import { Box, IconButton, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fragment } from "react";
import { PanoramaFishEye, TaskAlt } from "@mui/icons-material";
import { priorityOptionsData } from "../../data/priorityOptionsData";

export default function TaskListItem({
  item,
  handleDelete,
  handleTaskCompleteToggle,
}) {
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        borderLeft: (theme) =>
          `${theme.spacing(0.5)} solid ${
            priorityOptionsData[item.priority - 1].color
          }`,
        boxShadow: (theme) => theme.shadows[5],
        mb: 1,
      }}
    >
      <ListItemText
        primary={item.category_name}
        secondary={
          <Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {item.title} -
            </Typography>
            {item.description}
          </Fragment>
        }
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          size="large"
          onClick={() => {
            handleTaskCompleteToggle(item);
          }}
        >
          {item.completed ? <TaskAlt /> : <PanoramaFishEye />}
        </IconButton>
        <Link to={`/tasks/edit/${item.id}`} key="task-edit">
          <IconButton size="large">
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton
          size="large"
          onClick={() => {
            handleDelete(item.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
}
