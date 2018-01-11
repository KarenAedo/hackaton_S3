
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
            <h2>${response.Title}</h2>
          </div>
      `; 

         var output =`
        <div class="row">
          <div class="col-md-12">            
            <img src="${response.Poster}" class="thumbnail">
            <ul class="list-group">
              <li class="list-group-item"><strong>Género:</strong> ${response.Genre}</li>
              <li class="list-group-item"><strong>Duración:</strong> ${response.Runtime}</li>
              <li class="list-group-item"><strong>Año:</strong> ${response.Year}</li>              
              <li class="list-group-item"><strong>Director:</strong> ${response.Director}</li>
              <li class="list-group-item"><strong>Actores:</strong> ${response.Actors}</li>
              <li class="list-group-item"><strong>Website:</strong> <a href="${response.Website}" target="_blank">${response.Website}</a></li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Resumen</h3>
            ${response.Plot}
            <hr>
            <a href="#" class="btn btn-default"><span class="glyphicon glyphicon-bell"></span> Notificarme</a>
          </div>
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
            <h2>${response.Title}</h2>
          </div>
      `; 

         var output =`
        <div class="row">
          <div class="col-md-12">            
            <img src="${response.Poster}" class="thumbnail">
            <ul class="list-group">
              <li class="list-group-item"><strong>Género:</strong> ${response.Genre}</li>
              <li class="list-group-item"><strong>Duración:</strong> ${response.Runtime}</li>
              <li class="list-group-item"><strong>Año:</strong> ${response.Year}</li>              
              <li class="list-group-item"><strong>Director:</strong> ${response.Director}</li>
              <li class="list-group-item"><strong>Actores:</strong> ${response.Actors}</li>
              <li class="list-group-item"><strong>Website:</strong> <a href="${response.Website}" target="_blank">${response.Website}</a></li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Resumen</h3>
            ${response.Plot}
            <hr>
            <a href="#" class="btn btn-default"><span class="glyphicon glyphicon-bell"></span> Notificarme</a>
          </div>
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
            <h2>${response.Title}</h2>
          </div>
      `; 

         var output =`
        <div class="row">
          <div class="col-md-12">            
            <img src="${response.Poster}" class="thumbnail">
            <ul class="list-group">
              <li class="list-group-item"><strong>Género:</strong> ${response.Genre}</li>
              <li class="list-group-item"><strong>Duración:</strong> ${response.Runtime}</li>
              <li class="list-group-item"><strong>Año:</strong> ${response.Year}</li>              
              <li class="list-group-item"><strong>Director:</strong> ${response.Director}</li>
              <li class="list-group-item"><strong>Actores:</strong> ${response.Actors}</li>
              <li class="list-group-item"><strong>Website:</strong> <a href="${response.Website}" target="_blank">${response.Website}</a></li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Resumen</h3>
            ${response.Plot}
            <hr>
            <a href="#" class="btn btn-default"><span class="glyphicon glyphicon-bell"></span> Notificarme</a>
          </div>
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
            <h2>${response.Title}</h2>
          </div>
      `; 

         var output =`
        <div class="row">
          <div class="col-md-12">            
            <img src="${response.Poster}" class="thumbnail">
            <ul class="list-group">
              <li class="list-group-item"><strong>Género:</strong> ${response.Genre}</li>
              <li class="list-group-item"><strong>Duración:</strong> ${response.Runtime}</li>
              <li class="list-group-item"><strong>Año:</strong> ${response.Year}</li>              
              <li class="list-group-item"><strong>Director:</strong> ${response.Director}</li>
              <li class="list-group-item"><strong>Actores:</strong> ${response.Actors}</li>
              <li class="list-group-item"><strong>Website:</strong> <a href="${response.Website}" target="_blank">${response.Website}</a></li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Resumen</h3>
            ${response.Plot}
            <hr>
            <a href="#" class="btn btn-default"><span class="glyphicon glyphicon-bell"></span> Notificarme</a>
          </div>
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
            <h2>${response.Title}</h2>
          </div>
      `; 

         var output =`
        <div class="row">
          <div class="col-md-12">            
            <img src="${response.Poster}" class="thumbnail">
            <ul class="list-group">
              <li class="list-group-item"><strong>Género:</strong> ${response.Genre}</li>
              <li class="list-group-item"><strong>Duración:</strong> ${response.Runtime}</li>
              <li class="list-group-item"><strong>Año:</strong> ${response.Year}</li>              
              <li class="list-group-item"><strong>Director:</strong> ${response.Director}</li>
              <li class="list-group-item"><strong>Actores:</strong> ${response.Actors}</li>
              <li class="list-group-item"><strong>Website:</strong> <a href="${response.Website}" target="_blank">${response.Website}</a></li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Resumen</h3>
            ${response.Plot}
            <hr>
            <a href="#" class="btn btn-default"><span class="glyphicon glyphicon-bell"></span> Notificarme</a>
          </div>
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
            <h2>${response.Title}</h2>
          </div>
      `; 

         var output =`
        <div class="row">
          <div class="col-md-12">            
            <img src="${response.Poster}" class="thumbnail">
            <ul class="list-group">
              <li class="list-group-item"><strong>Género:</strong> ${response.Genre}</li>
              <li class="list-group-item"><strong>Duración:</strong> ${response.Runtime}</li>
              <li class="list-group-item"><strong>Año:</strong> ${response.Year}</li>              
              <li class="list-group-item"><strong>Director:</strong> ${response.Director}</li>
              <li class="list-group-item"><strong>Actores:</strong> ${response.Actors}</li>
              <li class="list-group-item"><strong>Website:</strong> <a href="${response.Website}" target="_blank">${response.Website}</a></li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Resumen</h3>
            ${response.Plot}
            <hr>
            <a href="#" class="btn btn-default"><span class="glyphicon glyphicon-bell"></span> Notificarme</a>
          </div>
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
            <h2>${response.Title}</h2>
          </div>
      `; 

         var output =`
        <div class="row">
          <div class="col-md-12">            
            <img src="${response.Poster}" class="thumbnail">
            <ul class="list-group">
              <li class="list-group-item"><strong>Género:</strong> ${response.Genre}</li>
              <li class="list-group-item"><strong>Duración:</strong> ${response.Runtime}</li>
              <li class="list-group-item"><strong>Año:</strong> ${response.Year}</li>              
              <li class="list-group-item"><strong>Director:</strong> ${response.Director}</li>
              <li class="list-group-item"><strong>Actores:</strong> ${response.Actors}</li>
              <li class="list-group-item"><strong>Website:</strong> <a href="${response.Website}" target="_blank">${response.Website}</a></li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Resumen</h3>
            ${response.Plot}
            <hr>
            <a href="#" class="btn btn-default"><span class="glyphicon glyphicon-bell"></span> Notificarme</a>
          </div>
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
            <h2>${response.Title}</h2>
          </div>
      `; 

         var output =`
        <div class="row">
          <div class="col-md-12">            
            <img src="${response.Poster}" class="thumbnail">
            <ul class="list-group">
              <li class="list-group-item"><strong>Género:</strong> ${response.Genre}</li>
              <li class="list-group-item"><strong>Duración:</strong> ${response.Runtime}</li>
              <li class="list-group-item"><strong>Año:</strong> ${response.Year}</li>              
              <li class="list-group-item"><strong>Director:</strong> ${response.Director}</li>
              <li class="list-group-item"><strong>Actores:</strong> ${response.Actors}</li>
              <li class="list-group-item"><strong>Website:</strong> <a href="${response.Website}" target="_blank">${response.Website}</a></li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Resumen</h3>
            ${response.Plot}
            <hr>
            <a href="#" class="btn btn-default"><span class="glyphicon glyphicon-bell"></span> Notificarme</a>
          </div>
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
