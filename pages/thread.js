var comments_id, xhttp, built_string;

function parse(post)
{
	var ret = "<div class=\"post\">" + post["author"];
	ret += "<div class=\"content\">" + post["comment"];
	ret += "</div></div>";

	return ret;
}

function fetch_comments()
{
	var json;

	if (xhttp.readyState != 4 || xhttp.status != 200)
		return;

	json = JSON.parse(xhttp.responseText);
	json["replies"].forEach(function(cur){
		built_string += parse(cur);
	});

	comments_id.innerHTML = built_string;
}

function main()
{
	comments_id	= document.getElementById("comments");
	xhttp		= new XMLHttpRequest();
	built_string	= "Ready<br/>";

	xhttp.onreadystatechange = fetch_comments;
	xhttp.open("GET", "thread.json");
	xhttp.send();
}

document.onreadystatechange = function()
{
	if (document.readyState !== "interactive")
		return;
	main();
}

