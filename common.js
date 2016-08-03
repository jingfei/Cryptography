var output = "";

$('input[name="blank"],input[name="num"],input[name="punc"]').change( function(){
	var res = output;
	if(!$('input[name="blank"]').is(":checked")) {
		var last = 0, tmp = "", now = res.indexOf(" ", last);
		while(now!==-1){
			tmp += res.substring(last,now);
			last = now+1;
			now = res.indexOf(" ", last);
		}
		tmp += res.substring(last, res.length);
		res = tmp;
	}
	if(!$('input[name="punc"]').is(":checked")) {
		var tmp="", len=res.length;
		for(var i=0; i<len; ++i)
			if(isalpha(res[i]) || isnum(res[i]) 
				|| res[i]===" " || res[i]==="\n" || res[i]==="\r" || res[i]==="\t")
				tmp+=res[i];
		res = tmp;
	}
	if(!$('input[name="num"]').is(":checked")) {
		var tmp="", len=res.length;
		for(var i=0; i<len; ++i)
			if(!isnum(res[i]))
				tmp+=res[i];
		res = tmp;
	}
	$("#resultText").val(res);
});

function isalpha($c){
	if($c.charCodeAt(0)>=65 && $c.charCodeAt(0)<=90) return true;
	if($c.charCodeAt(0)>=97 && $c.charCodeAt(0)<=122) return true;
	return false;
}

function isnum($c){
	if($c.charCodeAt(0)>=48 && $c.charCodeAt(0)<=57) return true;
	return false;
}

