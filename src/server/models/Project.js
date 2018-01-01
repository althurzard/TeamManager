import mongoose, {Schema} from 'mongoose'

var projectSchema  = new Schema({
    name: {
        type: String,
        unique: true
    },
    members: [{type:Schema.Types.ObjectId, ref:'Member'}],
    created: String
})


export default mongoose.model('Project',projectSchema)