const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const bodyParser = require("body-parser");
const endpointSecret = keys.stripeWebHookKey;
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/create-checkout-session", requireLogin, async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Add Credits To Your Account",
            },
            unit_amount: 500,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/success",
    });

    res.json({ id: session.id });
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
