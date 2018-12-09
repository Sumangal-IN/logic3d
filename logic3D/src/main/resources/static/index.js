$(function() {
	$("#child").draggable({
		containment : "#master",
		scroll : false
	});
	$('#child').bind('drag', function(event) {
		console.log($('#child').position().left);
	});
});



angular.module('myApp', []).controller(
		'myController',
		function($scope, $http) {
			var URL = '';
			var data = null;
			$scope.greeting = "Hello World";
			var currentAngle = 0;
			
			$(function(){
			    $('html').keydown(function(e){
			        console.log(e.originalEvent.key);
			        if(e.originalEvent.key=='ArrowRight')
			        	$scope.rotateRight();
			        if(e.originalEvent.key=='ArrowLeft')
			        	$scope.rotateLeft();
			    });
			});

			$scope.rotateLeft = function() {
				currentAngle -= 10;
				if (currentAngle == -10)
					currentAngle = 350;
				console.log('angle: ' + currentAngle);
				loadPic(currentAngle);
			}

			$scope.rotateRight = function() {
				currentAngle += 10;
				if (currentAngle == 360)
					currentAngle = 0;
				console.log('angle: ' + currentAngle);
				loadPic(currentAngle);
			}

			loadPic = function(angle) {
				$("#master").css(
						"background-image",
						"url('data:image/jpg;base64,"
								+ data[(angle / 10)].productImage.imageFile
								+ "')");
			}

			$scope.loadProduct = function() {
				currentAngle = 0;
				console.log('angle: ' + currentAngle);
				console.log('GET ' + URL + '/getProduct/' + $scope.productID);
				$scope.promise = $http.get(
						URL + '/getProduct/' + $scope.productID).then(
						function mySuccess(response) {
							console.log(response);
							data = response.data;
							loadPic(currentAngle);

						}, function myError(response) {
							window.alert('Oops! Some error has occured!');
							console.log(response);
							return;
						});
			}
		});