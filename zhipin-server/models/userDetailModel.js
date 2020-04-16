const mongoose = require('mongoose')



const schema = new mongoose.Schema({
    phone: {
        type: String,
        default: '',
    },
    name: String,
	experience: String,
	degree: String,
	status: String,
	tel: String,
	mail: String,
	gender: String,
	avatar: String,
	superiority: String,
	expect_job: String,
	expect_salary: String,
	expect_industry:String,
    expect_city:String,
    weixin: String,
    birth: Date,
    intern: {
        type: Array,
        default: []
    },
    project: {
        type: Array,
        default: []
    },
    education: {
        type: Array,
        default: []
    },
    certificate: {
        type: Array,
        default: []
    }
})


const userDetailModel = mongoose.model('user_detail', schema, 'user_detail')

module.exports = userDetailModel;