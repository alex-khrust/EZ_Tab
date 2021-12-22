// Custom JS
document.addEventListener('DOMContentLoaded', () => {

	// Анимация спинера загрузки кнопок авторизации
	$('.sign-up .enter__main button.btn').on('click', function () {
		let $this = $(this);
		$this.addClass('loading');
		setTimeout(function () {
			$this.removeClass('loading');
		}, 2000)
	});

	// Показать/скрыть пароль в input password
	$('.password').on('click', '.password-control', function () {
		let $inputPswrd = $(this).closest('.password').find('input')
		if ($inputPswrd.attr('type') == 'password') {
			$(this).addClass('view');
			$inputPswrd.attr('type', 'text');
		} else {
			$(this).removeClass('view');
			$inputPswrd.attr('type', 'password');
		}
		return false;
	});

	// hamburger и menu
	$("#navToggle").click(function () {
		$(this).toggleClass("active");
		$(".header .menu").toggleClass("open");
		$("body").toggleClass("locked");
	});
	$(".header .menu a").click(function () {
		$('.header .menu').toggleClass("open");
		$('#navToggle').toggleClass("active");
	});

	// Кастомный select
	$('select').each(function (index) {

		var sel = $(this);

		// MAKE CUSTOM SELECT ELEMENTS
		// index here used to identify select element if more
		// than one in the page
		sel.wrap('<div class="wrap-select wrap-select-' + index + '"></div>');
		var $wrap_sel = $('.wrap-select-' + index);

		$wrap_sel.append('<div class="custom-select">YAY</div>');
		$wrap_sel.append('<ul class="custom-select-items"></ul>');
		var $custom_select = $wrap_sel.find('.custom-select'),
			$sel_items = $wrap_sel.find('.custom-select-items');

		//Popolate the custom options
		sel.children('option').each(function (index) {
			//Separation between placeholder and select items
			if ($(this).val() === 'default') {
				$custom_select.text($(this).text());
			}
			else {
				$sel_items.append('<li>' + $(this).text() + '</li>');
			}
		});


		//DISPLAY CUSTOM OPTIONS HANDLER
		$custom_select.on('click', function () {
			$(this).toggleClass('active');
			$sel_items.slideToggle();
		});


		//ITEM SELECTION
		$sel_items.children('li').on('click', function () {
			var itemVal = $(this).text();
			$custom_select.text(itemVal).removeClass('active');
			$sel_items.children('li').removeClass('active');
			$(this).addClass('active');
			$sel_items.slideUp();

			//set the original select option item for post data
			sel.children('option').each(function (index) {
				if ($(this).text() === itemVal) {
					$(this).attr('selected', 'selected');
				}
			});
		});

		// End select each loop 
	});


	//  Стилизация input file
	(function () {
		'use strict';

		$('.input-file').each(function () {
			var $input = $(this),
				$label = $input.closest('.label-input-file'),
				labelVal = $label.html();

			$input.on('change', function (element) {
				var fileName = '';
				if (element.target.value) fileName = element.target.value.split('\\').pop();
				fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
				setTimeout(function (){
					$('#btn-submit').toggleClass('active');
					$('.output-file').addClass('has-file');
				}, 1500);
			});
		});

	})();



	// =======
})
