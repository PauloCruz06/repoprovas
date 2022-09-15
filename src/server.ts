import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => 
    console.log(`Server up and running on port ${port}`)
);