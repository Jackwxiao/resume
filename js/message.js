!function () {
  var model = Model({resourceName:'Message'})//表名

  var view = View('section.leaveMessages')

  var controller = Controller({
    count: 0,
    messageList: null,
    form: null,
    init: function (view, controller) {
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.loadMessages()
      //object 上没有这三个属性
    },
    loadMessages: function () {
      this.model.fetch().then(
        (messages) => {
          let array = messages.map((item) => item.attributes)
          array.forEach((item) => {
            let li = document.createElement('li')
            li.innerText = `${item.name}留言 : ${item.content}`
            this.messageList.appendChild(li)
          })
          
        })
    },
    bindEvents: function () {
      console.log(this.form)
      this.form.addEventListener('submit', (e) => {
        e.preventDefault()
        this.saveMessage(9)
      })
    },
    saveMessage: function () {
      let myForm = this.form
      let content = myForm.querySelector('input[name=content]').value
      let name = myForm.querySelector('input[name=name]').value
      this.model.save({
        'name': name, 'content': content
      }).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}留言 : ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
        console.log(object)
      })
    }
  })
  controller.init(view, model)
}.call()
