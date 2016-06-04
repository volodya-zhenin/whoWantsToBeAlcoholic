//Classes and Pototypes
var doc = document;
doc.gebi = doc.getElementById;
doc.gebt = doc.getElementsByTagName;
doc.gebc = doc.getElementsByClassName;
doc.qs = doc.querySelector;
doc.qsa = doc.querySelectorAll;

var Counter = function(callback){this.i = 0; this.callback = callback;};
Counter.prototype.add = function(){this.i++;};
Counter.prototype.sub = function(){this.i--; if(!this.i)this.callback();};

Math.randInt = function(min, max){
	if(!max){max = min; min = 0;}
	return min + this.floor(this.random() * (max - min));
}

Array.prototype.pull = function(i){
	if(!i)i = Math.floor(Math.random() * this.length);
	return this.splice(i, 1)[0];
};

Element.prototype.hide = function(){this.style.display = 'none';};

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
var loose = function(){
	doc.qs('#game').hide();
	doc.qs('#loose').show();
};

var answer = function(){
	loose();
};

var showNextQuestion = function(){
	qEl.innerHTML = '';
	for(var i = 0; i < 4; i++)aEl.innerHTML = '';

	var q = questions.pull();

	typeText(qEl, q.q, 
		function(){
			var c = new Counter(function(){
				console.log('callback');
			});
			for(var i = 0; i < 4; i++){
				aEl[i].innerHTML = q.a.pull();
				c.add();
				showElement(aEl[i], function(){c.sub();});
			}
		}
	);
};

//globals
var qEl, aEl;
var questions = [
	{q: 'Как меня зовут',
	a: ['Славик', 'Слава', 'Славен', 'Славутич']},
	{q: 'Сколько грамм в одной бутылке',
	a: ['1000', '500', '300', 'А мне это в жизни не пригодится']},
	{q: 'Который сейчас час',
	a: ['Самое время', 'Первый', 'Второй', 'Третий']}
];

//main
window.onload = function(){
	qEl = doc.qs('#question');
	aEl = doc.qsa('.answer');

	showNextQuestion();
};