$(document).ready(function(){
  $('#allow').click(function(){
    $('#result').val('allow');
    $('#form').submit();
  });
});

$(document).ready(function(){
  $('#reject').click(function(){
    $('#reject').val('reject');
    $('#form').submit();
  });
});