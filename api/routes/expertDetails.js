const expertDetailsRouter = require("express").Router();
const Expert = require("../../models/expert.js");

expertDetailsRouter.get("/ById/:id", async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (expert) return res.status(200).json({ expert: expert });
    return res.status(400).json({ message: "Expert not founnd" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = expertDetailsRouter;
