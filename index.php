<!DOCTYPE html>
<html>
<head>
	<script src="jquery.min.js"></script>
</head>
<body>
<div id="Left">
	<input type="radio" name="Choice" id="Auto" value="Auto" checked="checked"/>Auto
	<input type="radio" name="Choice" id="Manual" value="Manual"/>Manual
	<br/>
	<table id="ID"></table>
</div>
<div id="Main">
	<textarea id="Input"></textarea>
	<br/>
	<button onClick="Convert();">convert</button>
	<br/>
	<textarea id="Output" readonly></textarea>
</div>

</body>
</html>
<script>
$(document).ready( $('#ID').html(ForAuto()) );

$('input:radio').change(
	function(){
		if($('input[name=Choice]:checked').val()=="Auto")
			$('#ID').html(ForAuto());
		else if($('input[name=Choice]:checked').val()=="Manual")
			$('#ID').html(ForManual());
	}
);

String.prototype.replaceAt = function(index, character){
	return this.substr(0, index) +character+ this.substr(index+character.length);
}

function Convert(){
	var $Text = $('#Input').val();
	var $Ans = $Text;
	if(!$Text) return;
	for($i=0; $i<26; $i++){
		var $Before = String.fromCharCode(65+$i);
		var $After = $('#a'+$i+' option:selected').text();
		if(!$After){
			if($i==0) $After = $('#AutoSelection option:selected').text();
			else $After = $('#t'+$i).html();
		}
		$n = $Text.search($Before);
		while($n!=-1){
			$Ans = $Ans.replaceAt($n,$After);
			$Text = $Text.replaceAt($n,"*");
			$n = $Text.search($Before);
		}
	}
//	alert($Text);
	$('#Output').val($Ans);
}

function AutoChanged(){
	var Name = parseInt($('#AutoSelection').val());
	for($i=Name+1, $j=1; $j<26; ++$i, ++$j){
		if($i==26) $i=0;
		$('#t'+$j).html(String.fromCharCode(65+$i));
	}
}

function ForAuto(){
	var Inner="";
	for($i=0; $i<26; ++$i){
		Inner += "<tr><td>"+String.fromCharCode(65+$i)+"</td>";
		/*add selection on 'A'*/
		if($i==0){
			Inner += "<td><select id='AutoSelection' onchange='AutoChanged();'>";
			for($j=0; $j<26; ++$j)
				Inner += "<option value='"+$j+"'>"+String.fromCharCode(65+$j)+"</option>";
			Inner += "</select></td>";
		}
		/*********************/
		else
			Inner +="<td id='t"+$i+"'>"+String.fromCharCode(65+$i)+"</td>";
		Inner += "</tr>";
	}
	return Inner;
}
 
function ForManual(){
	var Inner = "";
	for($i=0; $i<26; ++$i){
		Inner += "<tr>";
		Inner += "<td>"+String.fromCharCode(65+$i)+"</td>";
		Inner += "<td><select id = 'a"+$i+"'>";
		for($k=0; $k<26; ++$k){
			Inner += "<option ";
			if($k===$i)
				Inner += "selected='selected' ";
			Inner += "value='"+$k+"'>"+String.fromCharCode(65+$k)+"</option>";
		}
		Inner += "</select></td>";
		Inner += "</tr>";
	}
	return Inner;
}

</script>
<style>
html, body{
	width: 100%;
	height: 100%;
}

#ID td{
	width: 40px;
}

#Left {
	width: 19%;
	float: left;
	text-align: center;

}

#Main{
	width: 80%;
	height: 100%;
//	display: inline-block;
	float: right;
	text-align: center;
}

#Main textarea{
	width: 80%;
	height: 40%;
}
</style>
