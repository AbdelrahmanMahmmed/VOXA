const { deleteMany } = require('../../domains/feedback/feedback.model');
const { CreateFeedback, getFeedBack, getAllFeedBack, deleteOne, UpdatedResolved } = require('../../domains/feedback/feedback.repo')

exports.CreateFeedBackInDb = async (req, data) => {
    const UserId = req.user._id;
    const FeedBack = await CreateFeedback({
        ...data,
        user: UserId
    });
    return FeedBack;
}

exports.getFeedbackInDb = async (id) => {
    const feedback = await getFeedBack(id);
    if(!feedback) throw new Error('the feedback not exist')
    if(feedback.isResolved) throw new Error("The Problem is Solved");
    return feedback;
}

exports.getAllFeedbackInDb = async (type) => {
    const FeedBacks = await getAllFeedBack(type);
    return FeedBacks;
}

exports.deleteOneInDb = async (id) => {
    const feedback = await deleteOne(id);
    return feedback;
}

exports.deleteManyInDb = async () => {
    const FeedBacks = await deleteMany();
    return FeedBacks;
}

exports.UpdateIsResolved = async (isResolved , id) => {
    const feedback = await UpdatedResolved(isResolved, id);
    return feedback;
}