document.body.onload = showReviews;
document.body.onkeypress = keyHandler;
document.getElementById('sendReview').onclick = sendReview;
document.getElementById('last').onclick = showReviews;
document.getElementById('all').onclick = showAll;

let container = document.getElementById('reviews');
let div = document.getElementById('newReview');


function keyHandler(event) {
    if((event.ctrlKey) && ((event.keyCode === 0xA)||(event.keyCode === 0xD))) {
		sendReview();
    }
};


function showAll(){
	let request = new XMLHttpRequest();
    request.onload = function (){
        let text = request.responseText;
        let str = JSON.parse(text);
		container.innerHTML = '';
		let mas = str.reviews;
        for(let message of mas){
			
			insertReviewDiv(div, container, message);
        }
		let comments = document.getElementById('comments');
		let likes = document.getElementById('likes');
    };
    request.open('GET', 'review.json');
    request.send();
}
function sendReview() {
	let name = document.getElementById('user').value;
	let post = document.getElementById('text').value;
	if(name == '' || post == '') {        
		alert('Введите все данные.');
        return false;
	}     
	else {
		
			let request = new XMLHttpRequest();
			request.onload = showReviews;
			request.open('post', 'save.php');
			request.send(JSON.encodeURI('user=' + name + '&text=' + post));
			name = '';
			post = '';
		
	}
}
function showReviews(){
    let request = new XMLHttpRequest();
    request.onload = function (){
        let text = request.responseText;
        let str = JSON.parse(text);
		container.innerHTML = '';
		let mas = str.reviews;
		let masLength = mas.length;
		let newMas = mas.slice(masLength - 3, masLength);
        for(let message of newMas){
			
			insertReviewDiv(div, container, message);
        }
		let comments = document.getElementById('comments');
		let likes = document.getElementById('likes');
		comments.innerHTML = masLength;
		likes.innerHTML = 130;
    };
    request.open('GET', 'review.json');
    request.send();
}



function insertReviewDiv(div, container, message){
	let clone = div.cloneNode(true);
	let tip = document.createElement('div');
	let p = document.createElement('p');
	let strong = document.createElement('strong'); 
	let span = document.createElement('span');
	let monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

	
	

	strong.innerHTML = message.user +' ';
	
	let date = new Date(message.date);
	let day = date.getDate();
	let monthIndex = date.getMonth();
	let year = date.getFullYear();
	let data = day + ' ' + monthNames[monthIndex] + ' ' + year;
	span.innerHTML = data;
	clone.innerHTML = message.text;
	clone.classList.add('review','m-0', 'mb-3', 'p-2');
	tip.classList.add('dialogTip');
	strong.classList.add('pr-2');
	p.classList.add('comment', 'm-0', 'mt-2', 'mb-3','serviceText');
	span.classList.add('text-muted', 'position');
	clone.id = 'review_' + message.user + '_' + date.toLocaleDateString();
	container.appendChild(p);
	p.appendChild(strong);
	p.appendChild(span);
	container.appendChild(tip);
	container.appendChild(clone);

	
}

function like()
{
	document.getElementById('likes').innerHTML = Number(document.getElementById('likes').innerHTML)+1;
}
