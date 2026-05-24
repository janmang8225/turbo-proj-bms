// const express = require("express")
import "dotenv/config";
import express from "express"
import { prisma } from "@repo/db/client"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello - v2")
})

app.post("/signup", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
        return res.status(400).send("username and password are required");
    }

    const user = await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    })
    
    res.send("user added with id: " + user.id)
})




app.listen(3002, () => {
    console.log("listening...")
})