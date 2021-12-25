// Custom JS
document.addEventListener('DOMContentLoaded', () => {


	// hamburger и menu
	$("#navToggle").click(function () {
		// $(this).toggleClass("active");
		$(".header .menu").toggleClass("open");
		$("body").toggleClass("locked");
	});
	// $(".header .menu a").click(function () {
	// 	$('.header .menu').toggleClass("open");
	// 	$('#navToggle').toggleClass("active");
	// });
	$(document).mouseup(function (e) {
		var block = $(".header .menu");
		if (!block.is(e.target) && block.has(e.target).length === 0) {
			block.removeClass("open");
			// $("#navToggle").removeClass("active");
			$("body").removeClass("locked");
		}
	});


	// Кастомный select
	$('select').each(function (index) {
		var sel = $(this);

		// 	// MAKE CUSTOM SELECT ELEMENTS
		// 	// index here used to identify select element if more
		// 	// than one in the page
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

		// 	// End select each loop 
	});



	//Последовательная активация элементов
	$('.input-file').each(function () {
		var $input = $(this),
			$label = $input.closest('.label-input-file'),
			labelVal = $label.html();

		// Провеврка инпута на наличие класса has-file
		if ($('.input .label-input-file').hasClass('has-file')) {
			$('.input .label-input-file').removeClass('pulse');
		} else {
			$('.input .label-input-file').addClass('pulse');
		};
		// При изминении состояния инпута
		$('.input .label-input-file').change(function () {
			if ($(this).hasClass('has-file')) {
				$(this).removeClass('pulse');
				// Провеврка .select-wrapper на .disabled
				if ($('.select-wrapper').hasClass('disabled')) {
					setTimeout(function () {
						$('.select-wrapper').removeClass('disabled');
						$('.select-wrapper').addClass('pulse');
					}, 30000);

				}
			}
		});

		$input.on('change', function (element) {
			var fileName = '';
			if (element.target.value) fileName = element.target.value.split('\\').pop();
			fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);

			// setTimeout(function () {
			// 	// $('#btn-submit').removeClass('disabled');
			// 	$('.output-file').addClass('has-file');
			// }, 1500);

			// Открытие .popup-timer через 30 секунд и запуск таймера
			setTimeout(function () {
				$('.popup-timer').addClass('open');
				$('header, main, footer').addClass('blur');
				$("body").addClass("locked");
				
				// Запуск таймера
				var timer = $('.timer');
				function clearCountdown(interval) {
					clearTimeout(interval);
				}
				function countdown() {
					var countdownBegin = 30;
					var count = setInterval(function () {
						console.log(countdownBegin);

						if (countdownBegin <= 0) {
							timer.html('Done!');
							clearCountdown(count);
							// Анимация иконки .output-file и активация .view .btn
							setTimeout(function () {
								$(".popup").removeClass("open");
								$("body").removeClass("locked");
								$('header, main, footer').removeClass('blur');
								setTimeout(function () {
									// $('#btn-submit').removeClass('disabled');
									$('.view .btn').removeClass('disabled').addClass('pulse');
									$('.output-file').addClass('has-file');
								}, 1500);
							}, 1000);
						} else {
							--countdownBegin;
							timer.html(countdownBegin);
						}
					}, 1000);
				}
				countdown();
			}, 3000);
			
		});
	});

	$('.select-wrapper .custom-select-items').on('click', 'li', function () {
		$('.select-wrapper').remuveClass('pulse');
		$('#btn-submit').removeClass('disabled');
		$('#btn-submit').addClass('pulse');
		// if ($('#btn-submit').hasClass('disabled')) {
		// }
	});


	//POPUP open/close
	$(".open-popup").on("click", function (e) {
		e.preventDefault();
		var dataPopup = $('.' + $(this).attr("data-popup"));
		$(".popup").removeClass("open");
		$(dataPopup).addClass("open");
		$('header, main, footer').addClass('blur');
		$("body").addClass("locked");
	});

	$(document).mouseup(function (e) {
		var popup = $(".popup__box");
		if (!popup.is(e.target) && popup.has(e.target).length === 0) {
			$("body").removeClass("locked");
			$('header, main, footer').removeClass('blur');
			$(".popup").removeClass("open");
		}
	});


	// =======
})
