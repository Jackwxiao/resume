!function () {

    var view = view('#topNavBar')

    var controller = {
        view: null,
        init: function(view){
            this.view = view
            this.bindEvents()
            //this.bindEvents.call(this)
        },
        bindEvents: function(){
            var view = this.view
            window.addEventListener('scroll',  (x)=>{
            if (window.scrollY > 0) {
                this.active()
            } else {
                this.deactive()
            }
        })
        //箭头函数没有this，内 外的 this 是一样的,这里不用箭头函数会报错
        },
        active: function(){
           this.view.classList.add('sticky') 
        },
        deactive: function(){
           this.view.classList.remove('sticky') 
        }
    }
    controller.init(view)
    //controller.init.call(controller,view)
}.call()
