var Counter = function(callback){this.i = 0; this.callback = callback;};
Counter.prototype.add = function(){this.i++;};
Counter.prototype.sub = function(){this.i--; if(!this.i)this.callback();};

//Effects
var showElement = function(el, callback = null, i = 0){
	if(el.style.opacity == 1){callback(); return;}
	el.style.opacity = ++i / 10;
	setTimeout(function(){showElement(el, callback, i);}, 100);
};

var typeText = function(el, str, callback = null, i = 0){
	if(i == str.length){callback(); return;}
	el.innerHTML = str.substr(0, ++i);
	setTimeout(function(){typeText(el, str, callback, i);}, 100);
};

//Game
var showQuestion = function(question, answers, callback){
	qEl.innerHTML = '';
	for(var i = 0; i < answers.length; i++)aEl.innerHTML = '';

	var c = new Counter(callback);
	typeText(
		qEl, 
		question, 
		function(){
			for(var i = 0; i < answers.length; i++){
				aEl[i].innerHTML = answers[i];
				c.add();
				showElement(aEl[i], function(){c.sub();});
			}
		}
	);
};

//globals
var qEl, aEl;

//main
window.onload = function(){
	qEl = document.getElementById('question');
	aEl = document.getElementsByClassName('answer');

	showQuestion(
		'Тестовый вопрос', 
		['ANswer1', 'answer2', 'answer3', 'answer4'], 
		function(){console.log('it\'s work')}
	);
};