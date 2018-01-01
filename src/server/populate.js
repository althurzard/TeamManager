import mongoose, { Schema, Mongoose } from 'mongoose'
import moment from 'moment'
import Member from './models/Member'
import Project from './models/Project'
import { MONGODB_URI } from '../Constants'

const members = [
    {
        name: 'Nguyễn Ngọc Hùng',
        phoneNumber: '0971778023',
        created: moment().format('MM/DD/YYYY h:mm:ss A')
    },
    {
        name: 'Trần Văn Toàn',
        phoneNumber: '098325232',
        created: moment().format('MM/DD/YYYY h:mm:ss A')
    },
    {
        name: 'Đào Duy Đoàn',
        phoneNumber: '091133742',
        created: moment().format('MM/DD/YYYY h:mm:ss A')
    },
    {
        name: 'Trương Bá Lộc',
        phoneNumber: '090932351',
        created: moment().format('MM/DD/YYYY h:mm:ss A')
    },
    {
        name: 'Hà Mạnh Tuân',
        phoneNumber: '093729310',
        created: moment().format('MM/DD/YYYY h:mm:ss A')
    }
]

const projects = [
    {
        name:'Phần mềm quản lý kho sách',
        created: moment().format('MM/DD/YYYY h:mm:ss A')
    },
    {
        name:'Cảm biến đo lưu lượng, mực chất lỏng',
        created: moment().format('MM/DD/YYYY h:mm:ss A')
    },
    {
        name:'Hệ thống bãi giữ xe ô tô tự động',
        created: moment().format('MM/DD/YYYY h:mm:ss A')
    },
]

mongoose.connect(MONGODB_URI,null,(err) => {
    projects.map(data => {
        var project = new Project(data)
        project.save()
    })
    members.map(data => {
        var member = new Member(data)
        member.save()
    })
})






