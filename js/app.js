var app = angular.module('drinksApp', []);

app.controller('drinksCtrl', function drinksCtrl($scope, $http) {
	$scope.drinks = {};
	$scope.atts = ["categories", "tags", "variety", "brand", "format"];
	$scope.chars = {};
	$scope.items = [];
	$scope.orderName = '';
	$scope.addedDrinks = [];
	
	$http.get("http://ilovetea.mystagingwebsite.com/wp-json/wp/v2/posts?per_page=100&orderby=title").success(function(data) {
	//$http.get("drinks.json").success(function(data) {
		$scope.drinks = data;
	});

	angular.forEach($scope.atts, function(tax) {

		$http.get("http://ilovetea.mystagingwebsite.com/wp-json/wp/v2/"+tax+"/?per_page=100").success(function(data) {
			//alert(tax+' fetch was successful');
			$scope.chars[tax] = data;
		});

	});


	$scope.setTeaFilter = function(value) {
		if ($scope.teaFilter === value) {
			$scope.teaFilter = undefined;
		} else {
			$scope.teaFilter = value;
		}
	};

	$scope.addItem = function(value) {
		$scope.items.push(value);
	};

	$scope.removeItem = function(value) {
		var i = $scope.items.indexOf(value);
		if(i != -1) {
			$scope.items.splice(i, 1);
		}
	};

	$scope.orderDrinks = function(data) {

		var drinks = $scope.addedDrinks.join();
		var name = $scope.orderName;

		$http.post(
			"https://maker.ifttt.com/trigger/drinks_ordered/with/key/dawBSsd-hPW3LJ4UbLnTb/",
			{ "value1": name, "value2": drinks }
		).then(
			function(data) {
				console.log(data);
			},
			function(data) {
				console.log(data);
			});
	};


});