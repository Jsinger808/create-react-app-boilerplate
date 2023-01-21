import express from "express"
import cors from "cors"
import datebuy from "./api/datebuy.route.js"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/datebuy", datebuy)
app.use("*", (req, res) => res.status(404).json({error: "URL not found"}))

export default app