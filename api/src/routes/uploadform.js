const { Router } = require('express');
const multer = require('multer');
const { storage, fileFilter } = require('../services/formImages');

const upload = multer({storage: storage, limits: {fileSize: 1024*1024*5}, fileFilter: fileFilter});


const router = Router();

router.post('/form', upload.single('profileImage'), (req,res,next)=>{
    console.log(req.file);
    res.send('cargada')

} )

module.exports = router;