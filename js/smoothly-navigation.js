!function () {
	var view = document.querySelector('nav.menu')
	var controller = {
		view: null,
		aTags: null,
		init: function (view) {
			this.view = view
			this.initAnimation()
			this.bindEvents()
		},
		initAnimation: function () {
			function animate(time) {
				requestAnimationFrame(animate);
				TWEEN.update(time);
			}
			requestAnimationFrame(animate);
		},
		scrollToElement: function (element) {
			let top = element.offsetTop
			let currentTop = window.scrollY
			let targetTop = top - 120
			let s = targetTop - currentTop //路程
			var coords = { y: currentTop }; // 起始位置
			var t = Math.abs((s / 100) * 300) // 时间
			if (t > 500) { t = 500 }
			var tween = new TWEEN.Tween(coords) // 起始位置
				.to({ y: targetTop }, t) //结束为止和时间
				.easing(TWEEN.Easing.Quadratic.InOut) //缓动类型
				.onUpdate(function () {
					window.scrollTo(0, coords.y) //更新界面
				})
				.start();  //开始缓动
		},
		bindEvents: function () {
			let aTags = view.querySelectorAll('nav.menu > ul > li > a')
			for (let i = 0; i < aTags.length; i++) {
				aTags[i].onclick = (x) => {
					x.preventDefault()
					let a = x.currentTarget
					let href = a.getAttribute('href')
					let element = document.querySelector(href)
					this.scrollToElement(element)
				}
			}
		}
	}
	controller.init(view)
}.call()