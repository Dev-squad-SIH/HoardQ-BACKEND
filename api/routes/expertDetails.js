const expertDetailsRouter = require("express").Router();
const Expert = require("../../models/expert.js");

expertDetailsRouter.get("/", async (req, res) => {
  try {
    const expertId = req.jwt_payload._id
    const expert = await Expert.findById(expertId)
      .select('-password')
      .populate('questionsAssigned');
    if (expert) return res.status(200).json({ expert: expert });
    return res.status(400).json({ message: "Expert not founnd" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = expertDetailsRouter;
