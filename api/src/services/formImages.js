const multer = require('multer');

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ){
        cb(null, true);
    }else{
        cb(new Error('Formato no soportado. El archivo debe ser jpeg, jpg o png'), false);//rejects files
    }
}
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploadedImages/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    }
})
module.exports ={ 
    fileFilter,
    storage
}
