'use strict';

document.addEventListener("DOMContentLoaded", function() {

	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);
		formData.append('image', formImage.files[0]);

		if (error === 0) {
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert('Ошибка при отправке');
				form.classList.remove('_sending');
			}

		} else {
			alert('Заполниет поле'); // доделать
		}

	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		console.log(formReq);

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if(emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	//картинка в форме
	const formImage = document.getElementById('formImage');
	const formPreview = document.getElementById('formPreview');

	// изменения в инпуте файл
	formImage.addEventListener('change', () =>  {
		uploadFile(formImage.files[0]);
	});

	function uploadFile(file) {

		if (!['image/jpeg', 'image/png', 'image/gif', 'image/ico'].includes(file.type)) {
			alert('Только изображения');
			formImage.value = '';
			return;
		}

		if (file.size > 2 * 1024 * 1024) {
			alert('Размер менее 2 мб.');
			return;
		}

		var reader = new FileReader();
		reader.onload = function (e) {
			formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
		};
		reader.onerror = function (e) {
			alert('Ошибка');
		};
		reader.readAsDataURL(file);
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	function emailTest(input) {
		return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/. test(input.value);
	}

	//----------------------SLIDER-hero----------------------
		// var mySwiper = new Swiper('.hero__slider', {
		// 	loop: true,
		// 	pagination: {
		// 		el: '.hero__pagination',
		// 		clickable: 'true',
		// 	},
		// 	navigation: {
		// 		nextEl: '.hero__next',
		// 		prevEl: '.hero__prev',
		// 	},
		// });

	//----------------------MODAL-----------------------
		const modals = (triggerSelector, modalSelector, closeSelector) => {
			const trigger = document.querySelectorAll(triggerSelector),
						modal = document.querySelector(modalSelector),
						close = document.querySelector(closeSelector);
	
			trigger.forEach(item => {
				item.addEventListener('click', (e) => {
					if (e.target) {
						e.preventDefault();
					}
					modal.style.display = 'flex';
					document.body.classList.add('modal--open')
				});
			})
	
			close.addEventListener('click', () => {
				modal.style.display = 'none';
				document.body.classList.remove('modal--open');
			});
	
			modal.addEventListener('click', (e) => {
				if (e.target === modal) {
					modal.style.display = 'none';
					document.body.classList.remove('modal--open');
				}
			});
	
		};
		// modals('.order__open', '.modal--order', '.modal--order .modal__close');

	//----------------------SCROLL-----------------------
		const scrollTo = (scrollTo) => {
			let list = document.querySelector(scrollTo);
			list = '.' + list.classList[0]  + ' li a[href^="#"';
	
			document.querySelectorAll(list).forEach(link => {
	
				link.addEventListener('click', function(e) {
						e.preventDefault();
						const scrollMenu = document.querySelector(scrollTo);
	
						let href = this.getAttribute('href').substring(1);
	
						const scrollTarget = document.getElementById(href);
	
						// const topOffset = scrollMenu.offsetHeight;
						const topOffset = 70;
						const elementPosition = scrollTarget.getBoundingClientRect().top;
						const offsetPosition = elementPosition - topOffset;
	
						window.scrollBy({
								top: offsetPosition,
								behavior: 'smooth'
						});
	
						
						let button = document.querySelector('.hamburger'),
								nav = document.querySelector('.header__nav'),
								header = document.querySelector('.header');
	
						button.classList.remove('hamburger--active');
						nav.classList.remove('header__nav--active');
						header.classList.remove('header--menu');
				});
			});
		};
		// scrollTo('.header__nav');
	
	//----------------------FIXED-HEADER-----------------------
		const headerFixed = (headerFixed, headerActive) => {
			const header =  document.querySelector(headerFixed),
						active = headerActive.replace(/\./, '');
	
			window.addEventListener('scroll', function() {
				const top = pageYOffset;
				
				if (top >= 90) {
					header.classList.add(active);
				} else {
					header.classList.remove(active);
				}
	
			});
	
		};
		// headerFixed('.header', '.header--active');
	
	//----------------------HAMBURGER-----------------------
		const hamburger = (hamburgerButton, hamburgerNav, hamburgerHeader) => {
			const button = document.querySelector(hamburgerButton),
						nav = document.querySelector(hamburgerNav),
						header = document.querySelector(hamburgerHeader);
	
			button.addEventListener('click', (e) => {
				button.classList.toggle('hamburger--active');
				nav.classList.toggle('header__nav--active');
				header.classList.toggle('header--menu');
			});
	
		};
		// hamburger('.hamburger', '.header__nav', '.header');
	
	
	});
	