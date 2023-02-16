
const sql = require('mssql');

const config = {
    server: 'db-soa-rds.ideacrm.com.br',
    database: 'vivo_chat',
    user: 'usrGVP',
    password: '@Siemens12!@',
    port: 10000,
    options: {
       encrypt: false
    }
 };
 

const conn = async () =>{
    
    sql.connect(config, err => {
        if (err) {
           console.log(err);
        } else {
           console.log('Connected to SQL Server successfully! 111');
        }
     });
};

conn();

module.exports = conn;