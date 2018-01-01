import Project from '../models/Project'
import Member from '../models/Member'
import moment from 'moment'


Project.schema.pre('remove', function(next){
    this.model('Member').update(
        {_id: {$in: this.members}}, 
        {$pull: {projects: this._id}}, 
        {multi: true},
        next
    );
});

Project.schema.pre('save', function(next){
    this.model('Member').update(
        {$and : [{_id: {$in: this.members}},{projects:{$ne:this._id}}]}, 
        {$push: {projects: this._id}}, 
        {multi: true},
        next
    );
});


export const Projects =  (req, res, next) => {


    const execute = (populate = null,condition = {}) => {
        if (populate) {
            Project.find(condition)
            .populate(populate)
            .lean()
            .exec((err,projects) => {
                if (err) return next(err)
                res.json({projects})
            })
        } else {
            Project.find(condition)
            .lean()
            .exec((err,projects) => {
                if (err) return next(err)
                res.json({projects})
            })
        }
        
    }

    try {
        const jsonValue = JSON.parse(req.params.query)
        const {member_id_not_in} = jsonValue
        if (member_id_not_in) {
            execute(null,{"members":{"$ne":member_id_not_in}})
        } else {
            //TODO: Handle other query
            execute({path:'members'})
        }
    } catch(e) {
            execute({path:'members'})
    }
    
 }

 export const CreateProject = (req,res,next) => {
    const data = {
        ...req.body,
        created:moment().format('MM/DD/YYYY h:mm:ss A')
    }
    const newProject = new Project(data)
    newProject.save((err, project) => {
        console.log(err);
        
        if (err) return next(err)
        res.json({project})
    });
 }

 export const RemoveProjectById = (req,res,next) => {
     Project.findByIdAndRemove(req.body._id,(err) => {
        if (err) return next(err)
        res.json({success:true})
     })
 }

 export const UpdateProjectById = (req,res,next) => {
    Project.findById(req.body._id,(err,project) => {
        if (err) return next(err)
        //remove refs of the removed members, if any
        Member.update(
            {$and: [{_id: {$in: project.members}},{_id:{$nin:req.body.members}}]}, 
            {$pull: {projects: project._id}}, 
            {multi: true},
            (err,v) => {
                // update new state
                Project.findByIdAndUpdate(project._id,{
                    $set:
                    { 
                        name: req.body.name,
                        members: req.body.members
                    }},{new:true},(err,project) => {
                        if (err) return next(err)
                        project.save()
                        res.json({project})
                    })
            }
        );
    })
    
 }