const mongoose = require('mongoose')

const openingTimeSchema = new mongoose.Schema({
    days: {
        type: String,
        required: true
    },
    opening: String,
    closing: String,
    closed: {
        type: Boolean,
        required: true
    }
})
//2017125009 박지웅
const reviewSchema = new mongoose.Schema({
    author: {
        type:String,
        required:true

    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: {
        type:String,
        required:true
    },
    createdOn: {
        type: Date,
        'default': Date.now
    }
})


const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        //만일 name필드가 누락된 경우, create()메소드는 오류 발생을 알리고
        //다큐먼트를 DB에 저장하지 않는다
    },
    address: String,
    rating: {
        type: Number,
        'default': 0,
        min: 0,
        max: 5
    },
    facilities: [String],
    coords: {
        type: {type: String},
        coordinates: [Number]
    },
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
})


locationSchema.index({coords: "2dsphere"})
mongoose.model('Location', locationSchema)