const router = require('express').Router()
const Question = require('../../models/question.js');
const Expert = require('../../models/expert.js');

router.delete('/:qid', async(req, res) => {
    try {
        const qID = req.params.qid
        const expID = req.jwt_payload._id
            // Verify if the question is assigned to that expert
        const { questionsAssigned } = await Expert.findById(expID)
        if (!questionsAssigned.includes(qID)) {
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        await Question.findByIdAndDelete(qID)
        await Expert.findByIdAndUpdate(expID, {
            $pull: { questionsAssigned: qID }
        })
        return res.status(200).json({
            message: "Question has been dropped successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Server error"
        })
    }
})

module.exports = router;