import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import nodemailer from "nodemailer"
import * as Process from "process";

const PORT = 4444

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Process.env.EMAIL,
        pass: Process.env.APP_PASSWORD
    }
});

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.post("/send-email", async (req, res) => {

    const mailOptions = {
        from: Process.env.EMAIL,
        to: Process.env.EMAIL,
        subject: 'portfolio mail',
        text: '',
        html: `<h1>Email test</h1>`
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            // do something useful
        }
    });
})

app.listen(PORT, () => {
    console.log("server has been started on port " + PORT)
})

