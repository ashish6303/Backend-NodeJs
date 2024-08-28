import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoScheme = new Schema({
    videoFile : {
        type : String, //CloudInary URL
        required : true
    },
    thumbnail : {
        type : String,
        required : true
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    duration : {
        type : number,
        required : true
    },
    views : {
        type : number,
        default : 0,
    },
    isPublished : {
        type : Boolean,
        required : true
    }


},{timestamps : true})

videoScheme.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoScheme);