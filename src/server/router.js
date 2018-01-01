import { Router } from 'express'

import {
    Members,
    CreateMember,
    UpdateMemberById,
    RemoveMemberById,
    Projects,
    CreateProject,
    UpdateProjectById,
    RemoveProjectById,
    ErrorHandler
} from './controllers'

const MembersRouter = Router()
MembersRouter.route('/members.json/:query').get(Members,ErrorHandler)

const CreateMemberRouter = Router()
CreateMemberRouter.route('/').post(CreateMember,ErrorHandler)

const UpdateMemberRouter = Router()
UpdateMemberRouter.route('/').post(UpdateMemberById,ErrorHandler)

const RemoveMemberRouter = Router()
RemoveMemberRouter.route('/').post(RemoveMemberById,ErrorHandler)

const ProjectsRouter = Router()
ProjectsRouter.route('/projects.json/:query').get(Projects,ErrorHandler)

const CreateProjectRouter = Router()
CreateProjectRouter.route('/').post(CreateProject,ErrorHandler)

const RemoveProjectRouter = Router()
RemoveProjectRouter.route('/').post(RemoveProjectById,ErrorHandler)

const UpdateProjectRouter = Router()
UpdateProjectRouter.route('/').post(UpdateProjectById,ErrorHandler)


export {
    MembersRouter,
    CreateMemberRouter,
    UpdateMemberRouter,
    RemoveMemberRouter, 
    ProjectsRouter,
    CreateProjectRouter,
    UpdateProjectRouter,
    RemoveProjectRouter
}