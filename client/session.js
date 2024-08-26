const btn2 = document.querySelector("#button2");
async function getSession() {
  const data = await fetch("http://localhost:5000/get-session", {
    method: "GET",
    headers: {
      "Content-type": "application/text",
    },
  });
  const res = await data.json();
  console.log(res);
}

btn2.addEventListener("click", getSession);
