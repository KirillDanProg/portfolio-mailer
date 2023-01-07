import express from "express"
import dotenv from "dotenv"
import cors from "cors"

const PORT = process.env.PORT || 4444

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.post("/send-email", (res, req) => {

})

app.listen(PORT, () => {
    console.log("server has been started on port ")
})

