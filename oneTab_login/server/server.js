import express from "express";
import cors from "cors";
const app = express();
import { OAuth2Client } from "google-auth-library"; //for backed side jwt token verify
app.use(cors(
  {
    origin: "http://localhost:5500",
  }
));
app.use(express.json());

const client_id = "client_id";
const client_secret = "clinet_secret";
const redirect_uri = "http://localhost:5500/";

const client = new OAuth2Client(client_id, client_secret, redirect_uri);
app.post("/implicit_login", async (req, res) => {
  const { id_token } = req.body;

  //  verifying the token
  const ticket = await client.verifyIdToken({  //google npm package
    idToken: id_token,
    audience: client_id,
  });
  const userInfo = ticket.getPayload();
  // console.log(ticket.getPayload());

  res.send({ message: userInfo });
});


app.listen(3000, () => {
  console.log("server started");
});