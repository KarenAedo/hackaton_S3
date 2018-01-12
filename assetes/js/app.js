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

//Recordatorio de notificación
$('#miniDefaultTitle').click(function () {
    Lobibox.notify('default', {
        size: 'mini',
        title: 'Your Ticket',
          msg: 'Te recordaremos la siguiente preventa.'
    });
});

//--------------------------------------------------------------------------------------

//Data de sección noticias -------------------------------------------------------------

var notice = data.notice.info;

$('#btn-notice').click(function(){
  for (var i = 0; i < notice.length; i++) {
    $('#movie-list').hide();
    $('#section-estrenos').hide();
    $('#notify').hide();
    $('#section-notice').show();
    $('#section-otros-titulos').hide();
    $('#myFooter').show(); 
    $('#foundMovies').hide();
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
    $('#section-estrenos').hide();
    $('#section-otros-titulos').hide();
    $('#myFooter').hide(); 
    $('#foundMovies').hide();
//al hacer click en iniciar sesión me lleve a mi página de inicio ------------------

    $("#dropdownMenu1").click(function() {
       
      var user = (firebase.auth().onAuthStateChanged);
      
      if(user){
        $('#registry').hide();
        $('.navbar').show();
        $('.search-movie').show();
        $('.movies').show();
        $('#my-data').hide();
        $('#section-estrenos').hide();
        $('#movie-list').show();
        $('#section-otros-titulos').hide();
        $('#myFooter').show(); 
        
      }
  });

//al hacer click en acceder me lleve a mis datos ------------------------------------

  $(".btn-acceder").click(function(){
    var user = (firebase.auth().onAuthStateChanged);
    if(user){
      $('#registry').hide();
      $('.navbar').show();
      $('.search-movie').show();
      $('#my-data').show();
      $('.movies').hide();
      $('#section-estrenos').hide();
      $('#movie-list').show();
      $('#section-otros-titulos').hide(); 
      $('#myFooter').show();
      $('#foundMovies').hide();
    }
});

//al hacer click en mis datos me muestra ------------------------------------

$("#btn-profile").click(function(){
  $('.movies').hide();
  $('#section-notice').hide();
  $('#my-data').show();
  $('#section-estrenos').hide();
  $('#notify').show();
  $('#myFooter').show();
  $('#foundMovies').hide();
  $('#section-otros-titulos').hide();
  
  
  
});

//funcion para mostrar informacion de las peliculas en un modal
  $(".imgMovie").click(function(){
    var movieId = $(this).attr('id');
    $.ajax({
      url: 'http://www.omdbapi.com?apikey=a839f700',
      type: 'GET',
      dataType: 'json',
      data: {
        i: movieId
      },
    })
    .done(function(response) {
      console.log(response);
      var modalTitle = "";
      var output = "";
      for ( m in response) {
         /* iterate through array or object */
         var modalTitle =`
        <div class="col-md-12">
            <h2 class="title-modal">${response.Title}</h2>
          </div>
      `; 

         var output =`
        <div class="row">
          <div class="col-md-6">            
            <img class="img-modal-movie" src="${response.Poster}" class="thumbnail">
          </div>
          <div class="col-md-6 list-modal">  
            <ul class="list-group">
              <li class="list-group-item"><strong>Género:</strong> ${response.Genre}</li>
              <li class="list-group-item"><strong>Duración:</strong> ${response.Runtime}</li>
              <li class="list-group-item"><strong>Año:</strong> ${response.Year}</li>              
              <li class="list-group-item"><strong>Director:</strong> ${response.Director}</li>
              <li class="list-group-item"><strong>Reparto:</strong> ${response.Actors}</li>
              <li class="list-group-item"><strong>Website:</strong> <a class="url-modal" href="${response.Website}" target="_blank">${response.Website}</a></li>
            </ul>
          </div>
          <div class="resumen-modal col-md-12">
            <h3>Sinopsis: </h3>
            ${response.Plot}
            <hr>
            <a href="#" class="btn btn-default btn-notificame" data-dismiss="modal" onclick="starWars()"><span class="glyphicon glyphicon-bell notificame"></span> Notificarme</a>
          </div>
      `;          

      };
      $(".modalTitle").html(modalTitle);
      $(".descritionMovie").html(output);

    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      //console.log("complete");
    }); 
  });


//funcion que hara que al clickear notificarme se agregre la pelicula a mis datos
  function starWars () {
    $('.fade').removeClass('modal-backdrop');
     $('#registry').hide();
      $('.navbar').show();
      $('#my-data').show();
      $('.search-movie').show();
      $('.movies').hide(); 
      $('#section-index').hide();

    var movieId = "tt2527336";
    $.ajax({
      url: 'http://www.omdbapi.com?apikey=a839f700',
      type: 'GET',
      dataType: 'json',
      data: {
        i: movieId
      },
    })
    .done(function(response) {
      console.log(response);
      var output = "";
      for ( m in response) {
         /* iterate through array or object */
         var output =`
        <div class="row">
          <div class="col-md-3">            
            <img src="${response.Poster}" class="thumbnail movie-poster">
          </div>
        </div>
      `;          

      };
      $('#notify').html(output);


    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      //console.log("complete");
    }); 
  }; 

  
//Estrenos 2018 ----------------------------------------------------------
  
$('#btn-estrenos').click(function(){
  $('#section-notice').hide();
  $('#movie-list').hide();
  $('#my-data').hide();
  $('#notify').hide();
  $('#section-estrenos').show();
  $('#section-otros-titulos').hide(); 
  $('#myFooter').show();
  $('#foundMovies').hide();
});

//Pre ventas ----------------------------------------------------------

$('#btn-preventas').click(function(){
  $('#movie-list').show();
  $('#notify').hide();
  $('#section-estrenos').hide();
  $('#section-notice').hide();
  $('#my-data').hide();
  $('#section-otros-titulos').hide();
  $('#myFooter').show(); 
  $('#foundMovies').hide();
});

$('#btn-otros-titulos').click(function(){
  $('#section-otros-titulos').show();
  $('#movie-list').hide();
  $('#my-data').hide();
  $('#notify').hide();
  $('#section-notice').hide();
  $('#section-estrenos').hide();
  $('#myFooter').show();
  $('#foundMovies').show();
});

//Página central - logo  ----------------------------------------------------------

$('.logotipo').click(function(){
  $('#section-index').show();
  $('#movie-list').show();
  $('#my-data').hide();
  $('#notify').hide();
  $('#section-notice').hide();
  $('#section-estrenos').hide();
  $('#section-otros-titulos').hide();
  $('#myFooter').show();
  $('#foundMovies').hide();
});

$('#btn-principal').click(function(){
  $('#section-index').show();
  $('#movie-list').show();
  $('#my-data').hide();
  $('#notify').hide();
  $('#section-notice').hide();
  $('#section-otros-titulos').hide();
  $('#myFooter').show();
  $('#foundMovies').hide();  
});

//Iniciar sesión / salir  ----------------------------------------------------------

$('#btn-salir').click(function(){
  $('#section-index').hide();
  $('#movie-list').hide();
  $('#my-data').hide();
  $('#notify').hide();
  $('#section-notice').hide();
  $('.navbar').hide();
  $('#notify').hide();
  $('#registry').show();
  $('#myFooter').hide();
  $('#foundMovies').hide();
});

//funcion que muestra fotos segun busqueda
$(".btn-search").click(function(){
    var txt = "";
    var searchText = $("#searchText").val();
    $.ajax({
      url: 'http://www.omdbapi.com?apikey=a839f700',
      type: 'GET',
      dataType: 'json',
      data: {
        s: searchText
      },
    })
    .done(function(response) {
      console.log(response);
      if(response.Response === "False") {
        $('#foundMovies').html("<h3 class='text-center error-msg'>Movie not found</h3>");
      } else {
        $.each(response.Search, function(index, val) {
         /* iterate through array or object */
         txt+=`
          <div class="col-md-3 col-lg-3">
            <div class="well text-center">
              <img src="${val.Poster}" class="searchPoster">
              <h4 class="movieTitle">${val.Title}</h4>
            </div>
          </div>
        `;
      });
      $("#foundMovies").html(txt);
      }
      

    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
     // console.log("complete");
    });

  });
