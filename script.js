//Classes and Pototypes
var doc = document;
doc.gebi = doc.getElementById;
doc.gebt = doc.getElementsByTagName;
doc.gebc = doc.getElementsByClassName;
doc.qs = doc.querySelector;
doc.qsa = doc.querySelectorAll;
doc.ce = doc.createElement;

var log = console.log.bind(console);

var Counter = function(callback){this.i = 0; this.callback = callback;};
Counter.prototype.add = function(){this.i++;};
Counter.prototype.sub = function(){this.i--; if(!this.i)this.callback();};

Math.randInt = function(min, max){
	if(!max){max = min; min = 0;}
	return min + this.floor(this.random() * (max - min));
}

String.prototype.charAt = function(i, v){
	if(v)return this.substr(0, i) + v + this.substr(i + v.length);
	return this[i];
};

Array.prototype.pull = function(i){
	if(i == null)i = Math.floor(Math.random() * this.length);
	return this.splice(i, 1)[0];
};

Element.prototype.hide = function(){this.style.display = 'none';};
Element.prototype.show = function(){this.style.display = 'inline';};//!!!

//Effects
var showElement = function(el, callback = null, i = 0){
	if(el.style.opacity == 1){if(callback)callback(); return;}
	el.style.opacity = ++i / 10;
	setTimeout(function(){showElement(el, callback, i);}, 100);
};

var typeText = function(el, str, callback = null, i = 0){
	if(i == str.length){if(callback)callback(); return;}
	el.innerHTML = str.substr(0, ++i);
	setTimeout(function(){typeText(el, str, callback, i);}, 100);
};


//Game
var loose = function(){
	doc.qs('#game').hide();
	doc.qs('#loose').show();
};

var win = function(){
	doc.qs('#game').hide();
	doc.qs('#win').show();
};

var defect = function(str, d){
	var c = Math.floor(str.length * (1 - d));
	while(c){
		var p1 = Math.randInt(str.length), p2 = Math.randInt(str.length);
		var c1 = str[p1], c2 = str[p2];
		str = str.charAt(p1, c2).charAt(p2, c1);
		c--;
	}
	return str;
};

var answer = function(e){
	if(this.getAttribute('r') == 1){
		if(!questions.length || qNum == 15)win();
		else showNextQuestion();
	} else loose();
};

var showNextQuestion = function(){
	qEl.innerHTML = '';
	for(var i = 0; i < 4; i++)aEl[i].innerHTML = '';

	var q = questions.pull();

	typeText(qEl, defect(q.q, 1 - qNum / 15), 
		function(){
			var trigger = true;
			for(var i = 0; i < 4; i++){
				var r = Math.randInt(q.a.length);
				aEl[i].innerHTML = q.a.pull(r);
				if(trigger && !r){
					trigger = false;
					aEl[i].setAttribute('r', 1);
				} else aEl[i].setAttribute('r', 0);
				aEl[i].onclick = answer;
				showElement(aEl[i]);
			}
		}
	);

	qNum++;
};

//globals
var qEl, aEl;
var qNum = 0;
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