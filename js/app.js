var parseID="CTSCgIhu0f9DrIy25DD2HpADHj4uk3MWCvgGbJAj";
var parseRestKey="gdroFp9IvWcDShuRYmLBFEeq8IT62Uw65NXRbkhW";

$(document).ready(function() {	
	getMessages();
	$("#send").click(function(){
		var username = $("input[name=username]").val();
		var message = $("input[name=message]").val();
		console.log(username);
		console.log(message);
		
		console.log(parseID);
		console.log(parseRestKey);
		$.ajax({
			url: 'https://api.parse.com/1/classes/MessageBoard',
			headers: {
				'X-Parse-Application-Id': parseID,
				'X-Parse-REST-API-Key': parseRestKey
			},
			contentType: 'application/json',
			dataType: 'json',
			processData: false,
			data: JSON.stringify({
				'username': username,
				'message': message
			}),
			type: 'POST',
			success: function() {
				console.log('sent');
				getMessages();
			},
			error: function() {
				console.log('error');
			}
		});
	});
})

function getMessages() {
	$.ajax({
		url: " https://api.parse.com/1/classes/MessageBoard",
		headers: {
			"X-Parse-Application-Id": parseID,
			"X-Parse-REST-API-Key": parseRestKey
		},
		contentType: "application/json",
		dataType: "json",
		type: 'GET',
		success: function(data) {			
			updateView(data);
		},
		error: function() {
			console.log("error");
		}
	});
}

function updateView(messages){
	var table = $('.table tbody');
	table.html('');
	$.each(messages.results, function (index, value){
		var trEl = $('<tr><td>' + value.username + '</td><td>' + value.message + '</td></tr>');
		table.append(trEl);
	});
	console.log(messages);
}