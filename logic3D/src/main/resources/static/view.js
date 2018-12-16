angular
		.module('myApp', [ 'cgBusy' ])
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
					$('#child').bind('drag', function(event) {
						console.log('child: ' + $('#child').position().left);
					});
					$('#centerAxis').css({
						visibility : 'hidden'
					});
					$(document).ready(function() {
						loadProduct(getUrlVars()["productID"]);
					});

					getUrlVars = function() {
						var vars = [], hash;
						var hashes = window.location.href.slice(
								window.location.href.indexOf('?') + 1).split(
								'&');
						for (var i = 0; i < hashes.length; i++) {
							hash = hashes[i].split('=');
							vars.push(hash[0]);
							vars[hash[0]] = hash[1];
						}
						return vars;
					}

					var touchDown = false;
					var touchStartX = 0;
					$('#master')
							.bind(
									'touchmove',
									function(e) {
										if (e.touches.length == 1) {
											var diffX = (touchStartX - e.touches[0].pageX)
													/ $('#master').width();
											if (Math.abs(diffX) > 0.05) {
												if (diffX > 0)
													$scope.rotateLeft();
												else
													$scope.rotateRight();
												touchStartX = e.touches[0].pageX;
											}
										}
									});
					$('#master').bind('touchstart', function(e) {
						touchStartX = e.touches[0].pageX;
						touchDown = true;
					});

					touchHandler = function(e) {

					}

					var URL = '';
					var imageDataSet = null;
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
						$("#master").css(
								"background-image",
								"url('data:image/jpg;base64,"
										+ imageDataSet[(angle / 10)].imageFile
										+ "')");
					}

					loadProduct = function(productID) {
						currentAngle = 0;
						console.log('angle: ' + currentAngle);
						console.log('GET ' + URL + '/getProduct/' + productID);
						$scope.myPromise = $http
								.get(URL + '/getProduct/' + productID)
								.then(
										function mySuccess(response) {
											console.log(response);
											imageDataSet = response.data.productImage;
											loadPic(currentAngle);
											dx = JSON
													.parse(response.data.imagePointer);
											console.log(dx);
											imagePointers = dx.imgPointers;
											var leftVal = dx.centerAxis + 'px';
											$("#centerAxis").css({
												left : leftVal
											});

											$('#pointList').empty();
											for (var e = 0; e < imagePointers.length; e++) {
												var imagePointer = imagePointers[e];
												$('#pointList')
														.append(
																"<div class='pointListElement' style='background-color:"
																		+ imagePointer.color
																		+ "'>a <input type='text' onChange='drawPointers()' class='parameter_input' value='"
																		+ imagePointer.aVal
																		+ "' id='"
																		+ imagePointer.id
																		+ "a' > b <input type='text' onChange='drawPointers()' class='parameter_input' value='"
																		+ imagePointer.bVal
																		+ "' id='"
																		+ imagePointer.id
																		+ "b'> h <input type='text' onChange='drawPointers()' class='parameter_input' value='"
																		+ imagePointer.hVal
																		+ "' id='"
																		+ imagePointer.id
																		+ "h'> start <input type='text' onChange='drawPointers()' class='parameter_input' value='"
																		+ imagePointer.startVal
																		+ "' id='"
																		+ imagePointer.id
																		+ "start'>end <input type='text' onChange='drawPointers()' class='parameter_input' value='"
																		+ imagePointer.endVal
																		+ "' id='"
																		+ imagePointer.id
																		+ "end'></div>");
											}
											drawPointers();
										},
										function myError(response) {
											window
													.alert('Oops! Some error has occured!');
											console.log(response);
											return;
										});
					}

					drawPointers = function() {
						$scope.drawPointers();
					}

					$scope.drawPointers = function() {
						$('.pointer').remove();
						// $scope.update_a_b_h();
						for (var q = 0; q < imagePointers.length; q++) {
							var imagePoint = imagePointers[q];
							if (imagePoint.selectedImageAngle != null
									&& imagePoint.selectedPointAngle != null) {
								var angleToHighlight = currentAngle
										- (imagePoint.selectedImageAngle - imagePoint.selectedPointAngle);
								if (angleToHighlight < 0)
									angleToHighlight = 360 + angleToHighlight;
								if (angleToHighlight >= 360)
									angleToHighlight = angleToHighlight % 360;
								if (angleToHighlight >= imagePoint.startVal * 10
										&& angleToHighlight <= imagePoint.endVal * 10) {
									var x = (imagePoint.aVal * $('#master')
											.width())
											* Math.sin((Math.PI / 180)
													* (angleToHighlight));
									var y = (imagePoint.bVal * $('#master')
											.height())
											* Math.cos((Math.PI / 180)
													* (angleToHighlight));
									var divID = "angle_" + angleToHighlight
											+ "_" + imagePoint.id;
									$('#master')
											.append(
													"<div id='"
															+ divID
															+ "' class='pointer' onClick='toggleActive(this)'></div>");
									var leftVal = ($('#centerAxis').position().left + x)
											+ 'px';
									var topVal = (parseFloat(imagePoint.hVal)
											* $('#master').height() + y)
											+ 'px';
									$('#' + divID).css({
										left : leftVal
									});
									$('#' + divID).css({
										top : topVal
									});
									$('#' + divID).css({
										backgroundColor : 'red',
										borderColor : 'red',
										opacity : 1
									});
								}

							}

						}
					}

					toggleActive = function(idx) {
						var angle = parseInt(idx.id.split("_")[1]);
						var id = parseInt(idx.id.split("_")[2]);
						for (var a = 0; a < imagePointers.length; a++) {
							if (imagePointers[a].id == id) {
								imagePointers[a].selectedPointAngle = angle;
								imagePointers[a].selectedImageAngle = currentAngle;
								break;
							}
						}
						drawPointers();
					}

				});