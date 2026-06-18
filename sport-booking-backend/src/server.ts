import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import fieldRoutes from "./routes/field.routes";
import announcementRoutes from "./routes/announcement.routes";
import competitionRoutes from "./routes/competition.routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "sport-booking-backend"
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "API is running"
  });
});

app.use("/api/fields", fieldRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/competitions", competitionRoutes);

const port = Number(process.env.PORT || 4000);

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});