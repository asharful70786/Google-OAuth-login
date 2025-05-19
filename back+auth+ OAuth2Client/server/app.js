import express from "express";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";


const app = express();

app.use(cors());
app.use(express.json());

const client_id = "client_id";
const client_secret = "client_secret";
const redirect_uri = "http://localhost:5500/";

const client = new OAuth2Client(client_id, client_secret, redirect_uri); // pass tha parameters to get code from google server 

app.post("/auth/google", async (req, res) => {
  const { code } = req.body;
  console.log(code)

  if (!code) {
    return res.status(400).json({ error: "Code is missing" });
  }
  const { tokens } = await client.getToken(code)  //to get code 
  const idToken = tokens.id_token;

  const ticket = await client.verifyIdToken({  //google npm package
    idToken,
    audience: client_id,
  });
  console.log(ticket.getPayload());  //google npm package

  res.json({ message: tokens });
});

app.listen("5000", () => {
  console.log("Server is running on port 5000");
});
