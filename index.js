import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import nodemailer from "nodemailer"

const PORT = 4444

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    }
});

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.post("/send-email", async (req, res) => {

    const {message, name} = req.body
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'portfolio mail',
        text: '',
        html: `<h1>{name}</h1> <h2>{message}</h2>`
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            // do something useful
        }
    });

    res.send(req.body)

})

app.listen(PORT, () => {
    console.log("server has been started on port " + PORT)
})

