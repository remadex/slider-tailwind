const sliders = [
  {
    id: 1,
    title: 'Slider 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet convallis neque.',
    url: 'https://images.unsplash.com/photo-1647449682409-4db82256895b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
  },
  {
    id: 2,
    title: 'Les NFT sont-ils des tractopelles ?',
    description:
      'NFT signifie "jeton non fongible". L’adjectif « fongible » est un terme économique. Un tractopelle est un engin de génie civil combinant un chargeur sur pneus et une pelleteuse.',
    url: '/img/tracto.jpg',
  },
  {
    id: 3,
    title: 'Slider 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet convallis neque.',
    url: '/img/slide3.jpg',
  },
  {
    id: 4,
    title: 'Slider 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet convallis neque.',
    url: '/img/bald.jpg',
  },
  {
    id: 5,
    title: 'Slider 5',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet convallis neque.',
    url: '/img/pug.jpg',
  },
  {
    id: 6,
    title: 'Slider 6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet convallis neque.',
    url: '/img/persan.jpg',
  },
];

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const slider = $('#slider');
$('#previousBtn').disabled = true; // Default value of previous btn
if (sliders.length === 1) {
  // Disabled next btn if only one slide
  $('#nextBtn').disabled = true;
}

const nodes = sliders.map((slide, i) => {
  const s = document.createElement('div');
  s.classList.add('slide', i === 0 ? 'translate-x-0' : 'translate-x-full');
  s.style.backgroundImage = `url(${slide.url})`;
  s.dataset.slideId = slide.id;
  s.innerHTML = `
    <div class="px-10 md:px-16 py-4 md:py-8 bg-white/75 max-w-3xl">
      <h2 class="text-2xl md:text-4xl">${slide.title}</h2>
      <p class="mt-4">${slide.description}</p>
    </div>
  `;
  return s;
});

slider.prepend(...nodes);

const nextSlide = () => {
  let activeSlide = $('.slide.translate-x-0');

  // If it's the last slide, we can't go to the next slide
  if (activeSlide.dataset.slideId == sliders[sliders.length - 1].id) {
    return;
  }
  activeSlide.classList.remove('translate-x-0');
  activeSlide.classList.add('-translate-x-full');

  let nextSlide = activeSlide.nextElementSibling;
  nextSlide.classList.remove('translate-x-full');
  nextSlide.classList.add('translate-x-0');
  if (nextSlide.dataset.slideId == sliders[sliders.length - 1].id) {
    $('#nextBtn').disabled = true;
  } else {
    $('#nextBtn').disabled = false;
  }

  $('#previousBtn').disabled = false;
};

const previousSlide = () => {
  let activeSlide = $('.slide.translate-x-0');

  // If it's the first slide, we can't go to the previous slide
  if (activeSlide.dataset.slideId == '1') {
    return;
  }
  activeSlide.classList.remove('translate-x-0');
  activeSlide.classList.add('translate-x-full');

  let previousSlide = activeSlide.previousElementSibling;
  previousSlide.classList.remove('-translate-x-full');
  previousSlide.classList.add('translate-x-0');

  if (previousSlide.dataset.slideId == '1') {
    $('#previousBtn').disabled = true;
  } else {
    $('#previousBtn').disabled = false;
  }

  $('#nextBtn').disabled = false;
};

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (key === 'ArrowRight') {
    nextSlide();
  } else if (key === 'ArrowLeft') {
    previousSlide();
  }
});

let touchstartX = 0;
let touchendX = 0;

const handleGesture = () => {
  if (touchendX < touchstartX) nextSlide();
  if (touchendX > touchstartX) previousSlide();
};

slider.addEventListener('touchstart', (e) => {
  touchstartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
  touchendX = e.changedTouches[0].screenX;
  handleGesture();
});
