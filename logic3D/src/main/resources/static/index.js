angular
		.module('myApp',  [ 'cgBusy' ])
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
					$scope.saveProduct = function() {
						var data = {};
						data.centerAxis = $('#centerAxis').position().left;
						data.imgPointers = imagePointers;
						$scope.promise = $http
								.post(
										URL + '/saveImagePointers/'
												+ $scope.productID,
										JSON.stringify(data))
								.then(
										function mySuccess(response) {

										},
										function myError(response) {
											window
													.alert('Oops! Some error has occured!');
											console.log(response);
											return;
										});
					}

					$scope.loadProduct = function() {
						$("#qrCode").empty();
						currentAngle = 0;
						console.log('angle: ' + currentAngle);
						console.log('GET ' + URL + '/getProduct/'
								+ $scope.productID);
						$scope.myPromise = $http
								.get(URL + '/getProduct/' + $scope.productID)
								.then(
										function mySuccess(response) {
											$("#qrCode").qrcode(window.location.origin+"/view.html?productID="+$scope.productID);
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

					function getRandomColor() {
						var letters = '0123456789ABCDEF';
						var color = '#';
						for (var i = 0; i < 6; i++) {
							color += letters[Math.floor(Math.random() * 16)];
						}
						return color + '10';
					}

					$scope.createTag = function() {
						var imagePointer = {};
						imagePointer.id = new Date().getTime();
						imagePointer.aVal = 0.5; // 0.25
						imagePointer.bVal = 0.1; // 0.06
						imagePointer.hVal = axisOffsetY / $('#master').height(); // 0.55
						imagePointer.startVal = 0;
						imagePointer.endVal = 35;						
						imagePointer.color = getRandomColor();
						// imagePointer.relativeAngle = currentAngle;
						imagePointer.points = [];
						for (var i = 0; i < 36; i++) {
							var point = {};
							point.angle = i * 10;
							point.enable = false;
							imagePointer.points.push(point);
						}
						console.log(imagePointer);
						imagePointers.push(imagePointer);

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
												+ "start'> end <input type='text' onChange='drawPointers()' class='parameter_input' value='"
												+ imagePointer.endVal 
												+ "' id='"
												+ imagePointer.id + "end'></div>");
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
								var point = points[r];
								var x = (imagePoint.aVal * $('#master')
										.width())
										* Math.sin((Math.PI / 180)
												* (point.angle));
								var y = (imagePoint.bVal * $('#master')
										.height())
										* Math.cos((Math.PI / 180)
												* (point.angle));
								var divID = "angle_" + point.angle + "_"
										+ imagePoint.id;
								if(point.angle>=imagePoint.startVal*10 && point.angle<=imagePoint.endVal*10)
									point.enable=true;
								else
									point.enable=false;
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
								if (point.enable) {
									$('#' + divID).css({
										backgroundColor : imagePoint.color,
										borderColor : imagePoint.color,
										opacity: 0.5
									});
								} else {
									$('#' + divID).css({
										backgroundColor : 'transparent',
										borderColor : imagePoint.color,
										opacity: 1
									});
								}
							}
							if (imagePoint.selectedImageAngle != null
									&& imagePoint.selectedPointAngle != null) {
								var angleToHighlight = currentAngle
										- (imagePoint.selectedImageAngle - imagePoint.selectedPointAngle);
								if (angleToHighlight < 0)
									angleToHighlight = 360 + angleToHighlight;
								if (angleToHighlight >= 360)
									angleToHighlight =angleToHighlight%360;
								console.log(angleToHighlight);
								divID = "angle_" + angleToHighlight + "_"
										+ imagePoint.id;
								$('#' + divID).css({
									backgroundColor : 'red',
									borderColor : 'red',
									opacity: 1
								})
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

					$scope.update_a_b_h = function() {
						for (var q = 0; q < imagePointers.length; q++) {
							if (!isNaN($('#' + imagePointers[q].id + 'a').val()))
								imagePointers[q].aVal = parseFloat($(
										'#' + imagePointers[q].id + 'a').val());
							
							if (!isNaN($('#' + imagePointers[q].id + 'b').val()))
								imagePointers[q].bVal = parseFloat($(
										'#' + imagePointers[q].id + 'b').val());
							
							if (!isNaN($('#' + imagePointers[q].id + 'h').val()))
								imagePointers[q].hVal = parseFloat($(
										'#' + imagePointers[q].id + 'h').val());
							
							if (!isNaN($('#' + imagePointers[q].id + 'start').val()))
								imagePointers[q].startVal = parseFloat($(
										'#' + imagePointers[q].id + 'start').val());
							
							if (!isNaN($('#' + imagePointers[q].id + 'end').val()))
								imagePointers[q].endVal = parseFloat($(
										'#' + imagePointers[q].id + 'end').val());
						}
					}

				});