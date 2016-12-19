/* result filter */
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

/* frequency */
function showChart(){
	/* calculate data */
	var data = [];
	var total = output.length;
	var i = 65;
	while(true){
		var ch = String.fromCharCode(i);
		var tmp_ch = ch;
		if(ch=="(" || ch==")" || ch=="[" || ch=="{" || ch=="*" || ch=="+" || ch=="." || ch=="$" || ch=="^" || ch=="\\" || ch=="|" || ch=="?")
			tmp_ch = "\\" + ch;
		var count = (output.match(new RegExp(tmp_ch,"g")) || []).length; 
		if(count !== 0) data.push({alph:ch, frequency: count/total});

		/* change the sequence of alph in chart */
		i++;
		if(i===91) i=97;
		else if(i===123) i=48;
		else if(i===58) i=33;
		else if(i===48) i=58;
		else if(i===65) i=91;
		else if(i===97) i=123;
		else if(i===127) break;
	}
	/* draw chart */
	$("#barChart").html("");
	var margin = {top: 20, right: 10, bottom: 80, left: 40},
		width = $("#barChart").parent().width()*.9 - margin.left - margin.right,
		height = 300 - margin.top - margin.bottom;
	
	var x = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1);
	
	var y = d3.scale.linear()
						.range([height, 0]);
	
	var xAxis = d3.svg.axis()
								.scale(x)
								.orient("bottom");
	
	var yAxis = d3.svg.axis()
								.scale(y)
								.orient("left")
								.ticks(10, "%");
	
	var svg = d3.select("#barChart").append("svg")
							.attr("width", width + margin.left + margin.right)
							.attr("height", height + margin.top + margin.bottom)
							.append("g")
							.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	x.domain(data.map(function(d) { return d.alph; }));
	y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
	
	svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);
	
	svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Frequency");
	
	svg.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.alph); })
			.attr("width", x.rangeBand())
			.attr("y", function(d) { return y(d.frequency); })
			.attr("height", function(d) { return height - y(d.frequency); });

	svg.selectAll("label")
			.data(data)
			.enter().append("text")
			.text(function(d){ return (d.frequency*100).toFixed(1); })
			.attr("x", function(d, i){ return x(d.alph)+x.rangeBand()/2; })
			.attr("y", function(d){ return y(d.frequency)+10; })
			.attr("class", "label")
			.attr("text-anchor", "middle")
			.attr("fill", "#068587");
}

function type(d) {
	d.frequency = +d.frequency;
	return d;
}

