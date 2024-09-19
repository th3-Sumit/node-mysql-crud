const { bgBlack, bgRed } = require("colors");
const { mySqlPool } = require("../config/db");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = "shhhhh"

const getAllUsers = async(req, res) => {
    try {
        const data = await mySqlPool.query(`SELECT * FROM user_data`)
        if(!data){
            res.status(404).send({
                success: false, 
                message: "User details not found."
            })
        }
        res.status(200).send({
            success: true, 
            message: 'Get all user successfully.',
            totalUserCount: data[0].length,
            data: data[0]
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message: "Something went with Get All User Details",
            error
        })
    }
}

const signUp = async (req, res) => {
    try {
        const { username, first_name, last_name, email, password } = req.body;

        if (!username || !first_name || !last_name || !email || !password) {
            res.status(404).send({
                success: false,
                message: "Please enter all value",
            })
        }

        const varify_data = await mySqlPool.query(`SELECT * FROM user_data WHERE username = ? AND email = ?`, [username, email])

        // if(varify_data){
        //     console.log(varify_data,bgBlack.magenta)
        //     res.status(400).send({
        //         success: false, 
        //         message: "User already exist."
        //     })
        // }else{

            const cryptedPassword = await bcrypt.hash(password, 10);

            const data = await mySqlPool.query(`INSERT INTO user_data (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)`, [username, first_name, last_name, email, cryptedPassword]);

            const token = jwt.sign({username: data[0].username, id: data[0].id}, SECRET_KEY)
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Something went wrong with create student api",
    
                })
            }

            res.status(200).send({
                success: true,
                message: `User ${username} Created successfully. `,
                token: token
            })

        // }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong with create student api",
            error,
        })
    }

}

const signIn = async (req, res) => {

    var {email, password} = req.body;
    password=await bcrypt.hash(password, 10);
    console.log(req.body, "++++")
    try {
        const varify_data = await mySqlPool.query(`SELECT * FROM user_data WHERE username = ? AND password = ? `, [email,password])

        if(!varify_data){
            return res.status(400).send({
                success: false, 
                message: "User not available"
            })
        }

        const token = jwt.sign({username: email}, SECRET_KEY)
        res.status(200).send({"username":email,"token":token});
        

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong with login",
            error,
        })
    }
}



module.exports = {getAllUsers, signUp,signIn};