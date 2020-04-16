conn = new Mongo("localhost:27017");
db = conn.getDB("zhipin");

let arr = {
	phone: '15607002736',
	name:'游冰珊',
	experience: '20年应届生',
	degree: '本科学历',
	status: '在校-考虑机会',
	tel: '15607002736',
	// weixin:,
	mail: 'turing@5467.com',
	gender: '女',
	avatar: 'https://img.bosszhipin.com/beijin/upload/avatar/20200304/0a7f3828eb9dc5bd25538ce21a3df1f347d15942865ce68082d3699c8edf76c1_s.jpg',
	superiority: '无',
	expect_job: '不限',
	expect_salary: '不限',
	expect_industry:'不限',
	expect_city:'不限',
	intern: [{
		CPNName: '公司名',
		starttime: 'xx',
		endtime: 'cc',
		department: '技术部',
		jobName:'前端开发',
		content:'工作内容',
		profit: '业绩',
		tags: ['js','java']
	}],  //实习
	project: [{
		name: '优购',
		starttime: 'xx',
		endtime: 'xx',
		job: '工程师',
		content:'内容',
		profit:'业绩',
		link: 'xxx'
	}],
	education: [{
		school: '江西理工',
		startYear: '2016',
		endYear: '2020',
		specialty: '信息安全',
		eduBG: '本科',
		experience: '经历'
	}],
	certificate: ['大学英语四级']
}

// // // db.abc.drop();
// db.createCollection('job_list',{safe:true},function(err,collection){
//     if(err){
//         console.log(err);
//     }    
// });
db.user_detail.insert(arr, (err, data) =>{
	console.log('success');
	
});