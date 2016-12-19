var add = 0;

$(document).ready(function(){
	buildTable();
	$("#first").keyup(function(event){
		if(event.which>=65 && event.which<=90){
			add = event.which - 65;
			changeTable();
		}
	});

  $("#firstRow").on('click',function(emt){
    var $alph = emt.target.innerHTML;
	  /* toggle different color for column */
		if(isalpha($alph)) {
			var tar = $(".c"+$alph.toUpperCase());
      if(tar.hasClass("colorCol")) tar.removeClass("colorCol");
      else tar.addClass("colorCol");
    }
  });
});

function buildTable(){
	var Table="";
	Table += "<tr id='firstRow'><th></th>";
	for($i=0; $i<26; ++$i)
		Table += "<th>"+String.fromCharCode($i+97)+"</th>";
	Table += "</tr>";
	for($i=0; $i<26; ++$i){
		Table += "<tr>";
		Table += "<th>"+($i+1)+"</th>";
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

function changeTable(){
	for($i=0; $i<26; ++$i)
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

function ExtendKey($Key, $Code){
	/* return Table background color */
  $(".colorCol").removeClass("colorCol");
  $(".colorRow").removeClass("colorRow");
  $(".target").removeClass("target");

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
	return $LongKey;
}

function Encode(){
	$Key = $("#key").val();
	$Code = $("#code").val();
	$Code = $Code.toLowerCase();
	$("#code").val($Code);
	$LongKey = ExtendKey($Key, $Code);
	output = "";
	$('.filter').prop('checked', true);
	for($i=0; $i<$Code.length; ++$i){
		if(!isalpha($Code[$i])){ // filter the char not alpha
			output += $Code[$i];
			continue;  
		}
		var $tmp = $LongKey.charCodeAt($i)-65;
		$tmp += $Code.charCodeAt($i)-97;
		$tmp = ($tmp+add)%26;
		output += String.fromCharCode($tmp+65);
	}
	$("#resultText").val(output);
	Color($Key, $LongKey, $Code);
	showChart();
}

function Decode(){
	$Key = $("#key").val();
	$Code = $("#code").val();
	$Code = $Code.toUpperCase();
	$("#code").val($Code);
	$LongKey = ExtendKey($Key, $Code);
	output = "";
	$('.filter').prop('checked', true);
	for($i=0; $i<$Code.length; ++$i){
		if(!isalpha($Code[$i])){ // filter the char not alpha
			output += $Code[$i];
			continue;  
		}
		var $tmp = $LongKey.charCodeAt($i)-65;
		$tmp = $Code.charCodeAt($i)-65-$tmp;
		$tmp -= add;
		while($tmp < 0) $tmp+=26;
		output += String.fromCharCode($tmp+97);
	}
	$("#resultText").val(output);
	Color($Key, $LongKey, output);
	showChart();
}

function Color($Key, $LongKey, $Before){
  console.log($Key);
  console.log($LongKey);
	/* different Table color for key row */
	for($i=0; $i<$Key.length; ++$i)
		$(".r"+$Key[$i].toUpperCase()).addClass("colorRow");
	
	/* different color for target code */
	for($i=0; $i<$Before.length; ++$i)
		if(isalpha($Before[$i]))
			$(".r"+$LongKey[$i]+".c"+$Before[$i].toUpperCase()).addClass("target");
}

Element.prototype.removeClass = function(name) {
  this.className = this.className.replace(new RegExp('(?:^|\\s)' + name + '(?:\\s|$)'), ' ');
  return this;
};

Element.prototype.addClass = function(name) {
  this.className += (" "+name);
  return this;
}

Element.prototype.hasClass = function(name) {
  return this.className.indexOf(name)!==-1;
}

