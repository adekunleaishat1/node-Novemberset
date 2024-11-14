const express = require("express")
const app = express()
const ejs = require("ejs")
const mongoose = require("mongoose")


app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))

 //CRUD CREATE, READ, UPDATE AND DELETE
 const userschema = mongoose.Schema({
     username:{type:String},
     email:{type:String},
     password:{type:String}
  })

const usermodel = mongoose.model("user_collection",userschema)


let alluser = []
let todoarray = []
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

app.post("/user/signup", async(req,res)=>{
  const {email, username , password} = req.body
if (!email || !username || !password) {
   console.log("input fields cannot be empty");
   errormessage = "input fields cannot be empty"
   res.redirect("/signup")
}else{
   // alluser.push(req.body)
  const user = await usermodel.create(req.body)
  if (user) {
   res.redirect("/login")
  }
  
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

app.get("/todo",(req, res)=>{
   res.render("todo",{todoarray})
})

app.post("/addtodo",(req,res)=>{
   // console.log(req.body);
   todoarray.push(req.body)
   res.redirect("/todo")
   
})

app.post("/todo/delete/:index", (req,res)=>{
   console.log(req.params);
   
   // console.log(req.body);
   const {index} = req.params
   todoarray.splice(index, 1)
   res.redirect("/todo")
})

app.get("/todo/edit/:index",(req,res)=>{
   console.log(req.params);
   const {index} = req.params
 const onetodo = todoarray[index]
   res.render("edit",{onetodo, index})
})


app.post("/todo/update/:index",(req, res)=>{
  console.log(req.body);
  console.log(req.params);
  const { index } = req.params
  todoarray[index] = req.body
  res.redirect("/todo")
})


const uri = "mongodb+srv://aishatadekunle877:aishat@cluster0.t92x8pf.mongodb.net/novemberclass?retryWrites=true&w=majority&appName=Cluster0"

const connect = async() =>{
   try {
    const connection = await  mongoose.connect(uri)
    if (connection) {
     console.log("database connected successfully");
    }

   } catch (error) {
      console.log(error);
      
   }
}
connect()

const port = 5007

app.listen(port,()=>{
   console.log(`app stated on port ${port}`);
   
})



