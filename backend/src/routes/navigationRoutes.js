import { Router } from "express";
import {
  listLocations,
  getRoute,
  getMultiStopRoute,
} from "../controllers/navigationController.js";

const router = Router();

// GET  /api/locations?q=library        -> search/list campus locations
router.get("/locations", listLocations);

// GET  /api/route?from=main_gate&to=j_block_library&algorithm=astar
router.get("/route", getRoute);

// POST /api/route/multi-stop  { from, stops: ["library","canteen"] }
router.post("/route/multi-stop", getMultiStopRoute);

export default router;
