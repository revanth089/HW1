var request = require('request');
var fs = require("fs");
var Promise = require('bluebird');
var parse = require('parse-link-header');


////// FILL IN THE BLANKS

var token = "token " + "d3f3138986bdb0b66a5e814359d8a8bbd2f54364";
var userId = "revanth089";
var repo = "ProductBC";

var urlRoot = "https://api.github.com";
// NCSU Enterprise endpoint:
// https://github.ncsu.edu/api/v3

//listBranches(userId,repo);
//getYourRepos(userId);
//createRepo(userId,"testRepo3");
//createIssue(userId,"testRepo2");
editRepo(userId,"testRepo2");

function listBranches(owner,repo)
{

	var options = {
		
		url: urlRoot + '/repos/' + owner + '/'+repo+'/branches',
		method: 'GET',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
	};

	// Send a http request to url and specify a callback that will be called upon its return.
	request(options, function (error, response, body) 
	{
		var obj = JSON.parse(body);
		for( var i = 0; i < obj.length; i++ )
		{
			var name = obj[i].name;
			console.log( name );
		}
	});	
	
}




function getYourRepos(userName)
{

	var options = {

		url: urlRoot + '/users/' + userName + "/repos",
		method: 'GET',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
	};

	// Send a http request to url and specify a callback that will be called upon its return.
	request(options, function (error, response, body) 
	{
		var obj = JSON.parse(body);
		//console.log( obj );
		for( var i = 0; i < obj.length; i++ )
		{
			var name = obj[i].name;
			console.log( name );
		}
	});

}


function createRepo(user,repo)
{
       var options = {
               url : urlRoot + "/user/repos",
               method: "POST",
               json : true,
               headers: {
                       "User-Agent": "EnableIssues",
                       "content-type": "application/json",
                       "Authorization": token
               },
               body  : { name : repo }
       };
       request(options,function(error,response,body)
       {
               var obj = JSON.stringify(body);
               //console.log(obj);
       });
};


function createIssue(owner,repo){
	  var options = {
               url : urlRoot + "/repos/"+owner+"/"+repo+"/issues",
               method: "POST",
               json : true,
               headers: {
                       "User-Agent": "EnableIssues",
                       "content-type": "application/json",
                       "Authorization": token
               },
               body  : { title : "New Issue#2" }
       };
       request(options,function(error,response,body)
       {
               var obj = JSON.stringify(body);
               //console.log(obj);
       });


}

function editRepo(owner,repo){
	  var options = {
               url : urlRoot + "/repos/"+owner+"/"+repo,
               method: "PATCH",
               json : true,
               headers: {
                       "User-Agent": "EnableIssues",
                       "content-type": "application/json",
                       "Authorization": token
               },
               body  : { name : repo,
               			 description : "this is a test repo#2.2",
               			 has_wiki : true }
       };
       request(options,function(error,response,body)
       {
               var obj = JSON.stringify(body);
               //console.log(obj);
       });


}


