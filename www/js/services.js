angular.module('starter.services', [])

.factory('Products', function($http) {
  // Might use a resource here that returns a JSON array

  //var ENDPOINT_URL = 'http://localhost:8080/v1/products/';
  var ENDPOINT_URL = 'https://products-api-jegarma.c9users.io/v1/products/';

  return {
    all: function() {
      return $http({
        method: 'GET',
        url: ENDPOINT_URL
      });
    },
    get: function(productId) {
      return $http({
        method: 'GET',
        url: ENDPOINT_URL+productId
      });
    },
    create: function(product) {
      return $http({
        method: 'POST',
        url: ENDPOINT_URL,
        data: product
      });
    },

    edit: function(productId, product) {
      return $http({
        method: 'PUT',
        url: ENDPOINT_URL+productId,
        data: product
      });
    },

    delete: function(productId, product) {
      return $http({
        method: 'DELETE',
        url: ENDPOINT_URL+productId,
      });
    }
  };
});
