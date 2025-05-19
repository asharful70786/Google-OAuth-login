// read the docs first 
//https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid

async function handleCredentialResponse() {
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: 'clinet id ',
      callback: (response) => {
        console.log(response)
      },
    });

    google.accounts.id.renderButton(document.getElementById('loginWithGoogle'),  // this is enable for login with button click {selected by : btn}
      { theme: "filled_blue", size: "large" , type : "standard" , shape : "pill" }
    )
    google.accounts.id.prompt();   // this enable the auto popup on the left side {selected by : fedcm}
  };
};

handleCredentialResponse();

// btn.addEventListener("click", () => {
//   let authflow = "https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&client_id=your_client_id&scope=openid%20email&redirect_uri=http://localhost:5500&nonce=123bitto";
//   window.location.href = authflow;
//   // let id_token =  new URLSearchParams(location.hash.substring(1)).get("id_token");
//   // console.log(id_token)


// });
// window.addEventListener("load", async () => {
//   let id_token = new URLSearchParams(location.hash.substring(1)).get("id_token");
//   // console.log(id_token)
//   if (id_token) {
//     let response = await fetch("http://169.254.181.74:3000/implicit_login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id_token })
//     });
//     console.log(response);
//   }
// });

