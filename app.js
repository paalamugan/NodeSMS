const express=require('express');
const bodyParser=require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');


//init nexmo

const nexmo= new Nexmo({
    apiKey:'<api_key>',
    apiSecret:'<api_secret>'
},{debug:true});


//init app
const app=express();


app.set('view engine','html');
app.engine('html',ejs.renderFile);


app.use(express.static(__dirname+'/public'));


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res,next)=>{
    res.render('index');
});


app.post('/',(req,res)=>{
    
    const from = "9089018901";
    const to= req.body.number;
    const text= req.body.text;
    nexmo.message.sendSms(
    from, to, text, { type:'unicode' },
    (err,responseData)=>{
        if(err){
            console.log(err);

        }else{
            console.dir(responseData);
        }
    }
    );
});

app.set("port", 3000);


const server= app.listen(app.get("port"),() => console.log(`sever started on port ${app.get("port")}`));
