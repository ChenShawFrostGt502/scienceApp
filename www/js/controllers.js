// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCczI7NjWIfw0jpegG9B_8_5i8CyNIlREM",
    authDomain: "uitest-fa967.firebaseapp.com",
    databaseURL: "https://uitest-fa967.firebaseio.com",
    projectId: "uitest-fa967",
    storageBucket: "uitest-fa967.appspot.com",
    messagingSenderId: "361865442751"
  };
  firebase.initializeApp(config);

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state) {
  $scope.width = function() {
    $state.go('register')
  }
})

// Controller for state Registro
.controller('RegisterCtrl', function($scope, $state) {
 // Function in a button for user registration
  $scope.register = function (data) {
    // to leave the inputs  empty
    $scope.user = {}; 
    // Variables with user credentials
    $scope.user = data.email;
    $scope.user = data.password;
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(function() {
      // to leave the inputs  empty
      $scope.user = {};
      // if the credentials are correct redirect to login 
      $state.go('login');
    })
    // In case of any error you will tell us in a message indicating the same
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(error.message);
      // ...
    });
  };

  // Function in a input with key for user registration
  $scope.registerT = function(event, data) {
    // if the enter key in pressed this function is executed
    if(event.keyCode === 13) {
      event.preventDefault();
      //to leave the inputs  empty
      $scope.user = {};
      // Variables with user credentials
      $scope.user = data.email;
      $scope.user = data.password;
      firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(function() {
        // to leave the inputs  empty
        $scope.user = {};
        // if the credentials are correct redirect to login
        $state.go('login');
      })
      // In case of any error you will tell us in a message indicating the same
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(error.message);
        // ...
      });
    };
  };

  $scope.gologin = function () {
    // redirect to login   
    $state.go('login')
  };
})

// Controller for state Log In 
.controller('LoginCtrl', function($scope, $state) {
  $scope.login = function(data) {
    // body...
    $scope.user = {};  
    //if the credentials are correct redirect to home
    firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(function() {
      // to leave the inputs  empty  
      $scope.user = {};
      // if the credentials are correct redirect to home
      $state.go('tab.dash');
    })
    // In case of any error you will tell us in a message indicating the same
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(error.message);
    });
  };

  // if the enter key in pressed this function is executed
  $scope.loginT = function(event, data) {
    // if the enter key in pressed this function is executed
    if(event.keyCode === 13) {
      event.preventDefault();
      //to leave the inputs  empty
      $scope.user = {};
      firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(function() {
        //to leave the inputs  empty
        $scope.user = {};
        // if the credentials are correct redirect to login
        $state.go('tab.dash');
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(error.message)
      });
    };
  };
  $scope.goregister = function() {
    $state.go('register')
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


