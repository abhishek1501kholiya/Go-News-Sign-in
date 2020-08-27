var canvas;
var bg;
var displayname ;
var  email;
var password;
var message;
var login , createAccount;
var gameState = "form";
function preload(){
    bg = loadImage("image.jpg");
}
function setup(){
 canvas = createCanvas(displayWidth,displayHeight);
 displayname = createInput('');
 email = createInput('Enter your email');
 password = createInput('');
 message = createElement('h4');
 login = createButton("Login");
 createAccount = createButton("CreateAccount");
}
function draw(){
background(bg);
fill("brown");
if(gameState === "form"){
rect(545,displayHeight/2-50,220,160);

displayname.position(displayWidth/2-195,displayHeight/2);
displayname.show();
message.html("Please enter your name");
message.position(displayWidth/2-215,displayHeight/2-50);
message.show();
email.position(displayWidth/2-195,displayHeight/2+40);
email.show();
password.position(displayWidth/2-195,displayHeight/2+80);
password.show();
login.position(700,600);
createAccount.position(700,650);
login.mousePressed(()=>{
 
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
          var userId = firebase.auth().currentUser.uid;
          console.log(user);
          
          firebase.database().ref('Users/' + userId).once('value').then(function(snapshot){
            if(snapshot.val()){
                console.log(snapshot.val());
                if(user.email === "wantedchorpolice@gmail.com"){
                  window.location.href = "index2.html";
                }
                else
                {              
                  window.location.href = "index2.html";
                }
                //window.location.href = "index.html";
            }
            else{
                window.location.href = "index.html";
            }   
          });
        }
    });
})

}
createAccount.mousePressed(()=>{
    if(displayname.value()!==null && password.value()!==null){
        var result = firebase.auth().createUserWithEmailAndPassword(email.value(), password.value());
       
        result.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
        
            console.log(errorCode);
            console.log(errorMessage);
    
            window.alert("Message : " + errorMessage);
        });
        gameState = "Home";  
 
    }else{
        alert('Kindly fill all the forms');
    }
    
});
}