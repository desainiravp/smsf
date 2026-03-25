const express = require("express");
const { Contribution, Investment, sequelize } = require("../models");

const app = express();
app.use(express.json());

// Sync DB
sequelize.sync();

// Create Contribution
app.post("/contributions", async (req, res) => {
    const data = await Contribution.create(req.body);
    res.json(data);
});

// Approve Contribution
app.put("/contributions/:id/approve", async (req, res) => {
    const c = await Contribution.findByPk(req.params.id);
    c.status = "APPROVED";
    await c.save();
    res.json(c);
});

// Create Investment
app.post("/investments", async (req, res) => {
    const inv = await Investment.create(req.body);
    res.json(inv);
});

// Approve Investment
app.put("/investments/:id/approve", async (req, res) => {
    const inv = await Investment.findByPk(req.params.id);
    inv.status = "APPROVED";
    await inv.save();
    res.json(inv);
});

// Execute Investment
app.put("/investments/:id/execute", async (req, res) => {
    const inv = await Investment.findByPk(req.params.id);
    inv.status = "EXECUTED";
    await inv.save();
    res.json(inv);
});

app.listen(3000, () => console.log("SMSF App Running"));
