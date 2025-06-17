import { Router } from "express";

import { ExampleRouter } from "./example.route";
import { ParksRouter } from "./parks.route";

const router = Router();

router.use("/example", ExampleRouter);

router.use("/parks", ParksRouter);

export default router;
