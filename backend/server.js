import express from "express";
import cors from "cors";
import navigationRoutes from "./src/routes/navigationRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", navigationRoutes);

app.get("/", (req, res) => {
  res.send("Smart Campus Navigation API is running.");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
