/* table translate */
var alph = [];
for(var i = 0; i<26; ++i) alph[i] = false;

$(document).ready(function(){
	buildOtherTable();
});

$('#code').keydown( function(event){
	// keycode: 8->backspace, 65->a, 90->z
	if(event.which !== 8 && (event.which < 65 || event.which >90) )
		event.preventDefault();
	else if(alph[event.which-65]===true) return false;
});

$('#code').keyup( function(event){
	// keycode: 8->backspace, 65->a, 90->z
	if(event.which !== 8 && (event.which < 65 || event.which >90) )
		return false;
	if(event.which !== 8 && alph[event.which-65]===true) return false;
	this.value = this.value.toUpperCase();
	alphRenew(this.value);
});

String.prototype.replaceAt = function(index, character){
	return this.substr(0, index) +character+ this.substr(index+character.length);
}

function Convert(){
	var input = $('#Input').val() || "Pack my box with five dozen liquor jugs. Pack my box with five dozen liquor jugs. Pack my box with five dozen liquor jugs...";
	output = input;
	$('.filter').prop('checked', true);
	$('.result').show();
	$('html, body').animate({
		scrollTop: $("#result").offset().top
	}, 1000);
	/* change all input to lower-alpha */
	input = input.toLowerCase();
	$('#Input').val(input);
	/***********************************/

	/* convert to result */
	for($i=33; $i<127; $i++){
		if($i>=65 && $i<=90) continue;
		var $Before = String.fromCharCode($i);
		var $After = $('#a'+$i).html() || $('#a'+$i).val() || $Before;
		if($Before=="(" || $Before==")" || $Before=="[" || $Before=="{" || $Before=="*" || $Before=="+" || $Before=="." || $Before=="$" || $Before=="^" || $Before=="\\" || $Before=="|" || $Before=="?")
			$Before = "\\" + $Before;
		$n = input.search($Before);
		while($n!=-1){
			output = output.replaceAt($n,$After);
			input = input.replaceAt($n," ");
			$n = input.search($Before);
		}
	}
	$('#resultText').val(output);

	showChart();
}

function alphRenew(val){
	/* init */
	var len = val.length;
	if(len>25) len=25;
	var lastAlph = len===0 ? 65 : val.charCodeAt(len-1)+1;
	for(var i=0; i<26; ++i) alph[i]=false;
	/* handle code alph */
	for(var i=0; i<len; ++i) {
		alph[val.charCodeAt(i)-65] = true;
		$('#a'+(i+97)).html(val.substring(i,i+1));
	}
	/* handle other alphs */
	for(var i=len, j=lastAlph; i<=26; ++i,++j) {
		if(j>90) j=65;
		while(alph[j-65]===true){
			++j; 
			if(j>90) j=65;
		}
		$('#a'+(i+97)).html(String.fromCharCode(j));
	}
}

function buildOtherTable(){
	var ar=new Array(26), len=42;
	for(var i=48, j=0; j<10; ++i, ++j) ar[j]=i;
	for(var i=33, j=10; j<len; ++i, ++j){
		if(i==48) i=58;
		else if(i==65) i=91;
		else if(i==97) i=123;
		ar[j]=i;
	}

	/* first 21 chars */
	var inner = "";
	inner += "<tr>";
	for(var i=0; i<21; ++i) inner += "<td>"+ String.fromCharCode(ar[i]) + "</td>";
	inner += "</tr><tr>";
	for(var i=0; i<21; ++i) inner += "<td>&#8595;</td>";
	inner += "</tr><tr>";
	for(var i=0; i<21; ++i) inner += "<td><input type='text' class='form-control' placeholder='"+ String.fromCharCode(ar[i]) +"' maxlength='1' id='a"+ ar[i] +"' /></td>";
	inner += "</tr>";
	$("#table-other1").html(inner);

	/* second 21 chars */
	var inner = "";
	inner += "<tr>";
	for(var i=21; i<len; ++i) inner += "<td>"+ String.fromCharCode(ar[i]) + "</td>";
	inner += "</tr><tr>";
	for(var i=21; i<len; ++i) inner += "<td>&#8595;</td>";
	inner += "</tr><tr>";
	for(var i=21; i<len; ++i) inner += "<td><input type='text' class='form-control' placeholder='"+ String.fromCharCode(ar[i]) +"' maxlength='1' id='a"+ ar[i] +"' /></td>";
	inner += "</tr>";
	$("#table-other2").html(inner);
}

