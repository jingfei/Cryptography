<!DOCTYPE html>
<html>
<head>
	<script src="jquery.min.js"></script>
	<script type="text/javascript" src="jquery.idTabs.min.js"></script>
	<link rel="stylesheet" type="text/css" href="main.css"/>
</head>
<body>
<div id="Left">
	<ul class="idTabs">
		<li><a href="#Capital">Capital</a></li>
		<li><a href="#Lower">Lower</a></li>
		<li><a href="#Others">Others</a></li>
	</ul>
	<div id="Capital">
		<input type="radio" name="Choice_Cap" id="Auto" value="Auto" checked="checked"/>Auto
		<input type="radio" name="Choice_Cap" id="Manual" value="Manual"/>Manual
		<br/>
		<table id="ID_Cap"></table>
	</div>
	<div id="Lower">
		<input type="radio" name="Choice_Low" id="Auto" value="Auto" checked="checked"/>Auto
		<input type="radio" name="Choice_Low" id="Manual" value="Manual"/>Manual
		<br/>
		<table id="ID_Low"></table>
	</div>
	<div id="Others">
		<table id="ID_Other"></table>
	</div>
</div>
<div id="Main">
	<h1>Make your Own Code</h1>
	<textarea id="Input" placeholder="Put your text here"></textarea>
	<br/>
	<button onClick="Convert();">convert</button>
	<br/>
	<textarea id="Output" placeholder="This is result" readonly></textarea>
</div>
<div id="footer">
	Designed by JingFei
</div>

</body>
</html>
<script>
$(document).ready(function(){
	$('#ID_Cap').html(ForAuto(1));
	$('#ID_Low').html(ForAuto(2));
	$('#ID_Other').html(ForManual(3));
});

$('input[name=Choice_Cap]:radio').change(
	function(){
		if($('input[name=Choice_Cap]:checked').val()=="Auto")
			$('#ID_Cap').html(ForAuto(1));
		else if($('input[name=Choice_Cap]:checked').val()=="Manual")
			$('#ID_Cap').html(ForManual(1));
	}
);

$('input[name=Choice_Low]:radio').change(
	function(){
		if($('input[name=Choice_Low]:checked').val()=="Auto")
			$('#ID_Low').html(ForAuto(2));
		else if($('input[name=Choice_Low]:checked').val()=="Manual")
			$('#ID_Low').html(ForManual(2));
	}
);

String.prototype.replaceAt = function(index, character){
	return this.substr(0, index) +character+ this.substr(index+character.length);
}

function Convert(){
	var $Text = $('#Input').val();
	var $Ans = $Text;
	if(!$Text) return;
	for($i=33; $i<127; $i++){
		var $Before = String.fromCharCode($i);
		var $After = $('#a'+$i+' option:selected').text();
		if(!$After){
			$After = $('#t'+$i).html();
			if(!$After && $i<97)
				$After = $('#AutoSelection option:selected').text();
			else if(!$After)
				$After = $('#AutoSelection2 option:selected').text();
		}
		if($Before=="(" || $Before==")" || $Before=="[" || $Before=="{" || $Before=="*" || $Before=="+" || $Before=="." || $Before=="$" || $Before=="^" || $Before=="\\" || $Before=="|" || $Before=="?")
			$Before = "\\" + $Before;
		$n = $Text.search($Before);
		while($n!=-1){
			$Ans = $Ans.replaceAt($n,$After);
			$Text = $Text.replaceAt($n," ");
			$n = $Text.search($Before);
		}
	}
//	alert($Text);
	$('#Output').val($Ans);
}

function AutoChanged(Choice){
	var Name, Start;
	if(Choice==1){ Name = parseInt($('#AutoSelection').val()); Start=65;}
	else if(Choice==2){ Name = parseInt($('#AutoSelection2').val()); Start=97;}
	for($i=Name+1, $j=1; $j<26; ++$i, ++$j){
		if($i==26) $i=0;
		CharNum = (Start+$j).toString();
		$('#t'+ CharNum ).html(String.fromCharCode(Start+$i));
	}
}

function ForAuto(Choice){
	var Inner="";
	var Start;
	switch(Choice){
		case 1: Start=65; break;
		case 2: Start=97; break;
		default: Start=33;
	}
	for($i=0; $i<26; ++$i){
		CharCode = String.fromCharCode(Start+$i);
		CharNum = (Start+$i).toString();
		Inner += "<tr><td>"+ CharCode +"</td>";
		Inner += "<td><img src='arrow.svg'/></td>";
		/*add selection on 'A'*/
		if($i==0){
			if(Choice == 1)
				Inner += "<td><select id='AutoSelection' onchange='AutoChanged(1);'>";
			else if(Choice == 2)
				Inner += "<td><select id='AutoSelection2' onchange='AutoChanged(2);'>";
			for($j=0; $j<26; ++$j)
				Inner += "<option value='"+$j+"'>"+String.fromCharCode(Start+$j)+"</option>";
			Inner += "</select></td>";
		}
		/*********************/
		else{
			Inner +="<td id='t"+ CharNum +"'>"+ CharCode +"</td>";
		}
		Inner += "</tr>";
	}
	return Inner;
}

function ForManual(Choice){
	var Inner = "";
	var ar;
	switch(Choice){
		case 1:
			ar = new Array(26);  
			for($i=65, $j=0; $j<26; ++$i, ++$j)
				ar[$j]=$i;
			break;
		case 2: 
			ar = new Array(26);  
			for($i=97, $j=0; $j<26; ++$i, ++$j)
				ar[$j]=$i;
			break;
		default: 
			ar = new Array(42);  
			for($i=33, $j=0; $j<42; ++$i, ++$j){
				if($i==65) $i=91;
				else if($i==97) $i=123;
				ar[$j]=$i;
			}
	}
	Length = ar.length;
	for($i=0; $i<Length; ++$i){
		CharCode = String.fromCharCode(ar[$i]);
		CharNum = ar[$i].toString();
		Inner += "<tr>";
		Inner += "<td>"+ CharCode +"</td>";
		Inner += "<td><img src='arrow.svg'/></td>";
		Inner += "<td><select id = 'a"+ CharNum +"'>";
		for($k=0; $k<Length; ++$k){
			Inner += "<option ";
			if($k===$i)
				Inner += "selected='selected' ";
			Inner += "value='"+$k+"'>"+String.fromCharCode(ar[$k])+"</option>";
		}
		Inner += "</select></td>";
		Inner += "</tr>";
	}
	return Inner;
}

</script>
<style>
html, body{
	background-color: #4FB99F;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

#ID_Cap, #ID_Low, #ID_Other{
	margin: 0 auto;
	text-align: center;
	width: 100%;
	height: 100%;
}

#ID_Cap td, #ID_Low td, #ID_Other td{
	width: 33%;
	height: 25px;
}

#Left {
	width: 20%;
	height: 99%;
	position: absolute;
	text-align: center;
	font-size: 20px;
	color: #112F41;
	background-color: #4FB99F;
	top: 0px;
	left: 0px;
	overflow-y: scroll;
}

#Main{
	width: 80%;
	height: 100%;
	float: right;
	text-align: center;
}

#Main img{
	height: 100%;
}

#Main h1{
	color: #ED553B;
	margin: 10px;
}

#Main textarea{
	width: 80%;
	height: 40%;
	background-color: #F2B134;
	font-size: 18px;
}

#footer{
 position: fixed; 
 bottom:2px; 
 right:5px; 
 color:#112F41;
}

</style>
