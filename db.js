const pg = require('pg')
const bcrypt = require('bcrypt')

const config = {
	user: 'bptkrhlspsakec',
	database: 'dd5oea2k62cja1',
	password: '43c9c4aa60ad062ed22cec6c3ffeeee211f80a2a6e0759858b2ee324a09b7c18',
	host: 'ec2-54-204-1-40.compute-1.amazonaws.com',
	port: 5432,
	max: 1000,
	idleTimeoutMillis: 20000,
	ssl: true
}
const pool = new pg.Pool(config);

const queryDB = (sql, arrayData)=>{
	return new Promise((resolve, reject) => {
		pool.connect((err, client, done)=>{
			if(err) return reject(err + "")
			client.query(sql, arrayData, (err_, result_)=>{
				done(err)
				if(err_ ) return reject(err_ + "")
				resolve(result_)
			})
		})
	});
}
const ThemUser = (Email, Password, Name, Image) =>{
	bcrypt.hash(Password, 10, (err, encrypt) =>{
		var sql = `INSERT INTO public."Users" ("Email", "Password", "Name", "Image")
		VALUES($1, $2, $3, $4)`
		queryDB(sql, [Email, encrypt, Name, Image])
		.then(result => console.log("Thanh Cong"))
	})
}
// ThemUser('Son', '123', 'Sonh', '')

const DangNhap = (Email, Pass) =>{
	const sql = `SELECT "Email", "Password" 
    FROM public."Users" 
    WHERE "Email"=$1`
    return new Promise((resolve, reject) => {
    	 queryDB(sql, [Email])
    	 .catch(err => reject(err))
    	 .then(result =>{
    	 	if(result.rowCount === 0){
     	 		return reject('Sai')   	 		
     	 }
    		const {Password} = result.rows[0]
    		bcrypt.compare(Pass, Password, (errHash, same)=>{
    			if(errHash) return reject(errHash)
    			if(!same) return reject('Sai')
    			resolve(same)
    		}) 

    	 })
    })
}
DangNhap('sonhoai2722', '123456')
// .then(kq => console.log(kq))
.then(kq =>{
	if (kq === 0) return console.log('Kiem tra lai thong tin');
	console.log(kq)
})
.catch(err => console.log(err))