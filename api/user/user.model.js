const db = require("../../config/database");


module.exports ={
    register:(data, callBack)=>{
        db.query(`select email from users where email = ?`, [data.email], (error, res) => {
            if(error){
                return callBack(error)
            }
            if(res.length != 0){
                return callBack("email has already been used");
                
            }
            else {
                db.query(`insert INTO users(surname, othername, email, password, number)
                values(?,?,?,?,?)`, 
                [data.surname,
                data.othername,
                data.email,
                data.password,
                data.number], (error, results) =>{
                    if(error){
                        return callBack(error, null);
                    }
                    return callBack(null, results)
                });
            }
        });

    },
    login:(data, callBack) => {
        db.query(`select * from users where email = ?`, [data.email], (error, results)=>{
            if(error){
                return callBack(error, null);
            }
            return callBack(null, results[0])
        })
    },
    getUser: callBack => {
        db.query(`select * from users`, [], (error, results) => {
            if(error){
                return callBack(error, null);
            }
            return callBack(null, results);
        });
    },
    getUserByUserId:(id, callBack) => {
        db.query(`select id,surname, othername, email,password,number from users where id = ?`,
         [id], (error, results) => {
            if(error) {
                return callBack(error, null);
            }
            return callBack(null, results[0]);
        });
    },
    updateUser:(data, callBack) => {
        db.query(`update users set surname = ?, othername = ?, email =?, password = ?, number = ? where id = ?`,
        [
            data.surname,
            data.othername,
            data.email,
            data.password,
            data.number,
            data.id
        ], (error, results) =>{
            if(error){
                return callBack(error, null);
            }return callBack(null, results[0]);
        })
    }, 
    deleteUser: (id, callBack) => {
        db.query(`delete from users where id = ?`, [id], (error, results) => {
            if(error){
                return callBack(error, null);
            }
            return callBack(results, null);
        });
    }
}