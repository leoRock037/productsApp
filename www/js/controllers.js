angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ProductsCtrl', function($scope, Products) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  Products.all().then(function(response){
    $scope.products = response.data;
    console.log(response)
  },
  function(error) {
    console.log(error);
  });
})

.controller('ProductDetailCtrl', function($scope, $stateParams, Products) {
  Products.get($stateParams.productId).then(function(response) {
    $scope.product = response.data;
  },
  function(error) {
    console.log(error);
  });
})

.controller('ProductCreateCtrl', function($scope, Products) {
  $scope.product = {
    Name: '',
    Description: '',
    Price: 0
  };

  $scope.create = function() {
    Products.create($scope.product)
    .then(function() {
      console.log("product was created successfully")
    },
    function(error) {
      console.log(error);
    });
  }
})

.controller('ProductEditCtrl', function($scope, $stateParams, $state, Products) {

  Products.get($stateParams.productId)
  .then(function(response){
    $scope.product = response.data;
    console.log(response);
  });

  $scope.edit = function() {
    Products.edit($stateParams.productId, $scope.product)
    .then(function() {
      console.log("product was edited successfully")
      $state.transitionTo('tab.product-detail', {productId: $stateParams.productId}, {reload: true, cache: false});
    },
    function(error) {
      console.log(error);
    });
  }
});
