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

					$(document).ready(function() {
						$scope.productID = getUrlVars()["productID"];
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
					var u = new SpeechSynthesisUtterance();
					speak = function(text, callback) {
						u.text = text;
						u.lang = 'en-US';
						speechSynthesis.speak(u);
					}

					var URL = '';
					var imageDataSet = null;
					var currentAngle = 0;
					var imagePointers = [];

					$('html').keydown(function(e) {
						console.log(e.originalEvent.key);
						if (e.originalEvent.key == 'ArrowRight')
							$scope.rotateRight();
						if (e.originalEvent.key == 'ArrowLeft')
							$scope.rotateLeft();
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
											imagePointers = dx.imgPointers;
											var leftVal = dx.centerAxis + 'px';
											$("#centerAxis").css({
												left : leftVal
											});
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
								}

							}

						}
					}

					toggleActive = function(idx) {
						var id = parseInt(idx.id.split("_")[2]);
						for (var a = 0; a < imagePointers.length; a++) {
							if (imagePointers[a].id == id) {
								speak(imagePointers[a].desc);
								break;
							}
						}
					}

				});