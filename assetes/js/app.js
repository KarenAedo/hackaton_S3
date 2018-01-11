
// Con esto se inicializa Firebase-----------------------------------------
    var config = {
    apiKey: "AIzaSyCxa9FiZCuHuKMUJvhAF4Ii5dT4lrH-kTg",
    authDomain: "hackaton-cine.firebaseapp.com",
    databaseURL: "https://hackaton-cine.firebaseio.com",
    projectId: "hackaton-cine",
    storageBucket: "hackaton-cine.appspot.com",
    messagingSenderId: "585940732674"
  };
  firebase.initializeApp(config);

//Esto es para crear un usuario --------------------------------------------------
  function registrar(){
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;
    
    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

//Esto es para el ingreso de un usuario ya registrado --------------
  function ingreso(){
    var email2 = document.getElementById('email2').value;
    var contrasena2 = document.getElementById('contrasena2').value;    

    firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    });
  }

//--------------------------------------------------------------------------------------

$('#btn-profile').click(function(){
  $('#section-index').children().remove();
      $('#section-profile').append('<div class="row">' +
                          '<div class= "col-md-6 text-center">'+
                            '<h5>nombre profile</h5>' +
                          '</div>' +
                          '</div>')
})


var notice = data.notice.info;

$('#btn-notice').click(function(){
  for (var i = 0; i < notice.length; i++) {
    $('#movie-list').children().remove();
    $('#section-notice').append('<div class="row character">' +
                          '<div class= "col-md-5 text-center">'+
                             '<img class="img-data" src="assetes/' + notice[i].picture + '">' +
                          '</div>' +
                          '<div class= "col-md-6">'+
                            '<h3>' + notice[i].title + '</h3>' +
                            '<h4>' + notice[i].subtitle + '</h4>' +
                            '<p> ' + notice[i].parrafo + '</p>' +
                            '</div>' +
                          '</div>')
  }
})

