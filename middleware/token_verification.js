const jwt = require("jsonwebtoken");

const token_verification = async (req, res) => {
    
    const { token } = req.body;
    
    
    try {
        
      await jwt.verify(token, 'shhhhh');
      return ;
      console.log("testing ")

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong with token verification",
            
        })
    }
}

module.exports = token_verification;