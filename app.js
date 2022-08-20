import { getDatabase, ref, set, push, get, orderByChild, query,orderByKey,equalTo, onValue } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

console.clear();
var st1;
const db = getDatabase();
var dbRef;
var gr = "All";


window.addEventListener('load',function(){
  dbRef = ref(db,'students');
  getData();
});

display();
sortData();
displayForm();
displayData();

function writeStudentData(st) {
  //const db = getDatabase();
  const postListRef = ref(db, 'students/');
  const newPostRef = push(postListRef);
  set(newPostRef, st);
}

function sortData(){
  var dropdown = document.createElement("select");
  dropdown.setAttribute('name','Grade');
  document.getElementById('main').appendChild(dropdown);
  
  let option0 = document.createElement("option");
  option0.text = "All";
  option0.setAttribute('id','all');
  dropdown.add(option0);

  for(let k=1;k<13;k++){
  let option = document.createElement("option");
  option.text = k;
  option.setAttribute('id','op'+k);
  dropdown.add(option);
  }
  
  dropdown.addEventListener('change',function(){
    gr = dropdown.options[dropdown.selectedIndex].text;
    getData();
  });


}

function getData(){
  //const dbRef = ref(getDatabase(),'students');
  //dbRef = query(ref(db, 'students'),orderByChild("mygrade"));
  // const dbRefa = query(ref(db, 'students'),orderByChild("mygrade"),equalTo(1));
  
    for(let i = 1; i < 13; i++){
      if(gr == i){
        dbRef =  query(ref(db,'students'),orderByChild("mygrade"),equalTo(i));
      } else if(gr == "All") {
        dbRef =  query(ref(db,'students'),orderByChild("mygrade"));
      }
    
  

  }
  onValue(dbRef, (snapshot) => {
    let tl = [];  
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      tl.push(childData);
    }); 
    console.log(tl);
    displayList(tl);
  });
  
}




function display(){
  
  document.body.style.textAlign = "center";

  var title = document.createElement('h1');
  title.style.margin = "20px 0 0 0";
  title.innerText="Student Management System";
  document.body.appendChild(title);

  var addButton = document.createElement("INPUT");
  addButton.setAttribute("type", "button");
  addButton.setAttribute("value", "Add Student");
  addButton.setAttribute("id","add");
  addButton.style.margin = "20px";
  document.body.appendChild(addButton);

  addButton.addEventListener('click', function() {
    document.getElementById('formpg').style.display = "block";
  });

   var divmain = document.createElement("div");
  //divmain.style.height = "auto";
  divmain.setAttribute('id','main');
  document.body.appendChild(divmain);

    

  document.addEventListener('keydown', function(event){
    if(event.key === "Escape"){
      document.getElementById('formpg').style.display = "none";  
    }
  });
  
}

function displayForm(){
    
    var divarea = document.createElement("div");
    divarea.setAttribute('id','formpg');
    divarea.style.display = "none";
    divarea.style.position  = "fixed";
    divarea.style.zIndex = "8";
    divarea.style.overflow = "auto";
    divarea.style.left= "0";
    divarea.style.top= "0";
    divarea.style.width = '100%';
    divarea.style.height= "100%";
    divarea.style.overflow= "auto";
    divarea.style.backgroundColor = "rgb(0, 0, 0)";
    divarea.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    divarea.style.textAlign = 'CENTER';
    document.getElementById('main').appendChild(divarea);
  
    var divform = document.createElement("div");
    divform.style.display = "block";
    divform.style.margin= "50px auto";
    divform.style.border= "2px solid #fff";
    divform.style.backgroundColor= "rgb(220,220,220)";
    divform.style.width= "40%";
    divform.style.height = "auto";
    divform.setAttribute('id','form');
    document.getElementById('formpg').appendChild(divform);

    var nameText = document.createElement("h4");
    nameText.innerText = "First Name";
    nameText.style.margin = "10px";
    divform.appendChild(nameText);
  
    var name = document.createElement("INPUT");
    name.setAttribute("type", "text");
    divform.appendChild(name);
  
    var lnameText = document.createElement("h4");
    lnameText.innerText = "Last Name";
    lnameText.style.margin = "10px";
    divform.appendChild(lnameText);
  
    var lname = document.createElement("INPUT");
    lname.setAttribute("type", "text");
    divform.appendChild(lname);
  
    var gradeText = document.createElement("h4");
    gradeText.innerText = "Grade"; 
    gradeText.style.margin = "10px";
    divform.appendChild(gradeText);
  
    var grade = document.createElement("INPUT");
    grade.setAttribute("type", "number");
    divform.appendChild(grade);
  
    var rollnoText = document.createElement("h4");
    rollnoText.innerText = "Roll No."; 
    rollnoText.style.margin = "10px";
    divform.appendChild(rollnoText);
  
    var rollno = document.createElement("INPUT");
    rollno.setAttribute("type", "number");
    divform.appendChild(rollno);
    
    var linebreak = document.createElement("br");
    divform.appendChild(linebreak);
      
    var button = document.createElement("INPUT");
    button.setAttribute("value", "SUBMIT");
    button.setAttribute("id", "inputData");
    button.setAttribute("type", "button");
    button.style.margin = "20px";
    divform.appendChild(button);
    
    document.getElementById('inputData').addEventListener('click', function() {
      
      if(true){
        st1 = new Student(name.value,lname.value,parseInt(grade.value),parseInt(rollno.value));   
        writeStudentData(st1);  
        document.getElementById('formpg').style.display = "none";
      }
      });
}

function displayData(){
  
  var container = document.createElement('div');
    container.setAttribute('id','container');
    container.style.display = "grid";
    container.style.maxHeight = "61vh";
    container.style.overflowY ="scroll";

    container.style.backgroundColor = "grey";
    container.style.border = "2px solid black";
    container.style.gap= "1px";
    container.style.gridTemplateColumns = "auto auto auto auto";
    container.style.margin = "20px 20px";
    document.getElementById('main').appendChild(container);
    
}

function addtableTitle(){
  
    let tableTitle = ["First Name","Last Name","Grade","Roll No"];
     let tid = ["t1","t2","t3","t4"];
    for(let j = 0; j<tableTitle.length;j++){
      let cell = document.createElement("div");
      //cell.setAttribute('type','button');
      cell.style.textAlign = "center";
      cell.style.position = "sticky";
      cell.style.top = "0";
      cell.style.backgroundColor = "#eee";
      cell.style.padding = "10px";
      cell.setAttribute('id',tid[j]);
      cell.innerText = tableTitle[j];
      cell .style.fontWeight = "bold";
      document.getElementById("container").appendChild(cell);
   }
    
}

function displayList(dlist){
  document.getElementById('container').innerHTML = "";
  addtableTitle();
  for (let i = 0; i<dlist.length;i++) {        
    for (var key in dlist[i]){
      let cell = document.createElement("div");
      cell.style.textAlign = "center";
      cell.style.backgroundColor = "white";
      cell.style.padding = "10px";
      cell.innerHTML = dlist[i][key];
      document.getElementById('container').append(cell);
    }
    }
}

  

