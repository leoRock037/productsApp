angular.module('starter.services', [])

.factory('Products', function($http) {
  // Might use a resource here that returns a JSON array

  return {
    all: function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:8080/v1/products'
      });
    },
    get: function(productId) {
      return $http({
        method: 'GET',
        url: 'http://localhost:8080/v1/products/'+productId
      });
    }
  };
});
