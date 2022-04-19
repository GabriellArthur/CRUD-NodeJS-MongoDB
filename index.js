//config inicial
require('dotenv').config()
const express= require('express')
const { default: mongoose } = require('mongoose')
const app = express()

// forma de ler JSON | middlewares
app.use(
   express.urlencoded({
      extended:true
   })
)

app.use(express.json())

// rota inicial | endpoint
app.get('/',(request,response)=>{
   response.json({message:'OI'})
})

// rotas da API
const personRouters = require('./routes/personRoutes')
app.use('/person',personRouters)

//entregar uma porta
const DB_USER =process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
mongoose
   .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.zdnss.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
      .then(()=>{
         console.log("Conectado ao mongoDB");
         app.listen(3000)
      })
      .catch((err)=>console.log(err))
