angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ProductsCtrl', function($scope, $state, Products) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    $scope.products = [];

    Products.all().then(function(response){
      $scope.products = response.data;
    },
    function(error) {
      console.log(error);
    });
  });

  $scope.remove = function(productId) {
    Products.delete(productId)
      .then(function() {
        console.log('product removed successfully');
        $state.reload();
      });
  }
})

.controller('ProductDetailCtrl', function($scope, $state, $stateParams, Products) {
  $scope.$on('$ionicView.enter', function() {
    Products.get($stateParams.productId).then(function(response) {
      $scope.product = response.data;
    },
    function(error) {
      console.log(error);
    });
  });

  $scope.remove = function(productId) {
    Products.delete(productId)
      .then(function() {
        console.log('product removed successfully');
        $state.transitionTo('tab.products');
      });
  }
})

.controller('ProductCreateCtrl', function($scope, $state, Products) {
  $scope.product = {
    Name: '',
    Description: '',
    Price: 0
  };

  $scope.create = function() {
    Products.create($scope.product)
    .then(function() {
      console.log("product was created successfully")
      $state.transitionTo('tab.products');
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
      $state.transitionTo('tab.product-detail', {productId: $stateParams.productId});
    },
    function(error) {
      console.log(error);
    });
  }
});
