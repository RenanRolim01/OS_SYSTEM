const express = require('express');
const { createOS, getOS } = require('../controllers/osController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.use(authMiddleware);
router.post('/', upload.single('photo'), createOS);
router.get('/', getOS);

module.exports = router;