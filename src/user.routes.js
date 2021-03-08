//const bcrypt = require('bcrypt')
const connection = require('./../db')

exports.register =  function(req, res){
    const password = req.body.password;
    // const encryptedPassword = await bcrypt.hash(password, salt);

    var users={
        "email":req.body.email,
        "password":req.body.password
      }
    



connection.query('insert into users ?', users, function(error, results, fields) {
    if (error) {
        res.send({"code" : 400 ,  "failed":"error ocurred"})
    }
    else{
        res.send({
            "code" : 200, "success" : "user registered Successfully."
        })
    }
})

}


exports.login = async function(req,res){
    var email= req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error occurred"
        })
      }else{
        if(results.length >0){
          const comparison = await compare(password, results[0].password)
          if(comparison){
              res.send({
                "code":200,
                "success":"login successfull"
              })
          }
          else{
            res.send({
                 "code":204,
                 "success":"Email and Password does not match"
            })
          }
        }
        else{
          res.send({
            "code":206,
            "success":"Email does not exits"
              });
        }
      }
      });
  }