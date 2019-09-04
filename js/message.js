
var APP_ID = 'WbkARBu1hJwNlF0kpON7ONPY-gzGzoHsz';
var APP_KEY = 'VAtaKjFTxKFAIotYFpCYYGNi';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var query = new AV.Query('Message');
query.find()
  .then(
    function (messages) {
      let array = messages.map((item)=> item.attributes)
      array.forEach((item)=>{
        let li = document.createElement('li')
        li.innerText = `${item.name}留言了： ${item.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
      })
    }
  )

let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit', function(e){
  e.preventDefault()
  let content = myForm.querySelector('input[name=content]').value
  let name = myForm.querySelector('input[name=name]').value
  var Message = AV.Object.extend('Message');
  var message = new Message();
  message.save({
    'name': name,
    'content': content
  }).then(function(object) {
    let li = document.createElement('li')
    li.innerText = `${object.attributes.name}留言了: ${object.attributes.content}`
    let messageList = document.querySelector('#messageList')
    messageList.appendChild(li)
    myForm.querySelector('input[name=content]').value=''
  })
})