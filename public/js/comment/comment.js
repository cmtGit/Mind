function getComment(type,source){
  if(!(type && source)){
    alert('the argument is not be null');
    return;
  }
  $.get('/user/comment/' + source  + '/' + type,function(data,status){
    if(status != 'success'){
      alert(status);
      return;
    }
    if(data.result != 1){
      alert('系统错误！');
      return;
    }
    createUI(data.comments);
  });
}

function createUI(comments){
  if(!comments || comments.length <= 0){
    var notComments = '<p>目前还没评论，赶快去评论吧！</p>';
    $('.comments').append(notComments);
    return;
  }
  for(var index in comments){
    var madia = '<div class="media">'
                  +'<div class="media-left media-middle">'
                   + '<a href="#">'
                    + '<img class="img-circle" src="' +'http://cdn.aixifan.com/dotnet/20120923/style/image/avatar.jpg ' + '" alt="...">'
                    + '</a>'
                  + '</div>'
                  + '<div class="media-body">'
                   + '<h4 class="media-heading">'+ comments[index].commentator.userName +'</h4>'
                     + comments[index].content
                     + '<div class=' + "action"+ comments[index]._id + '>'
                     + '</div>'
                  + '</div>'
                  +'<div class="media-right">'
                  + '<small>'
                  +'发表于' + comments[index].created
                  +'</small>'
                 /* +'<div class="action">'
                    + '<small>'
                    + '<button id="btn-reply" type="button" class="btn btn-link" onclick="addReplyForm(this,\''+ comments[index]._id +'\')">回复</button>'
                    + '</small>'
                  +'</div>'*/
                  +'</div>'
                + '</div>';
    $('.comments').append(madia);
  }
}

function addReplyForm(object ,commentId){
  var replyForm = '<div id="panel-reply" class="panel panel-default">'
                + '<div class="panel-body">'
                    + '<textarea class="form-control" rows="3" name="content"></textarea>'
                + '</div>'
                + '<div class="panel-footer">'
                    + '<button class="btn btn-default" type="button">提交</button>'
                    + '<button class="btn btn-default" type="button">取消</button>'
                + '</div>'
                + '</div>';
  debugger;
  var element = '.action' + commentId;
  $(object).hide();
  $(element).append(replyForm);
}

$(document).ready(function(){
  $('#commment-submit').click(function(){
    var body = {
      type: $('#type').val(),
      source: $('#source').val(),
      content: $('#content').val()
    }
    $.post('/user/comment/add',body,function(data, status){
      if(data.result == -2){
        alert(data.errors);
      }else if(data.result == 1){
        $('#content').val('');
        refeshComment(data.comment);
      }
    });
  });
});

/*$(document).click(function (e) {
    var drag = $("#panel-reply"),
        dragel = $("#panel-reply")[0],
        target = e.target;
    if (dragel !== target && !$.contains(dragel, target)) {
        drag.hide();
    }
});*/


function refeshComment(comment){
  var madia = '<div class="media">'
                  +'<div class="media-left media-middle">'
                   + '<a href="#">'
                    + '<img class="img-circle" src="' +'http://cdn.aixifan.com/dotnet/20120923/style/image/avatar.jpg ' + '" alt="...">'
                    + '</a>'
                  + '</div>'
                  + '<div class="media-body">'
                   + '<h4 class="media-heading">'+ comment.commentator.userName +'</h4>'
                     + comment.content
                     + '<div class=' + "action"+ comment._id + '>'
                     + '</div>'
                  + '</div>'
                  +'<div class="media-right">'
                  + '<small>'
                  +'发表于' + comment.created
                  +'</small>'
                 /* +'<div class="action">'
                    + '<small>'
                    + '<button id="btn-reply" type="button" class="btn btn-link" onclick="addReplyForm(this,\''+ comments[index]._id +'\')">回复</button>'
                    + '</small>'
                  +'</div>'*/
                  +'</div>'
                + '</div>';
    $('.comments').prepend(madia);
}

