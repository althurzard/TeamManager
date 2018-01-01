import express from 'express'
import mongoose from 'mongoose'
import { MONGODB_URI,PORT,ADDRESS } from '../Constants'
import bodyParser from 'body-parser'
import { 
    MembersRouter,
    CreateMemberRouter,
    UpdateMemberRouter,
    RemoveMemberRouter,
    ProjectsRouter,
    CreateProjectRouter,
    UpdateProjectRouter,
    RemoveProjectRouter
} from './router'

mongoose.connect(MONGODB_URI);

const app = express()
app.use(bodyParser.json())
app.use('/get',MembersRouter)
app.use('/create-member',CreateMemberRouter)
app.use('/update-member',UpdateMemberRouter)
app.use('/remove-member',RemoveMemberRouter)
app.use('/get',ProjectsRouter)
app.use('/create-project',CreateProjectRouter)
app.use('/update-project',UpdateProjectRouter)
app.use('/remove-project',RemoveProjectRouter)

const server = app.listen(PORT, () => {
    const {address, port } = server.address()
    console.log(`Listening at http://${address}:${port}`)
})