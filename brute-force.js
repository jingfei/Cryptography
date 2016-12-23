function check(){
  var num = parseInt(document.getElementById("code").value);
  if(num>9 || num<1) {
    alert("The number must be between 1 and 9.");
    num = 5;
  }
  else if(!(num>=1 && num<=9)) {
    alert("Please input number.");
    num = 5;
  }
  document.getElementById("code").value = num;
}

function getTime(){
  var num = parseInt(document.getElementById("code").value);
  var time = findMatching(num)*1.0 / 1000.0;
  document.getElementById("resultTime").innerHTML = time + " seconds";
  var waitEmts = document.getElementsByClassName("result");
  for(var i=0; i<waitEmts.length; ++i) waitEmts[i].style.display = "block";
  document.getElementById("Input").style.display = "none";
}

function printOut(){
  var num = parseInt(document.getElementById("code").value);
  document.getElementById("Input").innerHTML = "";
  var time = findMatching(num,1)*1.0 / 1000.0;
  document.getElementById("resultTime").innerHTML = time + " seconds";
  var waitEmts = document.getElementsByClassName("result");
  for(var i=0; i<waitEmts.length; ++i) waitEmts[i].style.display = "block";
  document.getElementById("Input").style.display = "block";
}

function findMatching(N,print){
  if( typeof(print) === "undefined" ) print = false;
  var ar = new Array();
  for(var i=0; i<N; ++i) ar.push(String.fromCharCode(i+65));
  var time1 = new Date();
  permutation(ar,[],print);
  var time2 = new Date();
  return time2 - time1;
}

function permutation(ar,prefix,print) {
  var N=ar.length;
  if(N === 2) {
    var ar2=[ar[1],ar[0]];
    if(print!==false) {
      document.getElementById("Input").innerHTML += prefix.concat(ar) + "\t";
      document.getElementById("Input").innerHTML += prefix.concat(ar2) + "\t";
    }
  }
  else {
    for(var i=0; i<N; ++i) {
      var elm = ar[i];
      ar.splice(i,1);
      permutation(ar,prefix.concat(elm),print);
      ar.splice(i,0,elm);
    }
  }
}


