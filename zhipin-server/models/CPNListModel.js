
const mongoose = require('mongoose')


const jobListSchema = new mongoose.Schema({
  
})


const CPNListModel = mongoose.model('cpn_list', jobListSchema, 'cpn_list')


module.exports = CPNListModel;