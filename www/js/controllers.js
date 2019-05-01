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

  firebase.firestore().enablePersistence()
  .then(function() {
      // Initialize Cloud Firestore through firebase
      var db = firebase.firestore();
  })
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

angular.module('starter.controllers', [])

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
      // ...
      // alert(errorMessage);
      if (errorMessage == "The email address is badly formatted.") {
        alert("El formato de email no es válido.");
      };
      if (errorMessage == "Password should be at least 6 characters") {
        alert("La contraseña debe tener al menos 6 caracteres.");
      };
      if (errorMessage == "The email address is already in use by another account.") {
        alert("La dirección de correo electrónico ya está en uso por otra cuenta.");
      };
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
        // alert(error.message);
        // ...
        if (errorMessage == "The email address is badly formatted.") {
          alert("El formato de email no es válido.");
        };
        if (errorMessage == "Password should be at least 6 characters") {
          alert("La contraseña debe tener al menos 6 caracteres.");
        };
        if (errorMessage == "The email address is already in use by another account.") {
          alert("La dirección de correo electrónico ya está en uso por otra cuenta.");
        };
      });
    };
  };
  $scope.gologin = function () {
    // redirect to login   
    $state.go('login');
  };
  $scope.goHome = function() {
    $state.go('home');
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
      $state.go('home');
    })
    // In case of any error you will tell us in a message indicating the same
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // alert(errorMessage);
      console.log(errorMessage);
      // Messages to show before possible errors
      if (errorMessage == "The password is invalid or the user does not have a password.") {
        alert("El usuario o contraseña son incorrectos.");  
      };
      if (errorMessage == "There is no user record corresponding to this identifier. The user may have been deleted.") {
        alert("No hay registro de usuario correspondiente a este email. El usuario puede haber sido eliminado.");
      };
      if (errorMessage == "The email address is badly formatted.") {
        alert("El formato de email no es válido.");
      };
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
        $state.go('home');
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // alert(error.message);
        console.log(errorMessage);
        // ...
        if (errorMessage == "The password is invalid or the user does not have a password.") {
          alert("El usuario o contraseña son incorrectos.");  
        };
        if (errorMessage == "There is no user record corresponding to this identifier. The user may have been deleted.") {
          alert("No hay registro de usuario correspondiente a este email. El usuario puede haber sido eliminado.");
        };
        if (errorMessage == "The email address is badly formatted.") {
          alert("El formato de email no es válido.");
        };
      });
    };
  };
  $scope.goregister = function() {
    $state.go('register');
  };
})

// Controller for Home
.controller('homeCtrl', function($scope, $state){
  $scope.DNA = function() {
    $state.go('DNA');
  };
  $scope.Videoi = function() {
    $state.go('videoi');
  };
  $scope.Tabla = function() {
    $state.go('tNutri');
  };
  $scope.info = function() {
    $state.go('infoG');
  };
  $scope.juego = function() {
    $state.go('juego');
  };
})

.controller('DNACtrl', function($scope) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = 480;
  const { width, height } = canvas;
  const xCenter = width / 2; // centre de l'écran en x
  const yStart = 50; // positionde la première hélice en y
  const xMax = 80; // largeur des helices
  const yMax = 50; // espace entre les helices
  let angle = 0;
  const speed = 0.02; // vitesse de rotation
  const tAnglePI = [
  0,
  Math.PI / 6,
  Math.PI / 3,
  Math.PI / 2,
  2 * Math.PI / 3,
  5 * Math.PI / 6,
  Math.PI,
  7 * Math.PI / 6,
  4 * Math.PI / 3,
  -Math.PI / 2,
  5 * Math.PI / 3,
  11 * Math.PI / 6,
  ];
  const tPI = [...tAnglePI, ...tAnglePI];
  function render() {
    ctx.clearRect(0, 0, width, height);
    const tPositions = [];
    for (let i = 0; i < tPI.length; i++) {
      const positions = adn(tPI[i], (i * yMax));
      tPositions.push(positions);
    }
    angle += speed;
    requestAnimationFrame(render);
  }
  /**
  *
  * @param {*} startPhase phase de début en x
  * @param {*} yPos position de l'helice en y
  */
  function adn(startPhase, yPos, colorLink = '#FFFFFF') {
    const angleSin = Math.sin(angle + startPhase);
    const angleCos = Math.cos(angle + startPhase);
    const xPos1 = angleSin * xMax;
    const xPos2 = -angleSin * xMax;
    const yPos1 = angleCos * 10 + yPos;
    const yPos2 = -angleCos * 10 + yPos;
    // Création des liens entre les cercles
    ctx.beginPath();
    ctx.strokeStyle = colorLink;
    ctx.lineWidth = 3;
    ctx.moveTo(xPos1 + xCenter, yPos1 + yStart);
    ctx.lineTo(xPos2 + xCenter, yPos2 + yStart);
    ctx.stroke();
    // On fait passer le cercle le plus loin derrière
    if (angleCos < 0) {
      drawADN(xPos1, yPos1, angleCos, 11342935);
      drawADN(xPos2, yPos2, -angleCos, 1668818);
    } else {
      drawADN(xPos2, yPos2, -angleCos, 1668818);
      drawADN(xPos1, yPos1, angleCos, 11342935);
    }
    return {
      xPos1, yPos1, xPos2, yPos2,
    };
  }
  /**
  * @param {*} xAngle position en x du cercle
  * @param {*} yAngle position en y du cercle
  * @param {*} radius largeur du cercle
  * @param {*} color couleur du cercle
  */
  function drawADN(xPos, yPos, radius, color) {
    ctx.fillStyle = `#${(color).toString(16)}`;
    ctx.beginPath();
    ctx.arc(
      xPos + xCenter,
      yPos + yStart,
      10 + (radius * 3),
      0,  
      2 * Math.PI,
    );
    ctx.closePath();
    ctx.fill();
    }
    render();
})

// Controller for state videoi
.controller('VideoCtrl', function($scope) {
})

// Controller for state tNutri
.controller('tnutriCtrl', function($scope) {
})

// Controller for state  infoG
.controller('infogCtrl', function($scope) {
})

// Controller for state juego
.controller('juegoCtrl', function($scope) {
  /*$scope.ancho = function() {
    $scope.medida =  window.innerWidth;
    alert($scope.medida);
  };*/
  /*var symbols = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'],*/  
  var palabras = ['Vit A', 'Vit A', 'Vit B1', 'Vit B1', 'Vit C', 'Vit C', 'Vit D', 'Vit D', 'Vit B2', 'Vit B2', 'Vit E', 'Vit E', 'Vit B12', 'Vit B12', 'Vit K1', 'Vit K1'],
    opened = [],
    match = 0,
    moves = 0,
    $deck = $('.deck'),
    $scorePanel = $('#score-panel'),
    $moveNum = $scorePanel.find('.moves'),
    $ratingStars = $scorePanel.find('i'),
    $restart = $scorePanel.find('.restart'),
    delay = 800,
    gameCardsQTY = palabras.length / 2,
    rank3stars = gameCardsQTY + 2,
    rank2stars = gameCardsQTY + 6,
    rank1stars = gameCardsQTY + 10;

// Shuffle function From http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Initial Game
function initGame() {
  var cards = shuffle(palabras);
  $deck.empty();
  match = 0;
  moves = 0;
  $moveNum.html(moves);
  $ratingStars.removeClass('fa-star-o').addClass('fa-star');
  for (var i = 0; i < cards.length; i++) {
    // $deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'))
    $deck.append($('<li class="card">' + cards[i] + '</li>'))
  }
};

// Set Rating and final Score
function setRating(moves) {
  var rating = 3;
  if (moves > rank3stars && moves < rank2stars) {
    $ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
    rating = 2;
  } else if (moves > rank2stars && moves < rank1stars) {
    $ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
    rating = 1;
  } else if (moves > rank1stars) {
    $ratingStars.eq(0).removeClass('fa-star').addClass('fa-star-o');
    rating = 0;
  } 
  return { score: rating };
};

// End Game
function endGame(moves, score) {
  swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: '¡Felicitaciones! ¡Ganaste!',
    text: 'Con ' + moves + ' Movimientos y ' + score + ' Estrellas.\n!Boom Shaka Lak!',
    type: 'success',
    showCancelButton: true,
    confirmButtonColor: '#9BCB3C',
    cancelButtonColor: '#EE0E51',
    confirmButtonText: 'Jugar de nuevo!'
  }).then(function(isConfirm) {
    if (isConfirm) {
      initGame();
    }
  })
}

// Restart Game
$restart.on('click', function() {
  swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: '¿Estás seguro?',
    text: "¡Tu progreso se perderá!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#9BCB3C',
    cancelButtonColor: '#EE0E51',
    confirmButtonText: '¡Sí, Reiniciar Juego!'
  }).then(function(isConfirm) {
    if (isConfirm) {
      initGame();
    }
  })
});

// Card flip
$deck.on('click', '.card:not(".match, .open")', function() {
  if($('.show').length > 1) { return true; }
  
  var $this = $(this),
      card = $this.context.innerHTML;
  $this.addClass('open show');
  opened.push(card);

  // Compare with opened card
  if (opened.length > 1) {
    if (card === opened[0]) {
      $deck.find('.open').addClass('match animated infinite rubberBand');
      setTimeout(function() {
        $deck.find('.match').removeClass('open show animated infinite rubberBand');
      }, delay);
      match++;
    } else {
      $deck.find('.open').addClass('notmatch animated infinite wobble');
      setTimeout(function() {
        $deck.find('.open').removeClass('animated infinite wobble');
      }, delay / 1.5);
      setTimeout(function() {
        $deck.find('.open').removeClass('open show notmatch animated infinite wobble');
      }, delay);
    }
    opened = [];
    moves++;
    setRating(moves);
    $moveNum.html(moves);
  }
  
  // End Game if match all cards
  if (gameCardsQTY === match) {
    setRating(moves);
    var score = setRating(moves).score;
    setTimeout(function() {
      endGame(moves, score);
    }, 500);
  }
});

initGame();
});