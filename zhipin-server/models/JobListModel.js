
const mongoose = require('mongoose')


const jobListSchema = new mongoose.Schema({
  
})


const JobListModel = mongoose.model('job_list', jobListSchema, 'job_list')


module.exports = JobListModel;