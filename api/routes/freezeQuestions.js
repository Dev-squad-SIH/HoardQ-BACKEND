const router = require('express').Router()
const Question = require('../../models/question.js');
const Expert = require('../../models/expert.js');

router.put('/:qid', async(req, res) => {
    try {
        const qID = req.params.qid
        const expID = req.jwt_payload._id
            // Verify if the question is assigned to that expert
        const { questionsAssigned } = await Expert.findById(expID)
        if (!questionsAssigned.includes(qID)) {
            return res.status(403).json({
                message: "Forbidden - Expert has no access to the question"
            })
        }
        await Question.findByIdAndUpdate(qID, { verified: true, verifiedBy: expID })
        await Expert.findByIdAndUpdate(expID, {
            $pull: { questionsAssigned: qID }
        })
        return res.status(201).json({
            message: "Question has been frozen successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Server error"
        })
    }
})

module.exports = router;