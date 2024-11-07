const express = require("express")
const app = express()
const ejs = require("ejs")


app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))


let alluser = []
let errormessage ;
app.get("/",(request, response)=>{
//    response.send("Welcome to node class")
// response.send([
//     {"name":"Shola", "age":20, "class":"Node"},
//     {"name":"bola", "age":27, "class":"React"},
//     {"name":"Tola", "age":28, "class":"Angular"},
//     {"name":"Kola", "age":25, "class":"Php"}
// ])
console.log(__dirname);

// response.sendFile(__dirname + '/index.html')
response.render("index",{name:"Shola", gender:"male"})
})


app.get("/signup",(req, res)=>{
   res.render("signup",{errormessage})
})

app.get("/login",(req, res)=>{
   res.render("login")
})

app.post("/user/signup",(req,res)=>{
  const {email, username , password} = req.body
if (!email || !username || !password) {
   console.log("input fields cannot be empty");
   errormessage = "input fields cannot be empty"
   res.redirect("/signup")
}else{
   alluser.push(req.body)
   res.redirect("/login")
}
})

app.post("/user/login",(req,res)=>{
   console.log(req.body);
   const {email, password} = req.body
  const existemail = alluser.find((user)=> user.email == email)
  if (existemail && existemail.password == password) {
   console.log("login successful");
   res.redirect("/")
  }else{
   console.log("invalid user");
   res.redirect("/login")
  }
})

const port = 5007

app.listen(port,()=>{
   console.log(`app stated on port ${port}`);
   
})



