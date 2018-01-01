import mongoose, {Schema} from 'mongoose'

var memberSchema  = new Schema({
    name: String,
    phoneNumber : {
        type: String,
        unique:true
    },
    projects: [{type:Schema.Types.ObjectId, ref:'Project'}],
    created: String
})


export default mongoose.model('Member',memberSchema)