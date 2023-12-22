function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const data = {
    username: username,
    password: password,
  };
  const url = `https://localhost:443/WebS2023_war/api/auth/login`;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then(function (response) {
    if (response.status === 200) {
      response.json().then((data) => {
        console.log(data);
        if (data?.data?.token != null) {
          document.cookie = "token=" + data.data.token + ";path=/";
          window.location.href = "/WebS2023_war";
        }
      });
    } else {
      response.json().then(function (data) {
        alert(data.message);
      });
    }
  });
}
