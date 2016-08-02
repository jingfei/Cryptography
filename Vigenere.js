$(document).ready(function(){
	buildTable();
	$("#first").keyup(function(event){
		if(event.which>=65 && event.which<=90)
			changeTable(event.which-65);
	});
});

function buildTable(){
	var Table="";
	Table += "<tr><th></th>";
	for($i=0; $i<26; ++$i)
		Table += "<th>"+String.fromCharCode($i+97)+"</th>";
	Table += "</tr>";
	for($i=0; $i<26; ++$i){
		Table += "<tr>";
		Table += "<th>"+String.fromCharCode($i+65)+"</th>";
		for($j=$i, $k=0; $k<26; ++$j, ++$k){
			if($j>=26) $j=0;
			var Classc = "c"+String.fromCharCode($k+65);
			var Classr = "r"+String.fromCharCode($i+65);
			if($j===0 && $i===0)
				Table += "<td class='"+Classc+' '+Classr+"'><input type='text' class='form-control' id='first' placeholder='"+String.fromCharCode($j+65)+"' maxlength='1' /></td>";
			else
				Table += "<td class='"+Classc+' '+Classr+"'>"+String.fromCharCode($j+65)+"</td>";
		}
		Table += "</tr>";
	}
	$("#transTable").html(Table);
}

function changeTable(add){
	for($i=0; $i<26; ++$i){
		for($j=$i, $k=0; $k<26; ++$j, ++$k){
			if($j>=26) $j=0;
			if($j===0 && $i===0){
				$("#first").val(String.fromCharCode(add+65));
				continue;
			}
			var Classc = "c"+String.fromCharCode($k+65);
			var Classr = "r"+String.fromCharCode($i+65);
			var evt = $("."+Classc+"."+Classr).first();
			var val = $k+$i+add > 25 ? ($k+$i+add)%26 : $k+$i+add;
			evt.html(String.fromCharCode(val+65));
		}
	}
}

function ExtendKey($Key, $Code){
	/* return Table background color */
	for($i=0; $i<26; ++$i)
		$(".r"+String.fromCharCode($i+65)).css({"backgroundColor":"transparent"});

	/* key to upper case and renew */
	$Key = $Key.toUpperCase();
	$("#key").val($Key);

	$LongKey = "";
	for($i=0, $j=0; $i<$Code.length; ++$i){
		if($j >= $Key.length) $j=0;
		if(isalpha($Code[$i]))
			$LongKey += $Key[$j++];
		else
			$LongKey += $Code[$i];
	}
/*	
	while($LongKey.length < $Code.length) $LongKey += $Key;
	if($LongKey.length > $Code.length) 
		$LongKey = $LongKey.substr(0,$Code.length);
*/
	return $LongKey;
}

function isalpha($c){
	if($c.charCodeAt(0)>=65 && $c.charCodeAt(0)<=90) return true;
	if($c.charCodeAt(0)>=97 && $c.charCodeAt(0)<=122) return true;
	return false;
}

function Encode(){
	$Key = $("#key").val();
	$Code = $("#code").val();
	$Code = $Code.toLowerCase();
	$("#code").val($Code);
	$LongKey = ExtendKey($Key, $Code);
	$Ans = "";
	for($i=0; $i<$Code.length; ++$i){
		if(!isalpha($Code[$i])){
			$Ans += $Code[$i];
			continue;
		}
		var $tmp = $LongKey.charCodeAt($i)-65;
		$tmp += $Code.charCodeAt($i)-97;
		if($tmp >= 26) $tmp-=26;
		$Ans += String.fromCharCode($tmp+65);
	}
	$("#result").val($Ans);
	Color($Key, $LongKey, $Code);
}

function Decode(){
	$Key = $("#key").val();
	$Code = $("#code").val();
	$Code = $Code.toUpperCase();
	$("#code").val($Code);
	$LongKey = ExtendKey($Key, $Code);
	$Ans = "";
	for($i=0; $i<$Code.length; ++$i){
		if(!isalpha($Code[$i])){
			$Ans += $Code[$i];
			continue;
		}
		var $tmp = $LongKey.charCodeAt($i)-65;
		$tmp = $Code.charCodeAt($i)-65-$tmp;
		if($tmp < 0) $tmp+=26;
		$Ans += String.fromCharCode($tmp+97);
	}
	$("#result").val($Ans);
	Color($Key, $LongKey, $Ans);
}

function Color($Key, $LongKey, $Before){
	/* different Table color for key row */
	for($i=0; $i<$Key.length; ++$i)
		$(".r"+$Key[$i]).css({"backgroundColor":"#06B587"});
	
	/* different color for Before code */
	for($i=0; $i<$Before.length; ++$i)
		if(isalpha($Before[$i]))
			$(".c"+$Before[$i].toUpperCase()).css({"backgroundColor":"#06B587"});

	/* different color for target code */
	for($i=0; $i<$Before.length; ++$i)
		if(isalpha($Before[$i]))
			$(".r"+$LongKey[$i]+".c"+$Before[$i].toUpperCase()).css({"backgroundColor":"#ED553B"});
}

