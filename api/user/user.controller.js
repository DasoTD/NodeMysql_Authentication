const { register, login, getUser, getUserByUserId, updateUser, deleteUser } = require('./user.model');
const { genSaltSync, hashSync, compareSync} = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports ={
    register: (req, res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        register(body, (err, results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    message: "database connection error"
                });
                
            }
            return res.status(200).json({
                data: results              
             });
        });
    }, 
    login: (req, res)=> {
        const body = req.body;
        login(body, (err, results) => {
            if(err){
                console.log(err)
            }
            if(!results){
                return res.json({
                    message: "invalid username or password"
                });
            }

            const result =  compareSync(body.password, results.password)
            if(result){
                results.password = undefined;
                const jsontoken = sign({ result: results}, process.env.Private_Keys, 
                    {expiresIn: process.env.Expire });
                    return res.json({
                        message: "login successfully",
                        token: jsontoken
                    });
            }
            else {
                return res.json({
                    message: "invalid email or password"
                });
            }
        });
    }, 
    getUser:(req, res) => {
        getUser((error, results) => {
            if(error){
                console.log(error);
                return;
            }
            return res.json({
                data : results
            })
        })
    },
    getUserByUserId:(req, res) =>{
        const id = req.params.id;
        getUserByUserId(id, (error, results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results){
                console.log("Record Not Found");
            }
            return res.json({
                data: results
            });
        });
    },
    updateUser:(req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (error, results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results){
                return res.json({
                    message: "failed to update record"
                });
            }
            
            return res.json({
                message:"update successfully"
            });
        });
    },
    deleteUser:(req, res) => {
        const id = req.params.id;
        deleteUser(id, (error, results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results){
                return res.json({
                    message: "Record Not Found"
                });
            }
            return res.json({
                message: "deleted successfully"
            });
        });
    }
}
