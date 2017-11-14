const http=require('http');
const express=require('express');
const app=express();
const server=http.createServer(app);
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const createUser=require('./backend/createUser.js');
const authenticateUser=require('./backend/authenticateUser.js');
const createSocketSession=require('./backend/createSocketSession.js');
const gibber=require('./backend/scrambler/gibber.js');

server.listen(8080, "127.0.0.1",()=>{
  console.log('listening 8080');
});
/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
 app.use(bodyParser.urlencoded({
     extended: true
 }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname));

app.get('/',(req,res)=>{
  console.log('hello');
  let cookie = req.cookies.token;
  if(cookie==undefined){
    res.redirect('/login');
  }
  else{
    res.redirect('/chat');
  }

});
app.get('/login',(req,res)=>{
  let cookie = req.cookies.token;
  if(cookie==undefined){

  }
  else{
      res.clearCookie("token");
  }
  res.sendFile(__dirname + '/login.html');
});

app.get('/signup',(req,res)=>{
  let cookie = req.cookies.token;
  if(cookie==undefined){

  }
  else{
      res.clearCookie("token");
  }
  res.sendFile(__dirname + '/signup.html');
});

app.post('/createuser',(req,res)=>{
  createUser(req,function(responseData){
    res.send(responseData);
  })
});

app.post('/authenticate',(req,res)=>{

  authenticateUser(req,res,function(responseData){
    res.send(responseData);
  });
})

app.get('/chat',(req,res)=>{
  let cookie = req.cookies.token;
  if(cookie==undefined){
      res.redirect('/login');
  }
  else{
      res.sendFile(__dirname + '/chat.html');
      createSocketSession(req,server,function(data){
        if(data=='login'){
            res.redirect('/login');
          //console.log('login');
        }
      });
   }
});
