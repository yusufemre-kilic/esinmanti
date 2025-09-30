const next = document.getElementById('next');
const prev = document.getElementById('prev');
const cardContainer = document.querySelector('.cards-container');
const navMenu = document.getElementById('nav-menu');
const iconMenu = document.getElementById('menu-icon');

const togglerActive = (e) => {
	iconMenu.parentElement.classList.toggle('active');
};


iconMenu.addEventListener('click', togglerActive);

let allowedShowItem;
if (window.screen.width > 995) {
	allowedShowItem = 3;
} else if (window.screen.width <= 995 && window.screen.width > 610) {
	allowedShowItem = 2;
	console.log('2');
} else {
	allowedShowItem = 1;
	console.log('1');
}

// card.offsetWidth = (mainSlider.clientWidth / activeItem);
let cardWidth = document.querySelector('.card').offsetWidth;
const itemLength = [...document.querySelectorAll('.cards-container .card')]
	.length;
console.log(document.querySelectorAll('.card'));

let activeItem = allowedShowItem;
console.log(activeItem, allowedShowItem, itemLength);

window.onresize = () => {
	cardWidth = document.querySelector('.card').offsetWidth;
	window.screen.width >= 995 ? (allowedShowItem = 2) : (allowedShowItem = 3);
	window.screen.width >= 610 ? (allowedShowItem = 1) : (allowedShowItem = 3);
	activeItem = allowedShowItem;
};

let left = 0;
let nextCard = (e) => {
	if (activeItem !== itemLength) {
		left -= cardWidth;
		cardContainer.style.transform = `translateX(${(left -= 20)}px)`;
		activeItem++;
		// console.log(cardWidth);
		// console.log(activeItem)
		// console.log(itemLength)
	} else return false;
};

let prevCard = (e) => {
	if (activeItem > allowedShowItem) {
		left += cardWidth;
		cardContainer.style.transform = `translateX(${(left += 20)}px)`;
		activeItem--;
		// console.log(cardWidth);
		// console.log(activeItem)
		// console.log(itemLength)
	} else return false;
};

next.addEventListener('click', nextCard);
prev.addEventListener('click', prevCard);


let activeChefItems = [...document.getElementsByClassName('slider-item')].length;
let chefItemWidth = sliderItem.offsetWidth;
const nextItem = document.querySelector('.chef-main-slider .next');
const prevItem = document.querySelector('.chef-main-slider .prev');
const movedItemChef = document.querySelector('.moved-chef-slider');

let leftMove = 0;
let allowedShowedChef = 1;
let itemToShow = allowedShowedChef;
console.log(activeChefItems, chefItemWidth, itemToShow, allowedShowedChef);

let nextItemChef = (e) => {
	if (itemToShow != activeChefItems) {
		nextItem.classList.remove('disabled');
		prevItem.classList.remove('disabled');
		leftMove -= chefItemWidth;
		movedItemChef.style.transform = `translateX(${leftMove}px)`;
		itemToShow++;
	} else {
		nextItem.classList.add('disabled');
		return false;
	}
};

let prevItemChef = (e) => {
	if (itemToShow != allowedShowedChef) {
		prevItem.classList.remove('disabled');
		nextItem.classList.remove('disabled');
		leftMove += chefItemWidth;
		movedItemChef.style.transform = `translateX(${leftMove}px)`;
		itemToShow--;
	} else {
		prevItem.classList.add('disabled');
		return false;
	}
};


nextItem.addEventListener('click', nextItemChef);
prevItem.addEventListener('click', prevItemChef);
/*
window.addEventListener('scroll', function () {
    const dish = document.querySelector('img.dish');
    if (!dish) return;
    // Daha yavaş döndürmek için scrollY değerini böl
    const rotate = (window.scrollY / 3) % 360;

    
    let baseTransform = '';
    if (dish.dataset.baseTransform === undefined) {
        dish.dataset.baseTransform = dish.style.transform || '';
    }
    baseTransform = dish.dataset.baseTransform.replace(/rotate\([^)]+\)/, '').trim();

    dish.style.transform = `${baseTransform} rotate(${rotate}deg)`.trim();
});
document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener('scroll', function () {
        const dish = document.querySelector('img.dish');
        if (!dish) return;

        // Daha yavaş döndürmek için scrollY değerini böl
        const rotate = (window.scrollY / 3) % 360;

        let baseTransform = '';
        if (dish.dataset.baseTransform === undefined) {
            dish.dataset.baseTransform = dish.style.transform || '';
        }
        baseTransform = dish.dataset.baseTransform.replace(/rotate\([^)]+\)/, '').trim();

        dish.style.transform = `${baseTransform} rotate(${rotate}deg)`.trim();
    });
});


document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener('scroll', function () {
        const dish = document.querySelector('img.dish');
        if (!dish) return;

        const rotate = (window.scrollY / 3) % 360;
        dish.style.transform = `rotate(${rotate}deg)`;
    });
});
*/

document.addEventListener("DOMContentLoaded", function() {
    const menuEls = document.querySelectorAll('#menu h2, #menu .card');
    if (!menuEls.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        },
        { threshold: 0.7 }
    );

    menuEls.forEach(el => observer.observe(el));
});
