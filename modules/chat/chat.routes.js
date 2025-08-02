const express = require('express');
const { GetOne, DeleteChat } = require('./chat.controller');
const { ProtectedRoters } = require('../../shared/middlewares/auth');
const { vaildationChatId } = require('./chat.validators');


const router = express.Router();

router.use(ProtectedRoters);
router
    .route('/:id')
    .get(vaildationChatId, GetOne)
    .delete(vaildationChatId, DeleteChat)

module.exports = router;