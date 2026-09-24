/**
 * Campus graph data — Rajalakshmi Engineering College, Thandalam.
 *
 * x, y are approximate pixel coordinates read off the campus map image
 * (850 x 545 canvas), used later to draw the SVG map + route overlay
 * on the frontend. They are NOT real-world distances.
 *
 * IMPORTANT: every edge below has a placeholder `distance` (in meters).
 * You said you'll measure/pace out the real distances later — when you
 * have them, just update the numbers in the `edges` array. Nothing else
 * needs to change; Dijkstra/A* will pick them up automatically.
 */

export const nodes = [
  { id: "main_gate", name: "Main Gate", x: 120, y: 505, category: "entrance" },
  {
    id: "way_to_main_gate",
    name: "Way to Main Gate",
    x: 210,
    y: 470,
    category: "path",
  },
  { id: "flag_pole", name: "Flag Pole", x: 60, y: 330, category: "landmark" },
  {
    id: "transport_workshop",
    name: "Transport Workshop",
    x: 95,
    y: 213,
    category: "facility",
  },
  {
    id: "way_to_temple_gate",
    name: "Way to Temple Gate",
    x: 210,
    y: 105,
    category: "path",
  },
  {
    id: "temple_gate",
    name: "Temple Gate",
    x: 100,
    y: 70,
    category: "landmark",
  },

  {
    id: "techlounge",
    name: "Techlounge",
    x: 370,
    y: 145,
    category: "academic",
  },
  {
    id: "main_block",
    name: "Main Block",
    x: 370,
    y: 230,
    category: "academic",
  },
  {
    id: "tpt_eb_block",
    name: "TPT Dept & EB Block",
    x: 455,
    y: 78,
    category: "academic",
  },
  {
    id: "j_block_library",
    name: "J Block & Library",
    x: 545,
    y: 78,
    category: "academic",
  },
  {
    id: "indoor_auditorium",
    name: "Indoor Auditorium",
    x: 640,
    y: 78,
    category: "facility",
  },
  {
    id: "playground",
    name: "Play Ground",
    x: 580,
    y: 200,
    category: "recreation",
  },

  {
    id: "girls_hostel_1",
    name: "Girls Hostel 1",
    x: 775,
    y: 100,
    category: "hostel",
  },
  {
    id: "girls_hostel_2",
    name: "Girls Hostel 2",
    x: 775,
    y: 160,
    category: "hostel",
  },
  {
    id: "girls_hostel_3",
    name: "Girls Hostel 3",
    x: 775,
    y: 220,
    category: "hostel",
  },
  { id: "canteen", name: "Canteen", x: 775, y: 280, category: "food" },
  {
    id: "boys_hostel",
    name: "Boys Hostel",
    x: 775,
    y: 350,
    category: "hostel",
  },

  {
    id: "workshop_block",
    name: "Workshop Block",
    x: 560,
    y: 350,
    category: "academic",
  },
  { id: "rec_mart", name: "Rec Mart", x: 680, y: 305, category: "food" },
  { id: "hut_cafe", name: "Hut Café", x: 680, y: 338, category: "food" },
  {
    id: "workshop_2",
    name: "Workshop 2",
    x: 680,
    y: 371,
    category: "academic",
  },
  {
    id: "workshop_1",
    name: "Workshop 1",
    x: 680,
    y: 404,
    category: "academic",
  },
  { id: "aero_dept", name: "Aero Dept", x: 680, y: 445, category: "academic" },

  {
    id: "aircraft_area",
    name: "Air Craft Area",
    x: 330,
    y: 445,
    category: "recreation",
  },
  { id: "rec_cafe", name: "Rec Café", x: 555, y: 528, category: "food" },
  {
    id: "academic_block",
    name: "Academic Block",
    x: 680,
    y: 528,
    category: "academic",
  },
];

export const edges = [
  // Main gate approach
  { from: "main_gate", to: "way_to_main_gate", distance: 1 },
  { from: "way_to_main_gate", to: "flag_pole", distance: 1 },
  { from: "flag_pole", to: "transport_workshop", distance: 1 },

  // Temple gate path (shown hazard-striped on the map — flagged as
  // blocked here as an example of how the admin panel could close a path)
  { from: "flag_pole", to: "way_to_temple_gate", distance: 1, blocked: true },
  { from: "way_to_temple_gate", to: "temple_gate", distance: 1, blocked: true },

  // Core academic spine
  { from: "transport_workshop", to: "techlounge", distance: 1 },
  { from: "techlounge", to: "main_block", distance: 1 },
  { from: "main_block", to: "playground", distance: 1 },
  { from: "techlounge", to: "tpt_eb_block", distance: 1 },
  { from: "tpt_eb_block", to: "j_block_library", distance: 1 },
  { from: "j_block_library", to: "indoor_auditorium", distance: 1 },
  { from: "indoor_auditorium", to: "playground", distance: 1 },

  // Hostel row (right side)
  { from: "playground", to: "girls_hostel_1", distance: 1 },
  { from: "girls_hostel_1", to: "girls_hostel_2", distance: 1 },
  { from: "girls_hostel_2", to: "girls_hostel_3", distance: 1 },
  { from: "girls_hostel_3", to: "canteen", distance: 1 },
  { from: "canteen", to: "boys_hostel", distance: 1 },

  // Workshop cluster
  { from: "main_block", to: "workshop_block", distance: 1 },
  { from: "workshop_block", to: "rec_mart", distance: 1 },
  { from: "rec_mart", to: "hut_cafe", distance: 1 },
  { from: "hut_cafe", to: "workshop_2", distance: 1 },
  { from: "workshop_2", to: "workshop_1", distance: 1 },
  { from: "workshop_1", to: "aero_dept", distance: 1 },
  { from: "aero_dept", to: "boys_hostel", distance: 1 },

  // Aircraft area / bottom road
  { from: "workshop_block", to: "aircraft_area", distance: 1 },
  { from: "aircraft_area", to: "way_to_main_gate", distance: 1 },
  { from: "aircraft_area", to: "rec_cafe", distance: 1 },
  { from: "rec_cafe", to: "academic_block", distance: 1 },
  { from: "academic_block", to: "aero_dept", distance: 1 },
];
