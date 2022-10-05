document.addEventListener('DOMContentLoaded', function () {
  header()
  anchor()
  aboutSlider()
  licensedSlider()
  ratingSlider()
  reviewsSlider()
  services()
  specialistsSlider()
  tabs()
  contacts()
})

let galleryPopupSlider

function header() {
  const menuItem = $('.header__menu-link')
  const activeClass = 'header__menu-link--active'

  headerSize()
  window.addEventListener('resize', headerSize)

  $(window).on('scroll', function () {
    const headerHeight = document.querySelector('.header').offsetHeight
    $('.section').each(function () {
      if (($(this).offset().top - 10) < ($(window).scrollTop() + headerHeight)) {
        const sectionId = $(this).attr('id')
        const linkActive = $(`[href="#${sectionId}"]`)
        if (linkActive.length > 0) {
          menuItem.removeClass(activeClass)
          linkActive.addClass(activeClass)
        }
      }
    })
  })

  $('.header__burger-btn').on('click', function () {
    $(this).hasClass('active') ? headerBurgerClose() : headerBurgerOpen()
  })
  $('.header__overlay').on('click', function () {
    headerBurgerClose()
  })
}

function headerSize() {
  const headerHeight = document.querySelector('.header').offsetHeight
  document.documentElement.style.setProperty('--header-height', `${headerHeight}px`)
}
function headerBurgerOpen() {
  $('html').addClass('ov-hidden')
  $('.header__burger-btn').addClass('active')
  $('.header').addClass('header--open')
}
function headerBurgerClose() {
  $('.header__burger-btn').removeClass('active')
  $('.header').removeClass('header--open')
  $('html').removeClass('ov-hidden')
}

function anchor() {
  $('.js-anchor').on('click', function () {
    const itemHref = $(this).attr('href')
    const headerHeight = document.querySelector('.header').offsetHeight
    const scrollValue = $(itemHref).offset().top - headerHeight
    if ($('.header__burger-btn').hasClass('active')) {
      headerBurgerClose()
    }
    $('html, body').animate({
      scrollTop: `${scrollValue}px`
    })
    return false
  })
}

function galleryPopupSwiper() {
  galleryPopupSlider = new Swiper('.about-popup .swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  })
}

function getPopup(popup, source) {
  const popupSource = source || popup.data('src')
  const linkIndex = popup.index()

  Fancybox.show(
    [{
      src: popupSource,
      preload: false
    }],
    {
      mainClass: 'popup',
      parentEl: document.querySelector('.wrapper'),
      showClass: 'fancybox-fadeIn',
      hideClass: 'fancybox-fadeOut',
      hideScrollbar: true,
      touch: false,
      autoFocus: true,
      trapFocus: true,
      dragToClose: false,
      on: {
        done: (fancybox, slide) => {
          if (popupSource === '#about-popup') {
            galleryPopupSwiper()
            // galleryPopupSlider.update()
            galleryPopupSlider.slideTo((linkIndex), 300)
          }
        }
      }
    })
  Fancybox.defaults.ScrollLock = false
  return false
}

function contacts() {
  if (document.querySelector('#contactsMap')) {
    ymaps.ready(mapInit)
  }
}

function mapInit() {
  let myMap
  const mapzoom = $(window).width() > 767 ? 15 : 12
  myMap = new ymaps.Map('contactsMap', {
    center: [55.669254, 37.521758],
    zoom: mapzoom,
    controls: []
  }, {
    suppressMapOpenBlock: true
  })
  const placemark = new ymaps.Placemark([55.669254, 37.521758], {}, {
    iconColor: '#ff3333'
  })

  myMap.geoObjects.add(placemark)
  myMap.behaviors.disable('scrollZoom')
  if (window.innerWidth < 1025) {
    myMap.behaviors.disable('drag')
  }
}

function aboutSlider() {
  if (document.querySelector('.about .swiper')) {
    const slider = new Swiper('.about .swiper', {
      slidesPerView: 2,
      spaceBetween: 15,
      navigation: {
        nextEl: '.about .swiper-button-next',
        prevEl: '.about .swiper-button-prev'
      },
      breakpoints: {
        767: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        1025: {
          slidesPerView: 2,
          spaceBetween: 15
        },
        1500: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    })
  }
}

function licensedSlider() {
  if (document.querySelector('.licensed .swiper')) {
    const slider = new Swiper('.licensed .swiper', {
      slidesPerView: 1,
      spaceBetween: 25,
      navigation: {
        nextEl: '.licensed .swiper-button-next',
        prevEl: '.licensed .swiper-button-prev'
      },
      pagination: {
        el: '.licensed .swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        560: {
          slidesPerView: 2,
          spaceBetween: 45
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 45
        },
        1500: {
          slidesPerView: 3,
          spaceBetween: 85
        }
      }
    })
  }
}

function ratingSlider() {
  if (document.querySelector('.rating .swiper')) {
    const slider = new Swiper('.rating .swiper', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.rating .swiper-button-next',
        prevEl: '.rating .swiper-button-prev'
      },
      breakpoints: {
        767: {
          slidesPerView: 'auto',
          spaceBetween: 20
        },
        1500: {
          slidesPerView: 4,
          spaceBetween: 30
        }
      }
    })
  }
}

function reviewsSlider() {
  if (document.querySelector('.reviews .swiper')) {
    const slider = new Swiper('.reviews .swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: '.reviews .swiper-button-next',
        prevEl: '.reviews .swiper-button-prev'
      },
      pagination: {
        el: '.reviews .swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        767: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 30
        }
      }
    })
  }
}

function specialistsSlider() {
  if (document.querySelector('.specialists .swiper')) {
    const slider = new Swiper('.specialists .swiper', {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: '.specialists .swiper-button-next',
        prevEl: '.specialists .swiper-button-prev'
      },
      pagination: {
        el: '.specialists .swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        767: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 45
        },
        1500: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 145
        }
      }
    })
  }
}

function tabs() {
  const tabsHead = '.tabs-head'
  const tabsHeadItem = '.tabs-head__item'
  const tabsHeadItemActive = 'tabs-head__item--active'
  const tabsMainItem = '.tabs-main__item'
  const tabsMainItemActive = 'tabs-main__item--active'

  if ($(tabsHead).length > 0) {
    const tabsNav = document.querySelectorAll(tabsHead)

    for (const item of tabsNav) {
      const headSlider = item.querySelector('.swiper')

      const tabsSlider = new Swiper(headSlider, {
        spaceBetween: 10,
        slidesPerView: 'auto',
        freeMode: true,
        breakpoints: {
          767: {
            slidesPerView: 'auto',
            spaceBetween: 48
          }
        }
      })
    }
    $(tabsHeadItem).on('click', function (event) {
      if ($(this).find('.tabs-head__link').length === 0 && !$(this).hasClass(tabsHeadItemActive)) {
        $(this).siblings(tabsHeadItem).removeClass(tabsHeadItemActive)
        $(this).addClass(tabsHeadItemActive)
        $(this).parents(tabsHead).siblings('.tabs-main').children(tabsMainItem).fadeOut(0).eq($(this).index()).fadeIn()
      }
    })
  }
}

function services() {
  $('.services__more .ui-button').on('click', function () {
    const parentBlock = $(this).parents('.services')
    const parentWrapper = parentBlock.find('.services__wrapper')
    const headerHeight = document.querySelector('.header').offsetHeight
    const scrollValue = `${parentBlock.offset().top - headerHeight}px`
    parentWrapper.toggleClass('services__wrapper--open')
    parentBlock.find('.services__item--mob-hidden').fadeToggle()

    $(this).toggleText('Показать все услуги', 'Свернуть')
    if (parentWrapper.hasClass('services__wrapper--open')) {
      $('html, body').animate({ scrollTop: scrollValue })
    }
  })

  if (document.querySelector('.services')) {
    const caseItems = gsap.utils.toArray('.services__item')
    caseItems.forEach((caseItem, index) => {
      const anim = gsap.from(caseItem, {
        duration: 0.4,
        ease: 'none',
        x: '90%',
        opacity: 0,
        delay: index % 2 ? 0.1 : 0
      })
      ScrollTrigger.create({
        trigger: caseItem,
        start: 'top 85%',
        animation: anim,
        once: true
      })
    })
  }
}

$.fn.extend({
  toggleText: function (textInitial, textSecondary) {
    return this.text(this.text() === textSecondary ? textInitial : textSecondary)
  }
})
