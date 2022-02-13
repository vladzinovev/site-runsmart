// для слайдов картинок
$(document).ready(function(){
    $('.carusel_picture').slick({
        speed: 600,
        adaptiveHeight: true,
        prevArrow:'<button type="button" class="slick-prev"><img src="icons/left.png" alt="left"></button>',
        nextArrow:'<button type="button" class="slick-next"><img src="icons/right.png" alt="right"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                }
              },
            {
              breakpoint: 768,
              settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px'
              }
            },
            {
              breakpoint: 576,
              settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px'
              }
            }
          ]
            
    });
        //Для перемещения между вкладками (для фитнеса, для бега, для триатлона)
    $('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function() {
        $(this)
          .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
          .closest('div.catalog_main').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
    });
        //для кнопки "подробнее" в товарах
    $('.catalog_link').each(function(i) {
        $(this).on('click',function(e){
            e.preventDefault();
            $('.catalog_item_content').eq(i).toggleClass('catalog_item_content_active');
            $('.catalog_item_list').eq(i).toggleClass('catalog_item_list_active');
        })
    });
        //для кнопки "назад" в товарах
    $('.catalog_link_back').each(function(i) {
        $(this).on('click',function(e){
            e.preventDefault();
            $('.catalog_item_content').eq(i).toggleClass('catalog_item_content_active');
            $('.catalog_item_list').eq(i).toggleClass('catalog_item_list_active');
        })
    });

        //для открытия формы с консультацией
    $('[data-modal=consultation]').on('click', function(){
        $('.forms, #request').fadeIn('slow');
    });
        //для открытия формы заказа
    $('[data-modal=order]').on('click', function(){
        $('.forms, #order').fadeIn('slow');
    });
      //для закрытия всех форм по крестику
    $('.request_close').on('click', function(){
        $('.forms, #request, #order, #thank').fadeOut('slow');
    });
      //для открытия формы спасибо за заказ и закрытия всех остальных форм
    /*$('.button_order').on('click', function(){
        $('.forms, #request, #order').fadeOut('slow');
        $('.forms, #thank').fadeIn('slow');
    });*/
      //для отображения наименования заказа в форме
    $('[data-modal=order]').each(function(i){
        $(this).on('click', function(){
            $('#order .request_descr').text($('.catalog_subtitle').eq(i).text());
        })
    });


        //для оформления заявки на проверку введенных полей
    $('#consultation-form').validate({
        rules: {
            name: "required",
            tel: "required",
            email: {
                required:true,
                email:true,
            }
        },
        messages:{
            name:"Пожалуйста, введите свое имя",
            tel:"Пожалуйста, введите свой номер телефона",
            email: {
                required:"Пожалуйста, введите свою почту",
                email:"Неправильно введен адрес почты",
            },
        }
    });

    $('#request form').validate({
        rules: {
            name: "required",
            tel: "required",
            email: {
                required:true,
                email:true,
            }
        },
        messages:{
            name:"Пожалуйста, введите свое имя",
            tel:"Пожалуйста, введите свой номер телефона",
            email: {
                required:"Пожалуйста, введите свою почту",
                email:"Неправильно введен адрес почты",
            },
        }
    });

    $('#order form').validate({
        rules: {
            name: "required",
            tel: "required",
            email: {
                required:true,
                email:true,
            }
        },
        messages:{
            name:"Пожалуйста, введите свое имя",
            tel:"Пожалуйста, введите свой номер телефона",
            email: {
                required:"Пожалуйста, введите свою почту",
                email:"Неправильно введен адрес почты",
            },
        }
    });

    
 //для оформления заявки на проверку введенных полей 2 вариант
    function valideForms(form){
        $(form).validate({
            rules: {
                name: "required",
                tel: "required",
                email: {
                    required:true,
                    email:true,
                }
            },
            messages:{
                name:"Пожалуйста, введите свое имя",
                tel:"Пожалуйста, введите свой номер телефона",
                email: {
                    required:"Пожалуйста, введите свою почту",
                    email:"Неправильно введен адрес почты",
                },
            }
        });
    }

    valideForms('#consultation-form');
    valideForms('#request form');
    valideForms('#order form');

    //для маски телефонного номера
    $('input[name=tel]').mask("+7 (999) 999-99-99");

    //для отправки заказов на почту через сервер
    $('form').submit(function(e){
        e.preventDefault();

        if (!$(this).valid()){
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('.forms, #request, #order').fadeOut('slow');
            $('.forms, #thank').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    })

    //для перемещения стрелки на верх
    $(window).scroll(function(){
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
            
    });
    //для плавности перемещения стрелки на верх
    $("a.[href='#header']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    //активируем js wow плагин для анимации комментов
    new WOW().init();
  });


  