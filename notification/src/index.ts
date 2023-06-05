import express from "express";
import { json } from "body-parser";
import {getMessageRouter} from "./routes/getMessage"

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(getMessageRouter);

app.listen(3000,() =>{
    console.log('listening on port 3001 hehe');
});