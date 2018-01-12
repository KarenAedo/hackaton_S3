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

  //Subiendo imagen de perfil a usuario
  var TablaDeBaseDatos = firebase.database().ref('usuarios');
  $('#upload-file-selector').change(function(){
    if(this.files && this.files[0]){
      var Archivo = new new FileReader();
      Archivo.onload = function(){

      };
    }
  });

  //imagen de perfil
$('#upload-profile').change(function(){
  if(this.files && this.files[0]){
    var archivo = new FileReader();
    archivo.onload = function(e){
    imgProfile = e.target.result;
    //console.log(perfilImg);
    };
    archivo.readAsDataURL(this.files[0]);
  }
})

//--------------------------------------------------------------------------------------

function notifyMe() {
  // Comprobamos si el navegador soporta las notificaciones
  if (!("Notification" in window)) {
    alert("Este navegador no soporta las notificaciones del sistema");
  }

  // Comprobamos si ya nos habían dado permiso
  else if (Notification.permission === "granted") {
    // Si esta correcto lanzamos la notificación
    var notification = new Notification("Holiwis :D");
  }

  // Si no, tendremos que pedir permiso al usuario
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // Si el usuario acepta, lanzamos la notificación
      if (permission === "granted") {
        var notification = new Notification("Gracias majo!");
      }
    });
  }

  // Finalmente, si el usuario te ha denegado el permiso y 
  // quieres ser respetuoso no hay necesidad molestar más.
}

Push.Permission.request();
Push.create('Hi there!', {
    body: 'This is a notification.',
    icon: 'icon.png',
    timeout: 8000,               // Timeout before notification closes automatically.
    vibrate: [100, 100, 100],    // An array of vibration pulses for mobile devices.
    onClick: function() {
        // Callback for when the notification is clicked. 
        console.log(this);
    }  
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
      $('#section-estrenos').hide();
      
    }
});

//al hacer click en mis datos me muestra ------------------------------------

$("#btn-profile").click(function(){
  $('.movies').hide();
  $('#section-notice').hide();
  $('#my-data').show();
  $('#section-estrenos').hide();
  $('#notify').show();
  
  
});

//funcion para mostrar informacion de las peliculas en un modal
  $(".starWars").click(function(){
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
            <a href="#" class="btn btn-default btn-notificame" onclick="starWars()"><span class="glyphicon glyphicon-bell notificame"></span> Notificarme</a>
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

  
  $(".coco").click(function(){
    var movieId = "tt2380307";
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
            <h3>Sinopsis:</h3>
            ${response.Plot}
            <hr>
            <a href="#" class="btn btn-default btn-notificame" onclick="coco()"><span class="glyphicon glyphicon-bell notificame"></span> Notificarme</a>
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

  $(".logan").click(function(){
    var movieId = "tt3315342";
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
            <h3>Sinopsis:</h3>
            ${response.Plot}
            <hr>
            <a href="#" class="btn btn-default btn-notificame" onclick="logan()"><span class="glyphicon glyphicon-bell notificame"></span> Notificarme</a>
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

  $(".jumanji").click(function(){
    var movieId = "tt2283362";
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
            <h3>Sinopsis:</h3>
            ${response.Plot}
            <hr>
            <a href="#" class="btn btn-default btn-notificame" onclick="jumanji()"><span class="glyphicon glyphicon-bell notificame"></span> Notificarme</a>
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

  $(".yourName").click(function(){
    var movieId = "tt5311514";
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
              <li class="list-group-item"><strong>Website:</strong> <a></a></li>
            </ul>
          </div>
          <div class="resumen-modal col-md-12">
            <h3>Sinopsis:</h3>
            ${response.Plot}
            <hr>
            <a href="#" class="btn btn-default btn-notificame" onclick="yourName()"><span class="glyphicon glyphicon-bell notificame"></span> Notificarme</a>
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

  $(".apePlanet").click(function(){
    var movieId = "tt3450958";
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
            <h3>Sinopsis:</h3>
            ${response.Plot}
            <hr>
            <a href="#" class="btn btn-default btn-notificame" onclick="apePlanet()"><span class="glyphicon glyphicon-bell notificame"></span> Notificarme</a>
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

  $(".fantasticBeasts").click(function(){
    var movieId = "tt3183660";
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
            <h3>Sinopsis:</h3>
            ${response.Plot}
            <hr>
            <a href="#" class="btn btn-default btn-notificame" onclick="fantasticBeasts()"><span class="glyphicon glyphicon-bell notificame"></span> Notificarme</a>
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

  $(".furious").click(function(){
    var movieId = "tt4630562";
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
            <h3>Sinopsis:</h3>
            ${response.Plot}
            <hr>
            <a href="#" class="btn btn-default btn-notificame" onclick="furious()"><span class="glyphicon glyphicon-bell notificame"></span> Notificarme</a>
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

  function coco () {
    $('.fade').removeClass('modal-backdrop');
     $('#registry').hide();
      $('.navbar').show();
      $('#my-data').show();
      $('.search-movie').show();
      $('.movies').hide(); 
      $('#section-index').hide();

    var movieId = "tt2380307";
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

  function logan () {
    $('.fade').removeClass('modal-backdrop');
     $('#registry').hide();
      $('.navbar').show();
      $('#my-data').show();
      $('.search-movie').show();
      $('.movies').hide(); 
      $('#section-index').hide();

    var movieId = "tt3315342";
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

  function jumanji () {
    $('.fade').removeClass('modal-backdrop');
     $('#registry').hide();
      $('.navbar').show();
      $('#my-data').show();
      $('.search-movie').show();
      $('.movies').hide(); 
      $('#section-index').hide();

    var movieId = "tt2283362";
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

  function yourName () {
    $('.fade').removeClass('modal-backdrop');
     $('#registry').hide();
      $('.navbar').show();
      $('#my-data').show();
      $('.search-movie').show();
      $('.movies').hide(); 
      $('#section-index').hide();

    var movieId = "tt5311514";
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
          </div>>
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

  function apePlanet () {
    $('.fade').removeClass('modal-backdrop');
     $('#registry').hide();
      $('.navbar').show();
      $('#my-data').show();
      $('.search-movie').show();
      $('.movies').hide(); 
      $('#section-index').hide();

    var movieId = "tt3450958";
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

  function fantasticBeasts () {
    $('.fade').removeClass('modal-backdrop');
     $('#registry').hide();
      $('.navbar').show();
      $('#my-data').show();
      $('.search-movie').show();
      $('.movies').hide(); 
      $('#section-index').hide();

    var movieId = "tt3183660";
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

  function furious () {
    $('.fade').removeClass('modal-backdrop');
     $('#registry').hide();
      $('.navbar').show();
      $('#my-data').show();
      $('.search-movie').show();
      $('.movies').hide(); 
      $('#section-index').hide();

    var movieId = "tt4630562";
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

});

//Pre ventas ----------------------------------------------------------

$('#btn-preventas').click(function(){
  $('#movie-list').show();
  $('#notify').hide();
  $('#section-estrenos').hide();
  $('#section-notice').hide();
  $('#my-data').hide();

});

//Página central - logo  ----------------------------------------------------------

$('.logotipo').click(function(){
  $('#section-index').show();
  $('#movie-list').show();
  $('#my-data').hide();
  $('#notify').hide();
  $('#section-notice').hide();
});

$('#btn-principal').click(function(){
  $('#section-index').show();
  $('#movie-list').show();
  $('#my-data').hide();
  $('#notify').hide();
  $('#section-notice').hide();
  
});
