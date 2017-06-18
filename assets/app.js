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
}
// $(".page-link").on("click", function(){
//   console.log($(".page-link"));
// });
// console.log($(html).find(".page-link"));

// $.get(`https://music-backend.herokuapp.com/users/${}/albums`, function(userData){
//   const userDataSource = $("#userData").html();
//   const userTemplate = Handlebars.compile(userDataSource);
//
// });
