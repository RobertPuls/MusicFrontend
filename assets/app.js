$(appReady);

function appReady() {
  $.get("https://music-backend.herokuapp.com/users", function(data) {
    handlebars(data, "#users", "#entry-template");
    for (let i = 0; i < data.length; i++) {
      $(`#header${i+1}`).append(`<h2>${data[i].email}</h2><p>${data[i].created_at}</p>`);
      $.get(`https://music-backend.herokuapp.com/users/${i+1}/albums`, function(albumData) {
        handlebars(albumData, `#${i}`, "#userData");
      });
    }
  });

  function handlebars(data, appendTo, sourceFrom) {
    const source = $(sourceFrom).html();
    const template = Handlebars.compile(source);
    for (let i = 0; i < data.length; i++) {
      const context = {
        "accountName": data[i].email.slice(0, data[i].email.indexOf("@")),
        "accountImg": data[i].user_img,
        "accountInfo": data[i].email,
        "accountNum": i,
        "userPage": i,
        "albumImg": data[i].album_img,
        "albumName": data[i].album_name,
        "bandName": data[i].name,
        "albumInfo": data[i].genre,
      };
      const html = template(context);
      $(appendTo).append(html);
    }
  }
  let currentURL = window.location.href;
  let user = currentURL.slice(currentURL.indexOf("=") + 1);
  console.log(user);
  $(`#${user}`).removeClass("hidden");
  $("#backButton").removeClass("hidden");
  $("#users").addClass("hidden");

  if (currentURL.includes("create")) {
    console.log(currentURL.includes("create"));
    $("#create").removeClass("hidden");
    $("#backButton").removeClass("hidden");
    $("#users").addClass("hidden");
    $("#createBtn").addClass("hidden");
  }
}


$("#submitBtn").on("click", function() {
  let newMusic = {
    "name": $("#artistName").val(),
    "genre": $("#genre").val(),
    "album_name": $("#albumName").val(),
    "album_img": $("#albumCover").val(),
    "user_id": Number($("#id").val()),
  };

  let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://music-backend.herokuapp.com/users/2/albums",
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "postman-token": "f206a90b-7bcc-359e-8b91-232e211f9b5b"
    },
    "data": JSON.stringify(newMusic)
  };

  $.ajax(settings).done(function(response) {
      console.log(response);
    })
    .then(Materialize.toast("Submited", 4000))
    .then(window.location.href = `/index?id=${newMusic.user_id-1}`);
});
