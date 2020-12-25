let r, g, b;
let db;

function pickColor()
{
  r = floor(random(256));
  g = floor(random(256));
  b = floor(random(256));
  background(r, g, b);
}

function setup()
{
  var firebaseConfig = {
    apiKey: "AIzaSyBGRRpnUrRosR783nBAt3qyx3-nfRnTi-Q",
    authDomain: "color-classifier-e9a6c.firebaseapp.com",
    projectId: "color-classifier-e9a6c",
    storageBucket: "color-classifier-e9a6c.appspot.com",
    messagingSenderId: "855700099021",
    appId: "1:855700099021:web:5861c57c1d9a12afc77e84"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
   db = firebase.firestore();

  console.log(firebase);
  createCanvas(200, 200);
  pickColor();
  background(r, g, b);
  

  let buttons = [];
  buttons.push(createButton('Red-ish'));
  buttons.push(createButton('Blue-ish'));
  buttons.push(createButton('Yellow-ish'));
  buttons.push(createButton('Green-ish'));
  buttons.push(createButton('Pink-ish'));
  buttons.push(createButton('Orange-ish'));
  buttons.push(createButton('Brown-ish'));
  buttons.push(createButton('Purple-ish'));
  buttons.push(createButton('Grey-ish'));

  for(let i = 0;i < buttons.length;i++)
  {
    buttons[i].mousePressed(sendData);
  }
}

function getData()
{
  console.log("hi")
  db.collection("ColorData").where("r", "==", r).where("g", "==", g).where("b","==", b)
  .get()
  .then(function(querySnapshot) {
    if(querySnapshot.length > 0)
    {
      querySnapshot.forEach(function(doc) {
        if(doc.exists)
        {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          
        }
        else
        {
          console.log("foff");
        }
        pickColor();
      });
    }
    else
    {
      console.log("nope")
      pickColor();
    } 
    
    
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });

}


function sendData()
{

  console.log(r+" "+g+" "+b)
  db.collection("ColorData").add({
    r: r,
    g: g,
    b: b,
    label: this.html()
})
.then(function(docRef) {
  
    console.log("Document written with ID: ", docRef.id);
    pickColor();
   // background(r, g, b);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
  console.log(this.html());
}