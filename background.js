console.log('im background script');
let body = {};
const url = chrome.runtime.getURL('questions_base.json');

fetch(url)
	.then((response) => response.json()) //assuming file contains json
	.then(function (json) {
		console.log('got json')
		body = json;
	});


chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {

		console.log('поймали запрос',request)

		let res = {
			res: "i got message, it was:" + request.question,
			body: body[request.question.replace("\n", " ").replace('​',"")] //иногда вопросы с херней какой то, поэтому почистим их
		}
		sendResponse(res);
		console.log('все ок, отправлем JSON', res)

		//для большей асинхронности
		return true;
	}
);
