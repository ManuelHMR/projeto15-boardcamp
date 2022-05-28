import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// import xxxRouter from "./routers/xxxRouter.js"
// import yyyRouter from "./routers/yyyRouter.js"
// import zzzRouter from "./routers/zzzRouter.js";

const app = express();
let port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// app.use(xxxRouter);
// app.use(yyyRouter);
// app.use(zzzRouter);

app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`)
});