function menu(x) {

	/* меню */
	var point = document.querySelectorAll('nav.menu__point');

	var arr = Array.prototype.slice.call(point);
	arr.forEach(function(index, array, currentValue) {
		var classlist = index.classList;
		index.classList.remove('menu__point_active');
	});

	var get_elemnt = document.querySelector('.' + x);
	get_elemnt.classList.add('menu__point_active');


	/* отображение контента */
	var about = document.querySelector('.about');
	var career = document.querySelector('.career');
	var portfolio = document.querySelector('.portfolio');

	if (x == "menu__point-about") {
		about.style.display = 'flex';
		career.style.display = 'none';
		portfolio.style.display = 'none';
	
	} else if (x == "menu__point-career") {
		about.style.display = 'none';
		career.style.display = 'flex';
		portfolio.style.display = 'none';

	} else if (x == "menu__point-portfolio") {
		about.style.display = 'none';
		career.style.display = 'none';
		portfolio.style.display = 'flex';
	}
	
}