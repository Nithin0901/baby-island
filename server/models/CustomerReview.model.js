import mongoose from "mongoose";

const CustomerReviewSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    },
    productId : {
        type : mongoose.Schema.ObjectId,
        ref : "product"
    },
    CustomerReview : {
        type : String,
    },
    CustomerRating : {
        type : String,
    },
    
   
},{
    timestamps : true
})

const CustomerReviewModel = mongoose.model('CustomerReview',CustomerReviewSchema)

export default CustomerReviewModel
