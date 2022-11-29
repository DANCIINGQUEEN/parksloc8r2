const express = require('express');
const router = express.Router();
// const ctrlMain=require('../controllers/main')

const ctrlLocations=require('../controllers/locations')
const ctrlOthers=require('../controllers/others')


/*GET home page. */
/*Location pages*/
router.get('/', ctrlLocations.homeList);
router.get('/location/:locationid', ctrlLocations.locationInfo);
// router.get('/location/review/new', ctrlLocations.addReview);
router
    .route('/location/:locationid/review/new')
    .get(ctrlLocations.addReview)
    .post(ctrlLocations.doAddReview)
//2017125009 박지웅
/*Other pages*/
router.get('/about', ctrlOthers.about)



module.exports = router;
