function showUnreadNews()
{
  $(document).ready(function() {
    $.get("/apply/remind",function(data,status){
      if(status != 'success' || data.result == -1){
        alert('系统错误！');
      }
      console.log(data.sum);
      if(data.sum > 0){
        $('#news').html(data.sum);
      }
    });
  });
}
showUnreadNews()
setInterval('showUnreadNews()',10000*60);