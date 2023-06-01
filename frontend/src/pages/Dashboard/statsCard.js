import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

export default function StatsCard({ loading, title, value, icon }) {
  return (
    <Grid item xs={12} md={4} lg={4}>
      <Paper
        sx={{
          padding: (theme) => theme.spacing(1),
          display: "flex",
          alignItems: "center",
        }}
        elevation={4}
      >
        <Box>
          <Avatar
            sx={{
              margin: (theme) => theme.spacing(1),
              backgroundColor: blueGrey[500],
              color: "#fff",
              width: 32,
              height: 32,
            }}
          >
            {icon}
          </Avatar>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="caption"
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
          >
            {loading ? "loading..." : value}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}
