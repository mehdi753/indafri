const express = require('express');
const router = express.Router();
const contactCtrl = require('../controller/contactCtrl');

router.post('/save', contactCtrl.saveMsg);
router.get('/view/all/', contactCtrl.viewMsgs);
router.get('/view/user/', contactCtrl.viewMsgsByEmail);
router.delete('/delete/msg', contactCtrl.deleteMsg);
router.delete('/clear/all', contactCtrl.clearAllMsgs)

module.exports = router;