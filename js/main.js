

const testim = document.getElementById('testim');


const testimDots = Array.prototype.slice.call(document.getElementById('testim-dots').children);


const testimContent = Array.prototype.slice.call(document.getElementById('testim-content').children);


const testimLeftArrow = document.getElementById('left-arrow');


const testimRightArrow = document.getElementById('right-arrow');


const testimSpeed = 4500;


let currentSlide = 0;


let currentActive = 0;


let testimTimer;


let touchStartPos;


let touchEndPos;


let touchPosDiff;


const ignoreTouch = 30;


window.onload = () => {
  // Testim Script
  function playSlide(slide) {
    for (let k = 0; k < testimDots.length; k += 1) {
      testimContent[k].classList.remove('active');
      testimContent[k].classList.remove('inactive');
      testimDots[k].classList.remove('active');
    }

    if (slide < 0) {
      slide = currentSlide = testimContent.length - 1;
    }

    if (slide > testimContent.length - 1) {
      slide = currentSlide = 0;
    }

    if (currentActive !== currentSlide) {
      testimContent[currentActive].classList.add('inactive');
    }
    testimContent[slide].classList.add('active');
    testimDots[slide].classList.add('active');

    currentActive = currentSlide;

    clearTimeout(testimTimer);
    testimTimer = setTimeout(() => {
      playSlide(currentSlide += 1);
    }, testimSpeed);
  }

  testimLeftArrow.addEventListener('click', () => {
    playSlide(currentSlide -= 1);
  });

  testimRightArrow.addEventListener('click', () => {
    playSlide(currentSlide += 1);
  });

  for (let l = 0; l < testimDots.length; l += 1) {
    testimDots[l].addEventListener('click', function () {
      playSlide(currentSlide = testimDots.indexOf(this));
    });
  }

  playSlide(currentSlide);

  // keyboard shortcuts
  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case 37:
        testimLeftArrow.click();
        break;

      case 38: // ide case 39 volt eredetileg írva
        testimRightArrow.click();
        break;

      case 39:
        testimRightArrow.click();
        break;

      default:
        break;
    }
  });

  testim.addEventListener('touchstart', (e) => {
    touchStartPos = e.changedTouches[0].clientX;
  });

  testim.addEventListener('touchend', (e) => {
    touchEndPos = e.changedTouches[0].clientX;

    touchPosDiff = touchStartPos - touchEndPos;

    console.log(touchPosDiff);
    console.log(touchStartPos);
    console.log(touchEndPos);


    if (touchPosDiff > 0 + ignoreTouch) {
      testimLeftArrow.click();
    } else if (touchPosDiff < 0 - ignoreTouch) {
      testimRightArrow.click();
    } else {

    }
  });
};

// --------------------------------------------------------------------------------------
window.onscroll = () => {
  scrolledWindow();
};

function scrolledWindow() {
  const nav = document.querySelector('#main-menu');
  const top = document.body.scrollTop || document.documentElement.scrollTop;
  if (top !== 0) {
    nav.classList.add('scrolled-nav');
  } else {
    nav.classList.remove('scrolled-nav');
  }
}

//------------------------------------------------------------------------------------
const Testimonial = {
  Users: [],

  getData() {
    $.getJSON('http://46.101.237.11/json/users.json', (data) => {
      this.Users = data;
      console.log(this.Users);
      this.fillFiveRandomPerson();
    });
  },
  fillFiveRandomPerson() {
    for (let i = 0; i < 5; i += 1) {
      const randomNumber = Math.floor(Math.random() * this.Users.length);

      $(`#testim-content div:nth-child(${i + 1}) img`).attr('src', this.Users[randomNumber].picture);
      $(`#testim-content div:nth-child(${i + 1}) .h4`).text(`${this.Users[randomNumber].name.first}`);
      $(`#testim-content div:nth-child(${i + 1}) p`).html(`${this.Users[randomNumber].greeting}`);
    }
  },
};

Testimonial.getData();


// Open modals on click:
$('#privacy-link').click(() => {
  $('#privacy').modal();
});

$('#terms-link').click(() => {
  $('#terms').modal();
});

$('#faq-link').click(() => {
  $('#faq').modal();
});


// Tooltips:
$(document).ready(() => {
  $('[data-toggle="tooltip"]').tooltip();
});
