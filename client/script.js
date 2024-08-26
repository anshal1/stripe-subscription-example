const btn = document.querySelector("#button");

btn.addEventListener("click", async () => {
  const data = await fetch("http://localhost:5000/create-stripe-session", {
    method: "POST",
    headers: {
      "Content-type": "application/text",
    },
  });
  const res = await data.text();
  window.location.href = res;
});
