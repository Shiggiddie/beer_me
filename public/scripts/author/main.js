angular.module('app', [function(){
  console.log('Beer up!');
}])

.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.submit = function(beer) {
    var dev = {'beer': beer, 'mock': true},
    prod    = {'beer': beer, 'mock': false};

    $http.post('/api/v1/beers/', prod)
    .success(function(data) {
      if (data) {
        console.log('Data recieved: ', data);
        $scope.name = data.breweryDB.name;
        $scope.description = data.breweryDB.description;

        // Handle for different types of responses that don't
        // always have labels images
        if (data.breweryDB.type === 'beer') {
          $scope.label = data.breweryDB.labels.medium;
        } else if (data.breweryDB.type === 'brewery') {
          console.log('you got a brewery company back, not a beer.');
        } else {
          console.log('you got some other shit. check the "type" on the object.');
        }

      } else {
        console.log('No data received!');
      }
    })
    .error(function(data) {
      console.log('Something fucked!');
    });
  }
}]);

console.log('dasds');