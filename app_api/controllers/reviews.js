const mongoose = require('mongoose')
const Loc = mongoose.model('Location')

//2017125009 박지웅
const doSetAverageRating = (location) => {
    if (location.reviews && location.reviews.length > 0) {
        const count = location.reviews.length
        const total = location.reviews.reduce((acc, {rating}) => {
            return acc + rating
        }, 0)
        location.rating = parseInt(total / count, 10)
        location.save(err => {  //parent 다큐먼트 저장
            if (err) {
                console.log(err)
            } else {
                console.log(`Average rating updated to ${location.rating}`)
            }
        })
    }
}

const updateAverageRating = (locationId) => {
    Loc.findById(locationId)
        .select('rating reviews')
        .exec((err, location) => {
            if (!err) {
                doSetAverageRating(location)
            }
        })
}

const doAddReview = (req, res, location) => {
    if (!location) {
        res
            .status(404)
            .json({"message": "Location not found"})
    } else {
        const {author, rating, reviewText} = req.body
        location.reviews.push({
            author,
            rating,
            reviewText
        })
        location.save((err, location) => {
            if (err) {
                res
                    .status(400)
                    .json(err)
            } else {
                updateAverageRating(location._id)
                const thisReview = location.reviews.slice(-1).pop()
                res
                    .status(201)
                    .json(thisReview)
            }
        })
    }
}

const reviewsCreate = (req, res) => {
    const locationId = req.params.locationid
    if (locationId) {
        Loc
            .findById(locationId)
            .select('reviews')
            .exec((err, location) => {
                if (err) {
                    res
                        .status(400)
                        .json(err)
                } else {
                    doAddReview(req, res, location) //리뷰 추가하는 함수
                }
            })
    } else {
        res
            .status(404)
            .json({"message": "Location not found"})
    }
}

const reviewsReadOne = (req, res) => {  //2017125009 박지웅
    Loc
        .findById(req.params.locationid)
        //몽고db에게 lcoation의 name, reiviews만 얻고싶다고 말함
        // select메소느듣 검색하고싶은 패스를 공백으로 구분해주는 문자열로 받아들임
        .select('name reviews')
        .exec((err, location) => {
            //콜백 함수에서 review 변수에 1개의 리뷰가 반환
            if (!location) {
                return res
                    .status(404)
                    .json({"message": "location not found"})
            } else if (err) {
                return res
                    .status(404)
                    .json(err)
            }
            if (location.reviews && location.reviews.length > 0) {
                const review = location.reviews.id(req.params.reviewid)
                if (!review) {
                    return res
                        .status(404)
                        .json({"message": "review not found"})
                } else {
                    const response = {
                        location: {
                            name: location.name,
                            id: req.params.locationid
                        },
                        review
                    }
                    return res
                        .status(200)
                        .json(response)
                }
            } else {
                return res
                    .status(404)
                    .json({"message": "No reviews found"})
            }
        })
}

const reviewsUpdateOne = (req, res) => {
    if (!req.params.locationid || !req.params.reviewid) {   //201712509 박지웅
        return res
            .status(404)
            .json({
                "message": 'Not found, locationid and reviewid are both required'
            })
    }
    Loc
        .findById(req.params.locationid)
        .select('reviews')
        .exec((err, location) => {
            if (!location) {
                return res
                    .status(404)
                    .json({
                        "message": "Location not found"
                    })
            } else if (err) {
                return res
                    .status(400)
                    .json(err)
            }
            if (location.reviews && location.reviews.length > 0) {
                const thisReview = location.reviews.id(req.params.reviewid)
                if (!thisReview) {
                    res
                        .status(404)
                        .json({
                            "message": "Review not found"
                        })
                } else {
                    thisReview.author = req.body.author
                    thisReview.rating = req.body.rating
                    thisReview.reviewText = req.body.reviewText
                    location.save((err, location) => {
                        if (err) {
                            res
                                .status(404)
                                .json(err)
                        } else {
                            updateAverageRating(location._id)
                            //JSON 응답 반환, save()가 성공할경우  서브 다큐먼트 객체 전달
                            res
                                .status(200)
                                .json(thisReview)
                        }
                    })
                }
            } else {
                res
                    .status(404)
                    .json({
                        "message": "No review to update"
                    })
            }
        })
}

const reviewsDeleteOne = (req, res) => {    //2017125009 박지웅
    const {locationid, reviewid}=req.params
    if(!locationid||!reviewid){
        return res
            .status(404)
            .json({'message':"Not found, locationid and reviewid are both required`"})
    }
    Loc
        .findById(locationid)
        .select('reviews')
        .exec((err, location)=>{
            if(!location){
                return res
                    .status(404)
                    .json({"message":'Location not found'})
            }else if(err){
                return res
                    .status(400)
                    .json(err)
            }
            if(location.reviews&&location.reviews.length>0){
                if(!location.reviews.id(reviewid)){
                    return res
                        .status(404)
                        .json({"message":'Review not found'})
                }else{
                    location.reviews.id(reviewid).remove()
                    location.save(err=>{
                        if(err){
                            return res
                                .status(404)
                                .json(err)
                        }else{
                            updateAverageRating(location._id)
                            res
                                .status(204)
                                .json(null)
                        }
                    })
                }
            }else{
                res
                    .status(404)
                    .json({'message':'No Review to delete'})
            }
        })
}

module.exports = {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne
}