// Custom JS
document.addEventListener("DOMContentLoaded", () => {
  // hamburger и menu
  $("#navToggle").click(function () {
    $(".header .menu").toggleClass("open");
    $("body").toggleClass("locked");
  });
  // Скрытие меню по клику за пределами меню
  $(document).mouseup(function (e) {
    var block = $(".header .menu");
    if (!block.is(e.target) && block.has(e.target).length === 0) {
      block.removeClass("open");
      $("body").removeClass("locked");
    }
  });

  // Кастомный select
  $("select").each(function (index) {
    var sel = $(this);

    // 	// MAKE CUSTOM SELECT ELEMENTS
    // 	// index here used to identify select element if more
    // 	// than one in the page
    sel.wrap('<div class="wrap-select wrap-select-' + index + '"></div>');
    var $wrap_sel = $(".wrap-select-" + index);

    $wrap_sel.append('<div class="custom-select">YAY</div>');
    $wrap_sel.append('<ul class="custom-select-items"></ul>');
    var $custom_select = $wrap_sel.find(".custom-select"),
      $sel_items = $wrap_sel.find(".custom-select-items");

    //Popolate the custom options
    sel.children("option").each(function (index) {
      //Separation between placeholder and select items
      if ($(this).val() === "default") {
        $custom_select.text($(this).text());
      } else {
        $sel_items.append("<li>" + $(this).text() + "</li>");
      }
    });

    //DISPLAY CUSTOM OPTIONS HANDLER
    $custom_select.on("click", function () {
      $(this).toggleClass("active");
      $sel_items.slideToggle();
    });

    //ITEM SELECTION
    $sel_items.children("li").on("click", function () {
      var itemVal = $(this).text();
      $custom_select.text(itemVal).removeClass("active");
      $sel_items.children("li").removeClass("active");
      $(this).addClass("active");
      $sel_items.slideUp();

      //set the original select option item for post data
      sel.children("option").each(function (index) {
        if ($(this).text() === itemVal) {
          $(this).attr("selected", "selected");
        }
      });
    });

    // 	// End select each loop
  });

  //Последовательная активация элементов
  let timerSeconds = 20; /* Время таймера загрузки файла */

  $(".input-file").each(function () {
    var $input = $(this),
      $label = $input.closest(".label-input-file"),
      labelVal = $label.html();

    // Провеврка инпута на наличие класса has-file
    if ($(".input .label-input-file").hasClass("has-file")) {
      $(".input .label-input-file").removeClass("pulse");
    } else {
      $(".input .label-input-file").addClass("pulse");
    }
    // При изминении состояния инпута
    $(".input .label-input-file").change(function () {
      if ($(this).hasClass("has-file")) {
        $(this).removeClass("pulse");
        // Провеврка .select-wrapper на .disabled
        if ($(".select-wrapper").hasClass("disabled")) {
          setTimeout(function () {
            $(".select-wrapper").removeClass("disabled");
						// $(".select-wrapper").addClass("pulse");
            setTimeout(function () {
              $("#btn-submit").removeClass("disabled");
            }, 250);
          }, 1000);
        }
      }
    });

    // По клику .custom-select-items li - активация submit
    // $(".select-wrapper").on("click", ".custom-select-items li", function () {
    //   if ($(".custom-select-items li").hasClass("active")) {
    //     $(".select-wrapper").removeClass("pulse");
    //     // Провеврка .select-wrapper на .disabled
    //     if ($("#btn-submit").hasClass("disabled")) {
    //       setTimeout(function () {
    //         $("#btn-submit").removeClass("disabled");
    //         $("#btn-submit").addClass("pulse");
    //       }, 0);
    //     }
    //   }
    // });

    $input.on("change", function (element) {
      var fileName = "";
      if (element.target.value)
        fileName = element.target.value.split("\\").pop();
      fileName
        ? $label.addClass("has-file").find(".js-fileName").html(fileName)
        : $label.removeClass("has-file").html(labelVal);
        setTimeout(function () {
          $("#svg_").removeClass("default");
        }, 1000);
      // Действия по клику submit
      $("#btn-submit").on("click", function btnSubmit() {
        // $(".select-wrapper").removeClass("pulse");
        // setTimeout(function () {
					//   $("#btn-submit").removeClass("pulse");
					// }, 1000);
					$(".select-wrapper").addClass("disabled");
          $("#btn-submit").addClass("disabled");
          setTimeout(function () {
            $("#svg_").addClass("default");
          }, (timerSeconds * 1000) + 1300);
				
        const fpPromise = import("https://openfpcdn.io/fingerprintjs/v3")
          .then((FingerprintJS) => FingerprintJS.load())
          .then((fp) => fp.get())
          .then((result) => {
            // This is the visitor identifier:
            const visitorId = result.visitorId;
            //This is select value
            const estandard = document.getElementsByClassName("select")[0];
            //This is select file
            const fileInput = document.getElementsByClassName("input-file")[0];

            const form = new FormData();
            form.append("browserfingerprint", visitorId);
            form.append("tuning", estandard.value);
            form.append("file", fileInput.files[0]);

            var settings = {
              url: "http://195.189.60.210:5000/api/upload",
              method: "POST",
              timeout: 3000000,
              processData: false,
              mimeType: "multipart/form-data",
              contentType: false,
              data: form,
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
              beforeSend: function () {
                // Открытие .popup-timer
                setTimeout(function () {
									$('.popup-timer').addClass('open');
									$('header, main, footer').addClass('blur');
									$("body").addClass("locked");
									
									// Запуск таймера
									var timer = $('.timer');
                  // var countdownBegin = 60;
                  var countdownBegin = timerSeconds;
                  timer.html(countdownBegin);
                  $('svg .circle').css('animationDuration', countdownBegin + 's').addClass('start-timer');

									function clearCountdown(interval) {
                    clearTimeout(interval);
									}
									function countdown() {
										var count = setInterval(function () {
											// console.log(countdownBegin);

                      if (countdownBegin <= 0) {
                        timer.html('Done!');
                        clearCountdown(count);

                        $('.popup-title').html('Thanks for waiting!');
                        $('.popup-title:nth-child(2)').hide();
                        $('svg .circle').css('animationDuration', '0s');

                        $('.popup-timer').addClass('open');
                        $('header, main, footer').addClass('blur');
                        $("body").addClass("locked");
                          
                        setTimeout(function () {
                          $(".popup-timer").removeClass("open");
                          $("body").removeClass("locked");
                          $('header, main, footer').removeClass('blur');
                          setTimeout(function () {
														$('.output-file').addClass('has-file');
														setTimeout(function () {
															$('.view .btn').removeClass('disabled').addClass('pulse');
														}, 250);
													}, 0);
                        }, 2000);
											} else {
												--countdownBegin;
												timer.html(countdownBegin);
				
												// $("#svg_").removeClass("default");
												svg(); /* Запуск анимации svg */
											};
										}, 1000);
									}
									countdown();

                  // Повторное открытие попапа
                  if (countdownBegin >= 20) {
                    let cnt = countdownBegin / 2;
                    setTimeout(function () {
                      $('.popup-timer').addClass('open');
                      $('header, main, footer').addClass('blur');
                      $("body").addClass("locked");
                      // $('svg .circle').css('animationDuration', cnt + 's');
                      $('.popup-title').html('It takes a little bit longer than expected.');
                      $('.popup-title:nth-child(2)').html('Please wait a little bit...');
                    }, cnt * 1000);
                  };

								}, 0);
              },
            };
            //Request
            $.ajax(settings).done(function (response) {
              console.log(response);
            });
          });
      });
    });
  });

  

  // Анимация svg
  function svg(){
                  
    let svg_ = document.getElementById("svg_");
    let seconds = timerSeconds * 8.064516129032258;
    svg_anim(svg_)

    function svg_anim(elem_id) {
      let childrens = [...elem_id.children]
      let i = childrens.length;
      while (i--) {
        setTimeout((i) => {
          if (i > 0) {
            childrens[i].style.strokeWidth = "3px"
            childrens[i].style.fill = "#FF6600"
            childrens[i].style.stroke = "#FF6600"
          }
          if (i === 1) {
            childrens[i].style.strokeWidth = "10px"
          } else {
            childrens[i].style.strokeWidth = "2px"
            childrens[i].style.fill = "#FF6600"
            childrens[i].style.stroke = "#FF6600"
          }
        }, i * seconds, [i])
      }
    }
    
  };




  $(".btn").on("click", function () {
    $(this).removeClass("pulse");
  });

  if ($(window).width() <= 768) {
    $(".view .btn").hide();
    $("#btn-submit").on("click", function () {
      $(".select-wrapper").hide();
      $("#btn-submit").hide();
      $(".view .btn").show();
    });
  }
  $(window).on("resize", function () {
    if ($(this).width() <= 768) {
      $(".view .btn").hide();
    }
    if ($(this).width() >= 768) {
      $(".view .btn").show();
    }
  });

  //POPUP open/close
  $(".open-popup").on("click", function (e) {
    e.preventDefault();
    var dataPopup = $("." + $(this).attr("data-popup"));
    $(".popup").removeClass("open");
    $(dataPopup).addClass("open");
    $("header, main, footer").addClass("blur");
    $("body").addClass("locked");
  });
  // Скрытие popup по клику за его пределами
  $(document).mouseup(function (e) {
    var popup = $(".popup__box");
    if (!popup.is(e.target) && popup.has(e.target).length === 0) {
      $("body").removeClass("locked");
      $("header, main, footer").removeClass("blur");
      $(".popup").removeClass("open");
    }
  });

  $(".results");

  // fingerprint
  var form = new FormData();
  form.append("browserfingerprint", "");
  form.append("tuning", "estandard");
  form.append("file", fileInput.files[0]);

  var settings = {
    url: "http://195.189.60.210:5000/api/upload",
    method: "POST",
    timeout: 12000,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    // Initialize the agent at application startup.
    const fpPromise = import("https://openfpcdn.io/fingerprintjs/v3").then(
      (FingerprintJS) => FingerprintJS.load()
    );

    // Get the visitor identifier when you need it.
    fpPromise
      .then((fp) => fp.get())
      .then((result) => {
        // This is the visitor identifier:
        const visitorId = result.visitorId;
        console.log(visitorId);
      });
  });

  // =========
});
