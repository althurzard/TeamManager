import Member from '../models/Member'
import Project from '../models/Project'
import moment from 'moment'


Member.schema.pre('remove', function(next){
    this.model('Project').update(
        {_id: {$in: this.projects}}, 
        {$pull: {members: this._id}}, 
        {multi: true},
        next
    )
})

Member.schema.pre('save', function(next){
    this.model('Project').update(
        {$and : [{_id: {$in: this.projects}},{members:{$ne:this._id}}]}, 
        {$push: {members: this._id}}, 
        {multi: true},
        next
    )
})

export const Members =  (req, res, next) => {

    const execute = (populate = null,condition = {}) => {
        if (populate) {
            Member
            .find(condition)
            .populate(populate)
            .lean()
            .exec((err,members) => {
                if (err) return next(err)
                res.json({members})
            })
        } else {
            Member
            .find(condition)
            .lean()
            .exec((err,members) => {
                if (err) return next(err)
                res.json({members})
            })
        }
        
    }

    console.log('Fetch Members')
    try {
        
        const jsonValue = JSON.parse(req.params.query)
        const {project_id_not_in} = jsonValue
        if (project_id_not_in) {
            
            execute(null,{ projects:{$ne: project_id_not_in}})
        } else {
            //TODO: Handle other query
            execute({'path':'projects'})
        }
    } catch(e) {
            execute({'path':'projects'})
    }
    
 }

 export const CreateMember = (req,res,next) => {
    const data = {
        ...req.body,
        created:moment().format('MM/DD/YYYY h:mm:ss A')
    }
    const newMember = new Member(data)
    newMember.save((err, member) => {
        if (err) return next(err)
        res.json({member})
    });
 }

 export const RemoveMemberById = (req,res,next) => {
     Member.findByIdAndRemove(req.body._id,(err) => {
        if (err) return next(err)
        res.json({success:true})
     })
 }

 export const UpdateMemberById = (req,res,next) => {
    Member.findById(req.body._id,(err,member) => {
        if (err) return next(err)
        //remove refs of the removed projects, if any
        Project.update(
            {$and: [{_id: {$in: member.projects}},{_id: {$nin: req.body.projects}}]}, 
            {$pull: {members: member._id}}, 
            {multi: true},
            (err,v) => {
                if (err) return next(err)
                // update new state
                Member.findByIdAndUpdate(req.body._id,{
                    $set:
                    { 
                        name: req.body.name,
                        phoneNumber: req.body.phoneNumber,
                        projects: req.body.projects
                    }},{new:true},(err,member) => {
                        if (err) return next(err)
                        member.save()
                        res.json({member})
                    })
            }
        )
    })
    
 }


