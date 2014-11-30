"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/
var url = 'https://api.parse.com/1/classes/comments/';

angular.module('TalkingBack', ['ui.bootstrap'])
	.config(function($httpProvider) {
		$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = '98xDvFRPf743lwa0hMSvMCeV8cKpUDRWilinN4CR';
		$httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'FPOUaiOtbgnOu390TPCGFwbWG0LtY1ssyxBBYXzH';
	})

	.controller('commentsController', function($scope, $http) {
		$scope.rate = 0;
		$scope.max = 5;
		$scope.isReadonly = false;

		$scope.hoveringOver = function(value) {
			$scope.overStar = value;
		    $scope.percent = 100 * (value / $scope.max);
		};

		$scope.refreshComments = function() {
			$scope.loading = true;
			$http.get(url) 
				.success(function(responseData) {
					$scope.comments = responseData.results;
				})
				.error(function(err) {
					console.log(err);
				})
				.finally(function() {
					$scope.loading = false;
				});
		};
		$scope.refreshComments();
		//$scope.newComment = {score : 0};

		$scope.addComments = function(comment) {
			$http.post(url, comment)
				.success(function(responseData) {
					comment.objectId = responseData.objectId;
					$scope.comments.push(comment);
					//$scope.newComment = {score : 0};
				});
		};

		$scope.updateComments = function(comment) {
			$scope.updating = true;
			$http.delete(url + comment.objectId)
				.success(function(responseData) {
					$scope.refreshComments();
				})
				.error(function(err) {
					console.log(err);
				});
		};

		$scope.updateScore = function(comment, vote) {
			$scope.voted = true;
			comment.score = comment.score + vote;
			$http.put(url + comment.objectId, comment)
				.success(function(responseData) {
				})
				.error(function(err) {
					console.log(err);
				});
		};
	});






