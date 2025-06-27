import express from 'express';
import { debugLogger, uploadBookFiles, uploadErrorHandler } from '../middleware/upload.js';
import { uploadBook, getAllBooks, deleteBook  } from '../controllers/bookController.js';
import { verifyAdmin } from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/upload', verifyAdmin, uploadBookFiles, debugLogger, uploadErrorHandler, uploadBook);
router.get('/', getAllBooks);
router.delete('/:id', verifyAdmin, deleteBook);

export default router;