document.addEventListener("click", function (event) {

	let target = event.target;
	console.log(target)

	//если клик не на вопрос, но выходим
	if (target.parentElement.className !== 'questionText' && target.parentElement.parentElement.className !== 'questionText') {
		return;
	}

	chrome.runtime.sendMessage({question: event.path[0].innerText}, function (response) {
		console.log(response.body);

		let options = document.getElementsByClassName('ai-option-label');

		let optionsArray = [];

		//не знаю как работать с коллекциями, поэтому сделаю из нее массив
		for (let item of options) {
			optionsArray.push(item);
		}

		//проверяем каждый инпут, есть ли его значение в массиве с ответами
		optionsArray = optionsArray.filter(function (value) {
			return response.body.includes(value.querySelector('.ai-option .mattext').innerText)
		})
		//каждый верный выбираем
		optionsArray.forEach(function (value){
			console.log(value.querySelector('input').checked = true)
		})
	})
})

console.log('started')

