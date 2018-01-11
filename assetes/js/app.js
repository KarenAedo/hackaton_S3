
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


var notice = data.notice.info;

$('#btn-notice').click(function(){
  for (var i = 0; i < notice.length; i++) {
    $('#movie-list').children().remove();
    $('#section-notice').append('<div class="row notice-movie-data">' +
                          '<div class= "col-md-offset-1 col-md-4 text-center">'+
                             '<img class="img-data" src="assetes/' + notice[i].picture + '">' +
                          '</div>' +
                          '<div class= "col-md-offset-0 col-md-6 col-md-offset-1">'+
                            '<h3 class="title-data">' + notice[i].title + '</h3>' +
                            '<h4 class="subtitle-data">' + notice[i].subtitle + '</h4>' +
                            '<p class="paragraph-data"> ' + notice[i].parrafo + '</p>' +
                            '<p class="paragraph-data"> ' + notice[i].parrafo2 + '</p>' +
                            '<p class="paragraph-data"> ' + notice[i].parrafo3 + '</p>' +
                            '<hr>' +
                            '</div>' + 
                          '</div>')
  }
})


 //Esto es para que desaparezca la página de inicio ---------------------------------
 
    $('.navbar').hide();
    $('.search-movie').hide();
    $('.movies').hide();
    $('#my-data').hide();

//al hacer click en iniciar sesión me lleve a mi página de inicio ------------------

    $("#dropdownMenu1").click(function() {
       
      var user = (firebase.auth().onAuthStateChanged);
      
      if(user){
        $('#registry').hide();
        $('.navbar').show();
        $('.search-movie').show();
        $('.movies').show();
        $('#my-data').hide();
      }
  });

//al hacer click en acceder me lleve a mis datos ------------------------------------

  $(".btn-acceder").click(function(){
    var user = (firebase.auth().onAuthStateChanged);
    if(user){
      $('#registry').hide();
      $('.navbar').show();
      $('#my-data').show();
      $('.search-movie').show();
      $('.movies').hide();
      
    }
});

//al hacer click en mis datos me muestra ------------------------------------

$("#btn-profile").click(function(){
  $('.movies').children().remove();
  $('#my-data').show();
});
