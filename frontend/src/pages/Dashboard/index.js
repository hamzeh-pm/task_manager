import { Grid, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StatsCard from "./statsCard";
import AssignmentIcon from "@mui/icons-material/AssignmentLate";
import TasksAltIcon from "@mui/icons-material/TaskAlt";
import TaskCompleteIcon from "@mui/icons-material/Check";
import useRequestResource from "../../hooks/useRequestResource";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { resourceList, getResourceList } = useRequestResource({
    endpoint: "tasks/status/task/",
  });

  const [completedStats, setCompletedStats] = useState({
    completed: null,
    pending: null,
  });

  useEffect(() => {
    getResourceList();
  }, [getResourceList]);

  useEffect(() => {
    const stats = {};
    if (resourceList) {
      resourceList.results.forEach((item) => {
        if (item.completed === true) {
          stats.completed = item.count;
        }
        if (item.completed === false) {
          stats.pending = item.count;
        }
      });
    }

    setCompletedStats(stats);
  }, [resourceList]);

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h5" mb={2}>
        Dashboard
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <StatsCard
            title="Total Task"
            value={
              completedStats.completed
                ? completedStats.completed + completedStats.pending
                : 0
            }
            loading={false}
            icon={<TasksAltIcon />}
          />
          <StatsCard
            title="Completed Task"
            value={completedStats.completed || 0}
            loading={false}
            icon={<TaskCompleteIcon />}
          />
          <StatsCard
            title="UnCompleted Task"
            value={completedStats.pending || 0}
            loading={false}
            icon={<AssignmentIcon />}
          />
        </Grid>
        <Box sx={{ maxWidth: 300 }}>
          <Doughnut
            data={{
              labels: ["Completed", "Pending"],
              datasets: [
                {
                  id: 1,
                  label: "Task Completions",
                  data: [completedStats.completed, completedStats.pending],
                  backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                  ],
                },
              ],
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
