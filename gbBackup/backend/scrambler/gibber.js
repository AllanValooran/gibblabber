'use strict';

var dictionaryBase64=[{"char":"A","value":0},{"char":"B","value":1},{"char":"C","value":2},{"char":"D","value":3},{"char":"E","value":4},{"char":"F","value":5},{"char":"G","value":6},{"char":"H","value":7},{"char":"I","value":8},{"char":"J","value":9},{"char":"K","value":10},{"char":"L","value":11},{"char":"M","value":12},{"char":"N","value":13},{"char":"O","value":14},{"char":"P","value":15},{"char":"Q","value":16},{"char":"R","value":17},{"char":"S","value":18},{"char":"T","value":19},{"char":"U","value":20},{"char":"V","value":21},{"char":"W","value":22},{"char":"X","value":23},{"char":"Y","value":24},{"char":"Z","value":25},{"char":"a","value":26},{"char":"b","value":27},{"char":"c","value":28},{"char":"d","value":29},{"char":"e","value":30},{"char":"f","value":31},{"char":"g","value":32},{"char":"h","value":33},{"char":"i","value":34},{"char":"j","value":35},{"char":"k","value":36},{"char":"l","value":37},{"char":"m","value":38},{"char":"n","value":39},{"char":"o","value":40},{"char":"p","value":41},{"char":"q","value":42},{"char":"r","value":43},{"char":"s","value":44},{"char":"t","value":45},{"char":"u","value":46},{"char":"v","value":47},{"char":"w","value":48},{"char":"x","value":49},{"char":"y","value":50},{"char":"z","value":51},{"char":0,"value":52},{"char":1,"value":53},{"char":2,"value":54},{"char":3,"value":55},{"char":4,"value":56},{"char":5,"value":57},{"char":6,"value":58},{"char":7,"value":59},{"char":8,"value":60},{"char":9,"value":61},{"char":'+',"value":62},{"char":'/',"value":63}];

function encode(str){
  var str=str;
  var bin='';
  for(var i=0;i<str.length;i++){
    var ascii_str=str.charCodeAt(i);
    bin+=('0000000'+ascii_str.toString(2)).substr(-8);
  }
  var aOrEqualRem=bin.length%6;
  if(aOrEqualRem!=0){
  var aOrEqualDiv=Math.floor((bin.length)/6);
  for(var i=0;i<(6-aOrEqualRem);i++){
       bin+='0';
    }
  }
  var appendEqualTo=(Math.round(bin.length/24)*24-bin.length)/6;
  var divideBin=bin.length/6;
 var base64_value='';
 for(var i=0;i<divideBin;i++){
  var bin6bit=bin.substring(i*6,(i*6)+6);
  var decimal_bin6bit=parseInt(bin6bit,2);
  for(var j=0;j<dictionaryBase64.length;j++){
      if(dictionaryBase64[j].value==decimal_bin6bit){
       base64_value+=dictionaryBase64[j].char.toString();
      }
    }
   }
  for(var i=0;i<appendEqualTo;i++){
    base64_value+='=';
  }
  return base64_value;
}


function decode(base64String){
var base64String=base64String;
var output='';
var equalToCheck=base64String.indexOf('=');
if(equalToCheck!='-1'){
  base64String=base64String.substring(0,equalToCheck);
}
for(var i=0;i<base64String.length;i++){
  for(var j=0;j<dictionaryBase64.length;j++){
    if(dictionaryBase64[j].char==base64String[i]){
      var value=dictionaryBase64[j].value;
      output+=('0000000'+value.toString(2)).substr(-6);

    }
  }
}

var jop='';
for(var i=0;i<output.length/8;i++){
  var bin8bit=output.substring(i*8,(i*8)+8);
  if(bin8bit.length==8){
    var jo=parseInt(bin8bit,2);
    if(jo!=0){
      jop+=String.fromCharCode(jo);
    }
  }
  else{
    var bin8bitZero=bin8bit;
    for(var ii=0;ii<8-bin8bit.length;ii++){
      bin8bitZero+='0';
    }
    var jo=parseInt(bin8bitZero,2);
    if(jo!=0){
      jop+=String.fromCharCode(jo);
    }
  }

}
return jop;
}



function gibber(fn_identifier,input){
  if(fn_identifier=='enc'){
    var output=encode(input);
    //console.log('input ',input);
    //console.log('output',output);
    return output;
  }
  else if(fn_identifier=='dec'){
    var output=decode(input);
   // console.log('input ',input);
   //console.log('output',output);
    return output;
  }
}
module.exports=gibber;
