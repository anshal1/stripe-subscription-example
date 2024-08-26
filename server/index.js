import "dotenv/config";
import e from "express";
import Stripe from "stripe";
import cors from "cors";

const app = e();
const PORT = 5000;

const map = new Map();

const stripe = new Stripe(process.env.STRIPE_SECRET);

app.use(
  cors({
    origin: "*",
  })
);

app.use(e.json());

app.post("/create-stripe-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: "http://127.0.0.1:5500/client/index.html",
      cancel_url: "http://127.0.0.1:5500/client/cancel.html",
      line_items: [{ price: "price_1PrzPdSHcZ47nI47ffbr1hae", quantity: 10 }],
      mode: "subscription",
      billing_address_collection: "required",
    });
    map.set("anshal", {
      sessionId: session.id,
      sessionUrl: session.url,
      activePlane: false,
    });
    res.send(session.url);
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/get-session", async (req, res) => {
  const user = map.get("anshal");
  if (!user.sessionId) return;
  const session = await stripe.checkout.sessions.retrieve(user.sessionId);
  if (session.payment_status !== "paid") {
    return res.status(400).json({ error: "User has not paid" });
  }
  map.set("anshal", {
    sessionId: user.sessionId,
    sessionUrl: user.sessionUrl,
    activePlane: true,
  });
  res.json(map.get("anshal"));
});

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
