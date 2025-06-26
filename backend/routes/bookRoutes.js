import express from 'express';
import { uploadBookFiles } from '../middleware/upload.js';
import { uploadBook, getAllBooks, deleteBook  } from '../controllers/bookController.js';
import { verifyAdmin } from '../middleware/authmiddleware.js';


const router = express.Router();

router.post('/upload', verifyAdmin, uploadBookFiles, uploadBook);
router.get('/', getAllBooks);
router.delete('/:id', verifyAdmin, deleteBook);

export default router;