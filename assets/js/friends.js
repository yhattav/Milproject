/*$(document).ready(function () {

  if (document.location.href.indexOf('email') < 0 && document.location.pathname != '/') {
    document.location.href = '/';
  }*/

  $('.createFriend').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: '/friends/create',
      type: 'post',
      data: $(this).serialize(),
      success: function () {
        document.location.reload();
      }
    });
  });

  $('.deleteFriend').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr('action'),
      type: 'delete',
      data: $(this).serialize(),
      success: function () {
        document.location.reload();
      }
    });
  });

  $('.updateFriend').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr('action'),
      //url: '/friends/update',
      type: 'put',
      data: $(this).serialize(),
      success: function () {
        document.location.reload();
      }
    });
  }); 
// });
var Data2;

// $(document).ready(function (e) {
//    e.preventDefault();
    $.ajax({ 
      url: '/friends',
      type: 'get',
      data: Data2,
      success: function () {
        //console.log('Data2');
      }
    });
//console.log('this ajax worked?');
//  }); 
  
  
function md5(text) {

}