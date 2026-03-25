const express = require("express");
const { Contribution, Investment, sequelize } = require("../models");

const app = express();
app.use(express.json());

// 🔥 DB + Server startup with retry
const startServer = async () => {
    let connected = false;

    while (!connected) {
        try {
            await sequelize.authenticate();
            console.log("✅ DB Connected");
            connected = true;
        } catch (err) {
            console.log("⏳ Waiting for DB...");
            await new Promise(res => setTimeout(res, 5000));
        }
    }

    // Sync after DB is ready
    await sequelize.sync();

    app.listen(3000, () => console.log("🚀 SMSF App Running"));
};

startServer();

// ---------------- APIs ----------------

// Create Contribution
app.post("/contributions", async (req, res) => {
    const data = await Contribution.create(req.body);
    res.json(data);
});

// Approve Contribution
app.put("/contributions/:id/approve", async (req, res) => {
    const c = await Contribution.findByPk(req.params.id);
    if (!c) return res.status(404).json({ error: "Not found" });

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
    if (!inv) return res.status(404).json({ error: "Not found" });

    inv.status = "APPROVED";
    await inv.save();
    res.json(inv);
});

// Execute Investment
app.put("/investments/:id/execute", async (req, res) => {
    const inv = await Investment.findByPk(req.params.id);
    if (!inv) return res.status(404).json({ error: "Not found" });

    inv.status = "EXECUTED";
    await inv.save();
    res.json(inv);
});
