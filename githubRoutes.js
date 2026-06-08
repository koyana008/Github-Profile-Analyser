const router=require('express').Router();
const c=require('../controllers/githubController');
router.post('/analyze/:username',c.analyze);
router.get('/profiles',c.getAll);
router.get('/profile/:username',c.getOne);
module.exports=router;