import express,{Request, Response} from "express";
import path from "path";

const port = 3000;
const app = express();

app.set("view engine","ejs");
app.set('views', path.join(__dirname, "/views"));

app.get('/', function (request:Request, response:Response){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
    .then(res => res.json())
    .then(data => {
        response.render("index",data)
    })
})

app.get('/pokedata/:id',function(request:Request,response:Response){
    const id = request.params
    if(id.id != 'favicon.ico'){
        fetch(`https://pokeapi.co/api/v2/pokemon/${id.id}`)
        .then(res => res.json())
        .then(data => {
        response.render("detail",data)
        })  
    }
})

app.listen(port, function(){
    console.log(`Server is Running in localhost:${port}`)
});
