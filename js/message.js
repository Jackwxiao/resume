!function () {

  var view = document.querySelector('section.leaveMessages')
  var model = {
    init: function () {
      var APP_ID = 'WbkARBu1hJwNlF0kpON7ONPY-gzGzoHsz';
      var APP_KEY = 'VAtaKjFTxKFAIotYFpCYYGNi';
      AV.init({ appId: APP_ID, appKey: APP_KEY });
    },
    //获取数据
    fetch: function () {
      var query = new AV.Query('Message');
      query.find()
      return query.find() //Promise 对象
    },
    //保存数据
    save: function (name, content) {
      var Message = AV.Object.extend('Message');
      var message = new Message();
      return message.save({  //Promise 对象
        'name': name,
        'content': content
      })
    }
  }
  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function (view, model) {
      this.view = view
      this.model = model

      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    loadMessages: function () {
      this.model.fetch()
        .then(
          (messages) => {
            let array = messages.map((item) => item.attributes)
            array.forEach((item) => {
              let li = document.createElement('li')
              li.innerText = `${item.name}留言了： ${item.content}`
              this.messageList.appendChild(li)
            })
          }
        )
    },
    bindEvents: function () {
      this.form.addEventListener('submit', (e) =>{
        e.preventDefault()
        this.saveMessage()
      })
    },
    saveMessage: function () {
      let myForm = this.form
      let content = myForm.querySelector('input[name=content]').value
      let name = myForm.querySelector('input[name=name]').value
      this.model.save(name, content).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}留言了: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
      })
    }
  }
  controller.init(view,model)
}.call()
