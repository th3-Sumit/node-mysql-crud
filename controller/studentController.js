const { mySqlPool } = require("../config/db");

const getAllStudents = async (req, res) => {
    try {
        
        const data = await mySqlPool.query("SELECT * FROM students");
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No data found"
            })
        }

        res.status(200).send({
            success: true,
            message: "Data fetch successfully.",
            totalStudents: data[0].length,
            data: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal Server Error in get all student api",
            error
        })
    }
}

const getStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: "Invalid Student id or provide id",
            })
        }
        const data = await mySqlPool.query(`SELECT * FROM students WHERE id=?`, [studentId])
        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "Invalid Student Id",
            })
        }

        res.status(200).send({
            success: true,
            message: "Get student details successfully.",
            data: data[0]
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal Server Error in get student api",
            error
        })

    }
}

const createStudent = async (req, res) => {
    try {
        const { name, roll_no, fees, class: standard, medium } = req.body;
        if (!name || !roll_no || !fees || !standard || !medium) {
            res.status(404).send({
                success: false,
                message: "Please enter all value",
            })
        }

        const data = await mySqlPool.query(`INSERT INTO students (name, roll_no, fees, class, medium) VALUES (?, ?, ?, ?, ?)`, [name, roll_no, fees, standard, medium]);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "Something went wrong with create student api",

            })
        }

        res.status(200).send({
            success: true,
            message: `Student ${name} Created successfully. `,
            data: data[0]
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong with create student api",
            error,
        })
    }

}

const updateStudentById = async (req, res) => {
    try {
        const dataId = req.params.id;
        const { name, roll_no, fees, class: standard, medium } = req.body;
        if (!dataId) {
            res.status(404).send({
                success: false,
                message: 'Please provide a valid student id',
            })
        }

        const data = mySqlPool.query(`UPDATE students SET name = ? , roll_no = ?, fees = ? , class = ? , medium = ? WHERE id = ?`, [name, roll_no, fees, standard, medium, dataId])
        console.log(data, "+++++")

        if(!data){
            res.status(404).send({
                success: false, 
                message: "Something went wrong. Please provide valid data."
            })
        }

        res.status(200).send({
            success: true, 
            message: "Student Data updated successfully."
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong with update student api",
            error,
        })
    }
}

const deleteStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: "Invalid Student id or provide id",
            })
        }

        const data = await mySqlPool.query(`DELETE FROM students WHERE id = ?`, [studentId])

        if(!data){
            return res.status(404).send({
                success: false,
                message: "Please provide valid student data."
            })
        }

        res.status(200).send({
            success: true, 
            message: "Student deleted successfully.",
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong with delete student api",
            error,
        })
    }
}


module.exports = { getAllStudents, getStudent, createStudent, updateStudentById, deleteStudentById };