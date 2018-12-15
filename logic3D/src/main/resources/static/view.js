$(function() {

});

angular
		.module('myApp', [])
		.controller(
				'myController',
				function($scope, $http) {

					var axisOffsetX = $('#master').position().left
							+ parseInt($('#master').css("borderWidth"), 10)
							- ($('#centerAxis').width() / 2 + parseInt($(
									'#centerAxis').css("borderWidth"), 10));

					var axisOffsetY = $('#centerAxis').height() / 2
							+ $('#master').position().top;

					$("#child").draggable({
						containment : "#master",
						scroll : false
					});
					$("#centerAxis").draggable({
						containment : "#master",
						scroll : false
					});
					$('#child').bind('drag', function(event) {
						console.log('child: ' + $('#child').position().left);
					});
					$('#centerAxis').bind('drag', function(event) {
						$scope.drawPointers();
					});

					var URL = '';
					var data = null;

					var currentAngle = 0;

					var imagePointers = [];

					$(function() {
						$('html').keydown(function(e) {
							console.log(e.originalEvent.key);
							if (e.originalEvent.key == 'ArrowRight')
								$scope.rotateRight();
							if (e.originalEvent.key == 'ArrowLeft')
								$scope.rotateLeft();
						});
					});

					$scope.rotateLeft = function() {
						currentAngle -= 10;
						if (currentAngle == -10)
							currentAngle = 350;
						console.log('angle: ' + currentAngle);
						loadPic(currentAngle);
						drawPointers();
					}

					$scope.rotateRight = function() {
						currentAngle += 10;
						if (currentAngle == 360)
							currentAngle = 0;
						console.log('angle: ' + currentAngle);
						loadPic(currentAngle);
						drawPointers();
					}

					loadPic = function(angle) {
						$("#master")
								.css(
										"background-image",
										"url('data:image/jpg;base64,"
												+ data[(angle / 10)].productImage.imageFile
												+ "')");
					}

					$scope.loadProduct = function() {
						currentAngle = 0;
						console.log('angle: ' + currentAngle);
						console.log('GET ' + URL + '/getProduct/'
								+ $scope.productID);
						$scope.promise = $http
								.get(URL + '/getProduct/' + $scope.productID)
								.then(
										function mySuccess(response) {
											console.log(response);
											data = response.data;
											loadPic(currentAngle);

										},
										function myError(response) {
											window
													.alert('Oops! Some error has occured!');
											console.log(response);
											return;
										});
					}

					function getRandomColor() {
						var letters = '0123456789ABCDEF';
						var color = '#';
						for (var i = 0; i < 6; i++) {
							color += letters[Math.floor(Math.random() * 16)];
						}
						return color + '50';
					}

					$scope.createTag = function() {
						var imagePointer = {};
						imagePointer.id = new Date().getTime();
						imagePointer.a = 0.5;
						imagePointer.b = 0.1;
						imagePointer.h = axisOffsetY / $('#master').height();
						imagePointer.color = getRandomColor();
						// imagePointer.relativeAngle = currentAngle;
						imagePointer.points = [];
						for (var i = 0; i < 36; i++) {
							var point = {};
							point.angle = i * 10;
							point.enable = true;
							imagePointer.points.push(point);
						}

						console.log(imagePointer);

						imagePointers.push(imagePointer);

						$('#pointList')
								.append(
										"<div class='pointListElement' style='background-color:"
												+ imagePointer.color
												+ "'>a<input type='text' onChange='drawPointers()' class='parameter_input' value='"
												+ imagePointer.a
												+ "' id='"
												+ imagePointer.id
												+ "a' > b<input type='text' onChange='drawPointers()' class='parameter_input' value='"
												+ imagePointer.b
												+ "' id='"
												+ imagePointer.id
												+ "b'> h<input type='text' onChange='drawPointers()' class='parameter_input' value='"
												+ imagePointer.h + "' id='"
												+ imagePointer.id + "h'></div>");
						$scope.drawPointers();
					}

					drawPointers = function() {
						$scope.drawPointers();
					}

					$scope.drawPointers = function() {
						$('.pointer').remove();
						$scope.update_a_b_h();
						for (var q = 0; q < imagePointers.length; q++) {
							var imagePoint = imagePointers[q];
							var points = imagePoint.points;
							for (var r = 0; r < points.length; r++) {
								if (points[r].enable) {
									var point = points[r];
									var x = (imagePointers[q].a * $('#master')
											.width())
											* Math
													.sin((Math.PI / 180)
															* (point.angle - currentAngle));
									var y = (imagePointers[q].b * $('#master')
											.height())
											* Math
													.cos((Math.PI / 180)
															* (point.angle - currentAngle));
									$('#master')
											.append(
													"<div id='angle"
															+ point.angle
															+ "_"
															+ imagePoint.id
															+ "' class='pointer'></div>");
									var leftVal = ($('#centerAxis').position().left + x)
											+ 'px';
									var topVal = (parseFloat(imagePoint.h)
											* $('#master').height() + y)
											+ 'px';
									$(
											'#angle' + point.angle + "_"
													+ imagePoint.id).css({
										left : leftVal
									});
									$(
											'#angle' + point.angle + "_"
													+ imagePoint.id).css({
										top : topVal
									});
									$(
											'#angle' + point.angle + "_"
													+ imagePoint.id).css({
										backgroundColor : imagePoint.color
									}).css('opacity', 0.8);

								}
								/*
								 * var x = (imagePointers[q].a * $('#master')
								 * .width()) Math.sin((Math.PI / 180) * angle);
								 * var y = (imagePointers[q].b * $('#master')
								 * .height()) Math.cos((Math.PI / 180) * angle);
								 */

							}
						}
					}

					$scope.update_a_b_h = function() {
						for (var q = 0; q < imagePointers.length; q++) {
							imagePointers[q].a = $(
									'#' + imagePointers[q].id + 'a').val();
							imagePointers[q].b = $(
									'#' + imagePointers[q].id + 'b').val();
							imagePointers[q].h = $(
									'#' + imagePointers[q].id + 'h').val();
						}
					}

				});