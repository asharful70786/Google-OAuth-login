const btn = document.querySelector("button");

const client_id = "client_id";
const client_secret = "client_secret";
const redirect_uri = "http://localhost:5500/";

// https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&scope=openid%20email&redirect_uri=${redirect_uri}

btn.addEventListener("click", async () => {
  let authUrl = `response_type=code&client_id=${client_id}&scope=openid%20email&redirect_uri=${redirect_uri}`;
  window.open(`https://accounts.google.com/o/oauth2/v2/auth?${authUrl}`, "open-popup", "width=600,height=600");
});

window.addEventListener("message", (e) => {
  if (e.data.code) {
    console.log(e.data.code);
    getAccess_Token_From_Server(e.data.code);
    window.close();
  }
});

if (window.name === "open-popup") {
  const code = new URLSearchParams(window.location.search).get("code");
  window.opener.postMessage({ code }, "*");
}

// async function  getAccessToken(code) {
//   const response = await fetch("https://oauth2.googleapis.com/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: `client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${code}&grant_type=authorization_code`,
//   });
//   const data = await response.json();
//   const accesstoken = data.id_token
//   console.log(data);
//   console.log(accesstoken)

// }

async function getAccess_Token_From_Server(code) {
  let response = await fetch("http://169.254.93.34:5000/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code })
  });

  const data = await response.json();
  console.log(data);
}