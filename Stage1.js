var alph = [];
for(var i = 0; i<26; ++i) alph[i] = false;

$(document).ready(function(){
	$('#ID_Alp').html(ForAuto(1));
	$('#ID_Other').html(ForManual(3));
});

$('#code').keydown( function(event){
	// keycode: 8->backspace, 65->a, 90->z
	if(event.which !== 8 && (event.which < 65 || event.which >90) )
		event.preventDefault();
	if(alph[event.which-65]===true) return false;
});

$('#code').keyup( function(event){
	// keycode: 8->backspace, 65->a, 90->z
	if(event.which !== 8 && (event.which < 65 || event.which >90) )
		return false;
	if(event.which !== 8 && alph[event.which-65]===true) return false;
	this.value = this.value.toUpperCase();
	alphRenew(this.value);
});

$('input[name=Choice_Alp]:radio').change(
	function(){
		if($('input[name=Choice_Alp]:checked').val()=="Auto")
			$('#ID_Alp').html(ForAuto(1));
		else if($('input[name=Choice_Alp]:checked').val()=="Manual")
			$('#ID_Alp').html(ForManual(1));
	}
);

String.prototype.replaceAt = function(index, character){
	return this.substr(0, index) +character+ this.substr(index+character.length);
}

function Convert(){
	var $Text = $('#Input').val();
	var $Ans = $Text;
	if(!$Text) return;
	/* change all input to lower-alpha */
	$Text = $Text.toLowerCase();
	$('#Input').val($Text);
	/***********************************/
	for($i=33; $i<127; $i++){
		var $Before = String.fromCharCode($i);
		var $After = $('#a'+$i+' option:selected').text();
		if(!$After){
			$After = $('#t'+$i).html();
			if(!$After)
				$After = $('#AutoSelection option:selected').text();
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

function AutoChanged(){
	var Name = parseInt($('#AutoSelection').val());
	var Start1 = 97;
	var Start2 = 65;
	for($i=Name+1, $j=1; $j<26; ++$i, ++$j){
		if($i==26) $i=0;
		CharNum = (Start1+$j).toString();
		$('#t'+ CharNum ).html(String.fromCharCode(Start2+$i));
	}
}

function ForAuto(Choice){
	var Inner="";
	var Start1, Start2;
	switch(Choice){
		case 1: Start1=97; Start2=65; break;
		default: Start1=33; Start2=33;
	}
	for($i=0; $i<26; ++$i){
		CharCode1 = String.fromCharCode(Start1+$i);
		CharCode2 = String.fromCharCode(Start2+$i);
		CharNum = (Start1+$i).toString();
		Inner += "<tr><td>"+ CharCode1 +"</td>";
		Inner += "<td><img src='arrow.svg'/></td>";
		/*add selection on 'A'*/
		if($i==0){
			if(Choice == 1)
				Inner += "<td><select id='AutoSelection' onchange='AutoChanged();'>";
			for($j=0; $j<26; ++$j)
				Inner += "<option value='"+$j+"'>"+String.fromCharCode(Start2+$j)+"</option>";
			Inner += "</select></td>";
		}
		/*********************/
		else{
			Inner +="<td id='t"+ CharNum +"'>"+ CharCode2 +"</td>";
		}
		Inner += "</tr>";
	}
	return Inner;
}

function ForManual(Choice){
	var Inner = "";
	var ar1, ar2;
	switch(Choice){
		case 1:
			ar1 = new Array(26);  
			ar2 = new Array(26);
			for($k=65, $i=97, $j=0; $j<26; ++$k, ++$i, ++$j){
				ar1[$j]=$i;
				ar2[$j]=$k;
			}
			break;
		default: 
			ar1 = new Array(26);  
			ar2 = new Array(26);
			for($i=33, $j=0; $j<42; ++$i, ++$j){
				if($i==65) $i=91;
				else if($i==97) $i=123;
				ar1[$j]=ar2[$j]=$i;
			}
	}
	var Length = ar1.length;
	for($i=0; $i<Length; ++$i){
		CharCode = String.fromCharCode(ar1[$i]);
		CharNum = ar1[$i].toString();
		Inner += "<tr>";
		Inner += "<td>"+ CharCode +"</td>";
		Inner += "<td><img src='arrow.svg'/></td>";
		Inner += "<td><select id = 'a"+ CharNum +"'>";
		for($k=0; $k<Length; ++$k){
			Inner += "<option ";
			if($k===$i)
				Inner += "selected='selected' ";
			Inner += "value='"+$k+"'>"+String.fromCharCode(ar2[$k])+"</option>";
		}
		Inner += "</select></td>";
		Inner += "</tr>";
	}
	return Inner;
}

function alphRenew(val){
	/* init */
	var len = val.length;
	var lastAlph = len===0 ? 65 : val.charCodeAt(len-1)+1;
	for(var i=0; i<26; ++i) alph[i]=false;
	/* handle code alph */
	for(var i=0; i<len; ++i) {
		alph[val.charCodeAt(i)-65] = true;
		$('#a'+(i+1)).html(val.substring(i,i+1));
	}
	/* handle other alphs */
	for(var i=len+1, j=lastAlph; i<=26; ++i,++j) {
		if(j>90) j=65;
		while(alph[j-65]===true) ++j;
		$('#a'+i).html(String.fromCharCode(j));
	}
}
