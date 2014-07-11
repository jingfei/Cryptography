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
	return this.substr(0, index) + character + this.substr(index+character.length);
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
	Inner="<tr><th>before</th>";
	for($i=0; $i<26; ++$i){
		Inner += "<td>"+String.fromCharCode(65+$i)+"</td>";
	}
	Inner += "</tr><tr><th>after</th>";
	/*add selection on 'A'*/
	Inner += "<td><select id='AutoSelection' onchange='AutoChanged();'>";
	for($i=0; $i<26; ++$i)
		Inner += "<option value='"+$i+"'>"+String.fromCharCode(65+$i)+"</option>";
	Inner += "</select></td>";
	/*********************/
	for($j=1; $j<26; ++$j)
		Inner +="<td id='t"+$j+"'>"+String.fromCharCode(65+$j)+"</td>";
	Inner += "</tr>";
	return Inner;
}
 
function ForManual(){
	var Inner = "";
	Inner = "<tr><th>before</th>";
	for($i=0; $i<26; ++$i)
		Inner += "<td>"+String.fromCharCode(65+$i)+"</td>";
	Inner += "</tr><tr><th>after</th>";
	for($j=0; $j<26; ++$j){
		Inner += "<td><select id = 'a"+$j+"'>";
		for($i=0; $i<26; ++$i){
			Inner += "<option ";
			if($i===$j)
				Inner += "selected='selected' ";
			Inner += "value='"+$i+"'>"+String.fromCharCode(65+$i)+"</option>";
		}
		Inner += "</select></td>";
	}
	Inner += "</tr>";
	return Inner;
}

