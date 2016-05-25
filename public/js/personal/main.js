$(document).ready(function(){
  $('#btn-apply-submmit').click(function(){
    var note = $('#note').val();
    if(!note){
      alert('备注内容不能为空');
    }
    var group_id = $('#group_id').val();
    $.post('/apply/add',{
      note: note,
      group_id: group_id
    },function(data,status){
      if(data.errors){
        alert(data.errors[0].msg);
        return;
      }
      if(data.result == 1){
        alert('申请成功');
      }else{
        alert('系统错误');
      }
    });
  });


  $('#btn-follow').click(function(){
    var url = '/follow/add/' + $('#group_id').val();
    $.get(url, function(data, status){
      if(data.result == 1){
        $('#btn-follow').hide();
        $('#btn-cancel').show();
        alert('成功关注');
      }else if(data.result == -1){
        alert('系统错误');
      }else {
        alert('已关注');
      }
    });
  });

  $('#btn-cancel').click(function(){
    var url = '/follow/cancel/' + $('#group_id').val();
    $.get(url, function(data, status){
      if(status != 'success'){
        alert('系统错误！');
        return;
      }
      if(data.result == 1){
        $('#btn-follow').show();
        $('#btn-cancel').hide();
        alert('取消关注成功！');
      }else if(data.result == 0){
        alert('用户并未关注');
      }else {
        alert('系统错误');
      }
    });
  });

  function init(){
    var isFollowUrl = '/follow/isFollow/' + $('#group_id').val();
    $.get(isFollowUrl,function(data,status){
      if(status != 'success'){
        alert('系统错误！');
        return;
      }
      if(data.result == 1){
        $('#btn-follow').hide();
      }else if(data.result == 0){
        $('#btn-cancel').hide();
      }
    });
  }
  init();
});