---
layout: post

title:  "ES6: Перед тем, как вы начнёте"
categories: JavaScript
author: amorgunov
date:   2015-12-28 22:50:58 +0300
type: article

comments: true
identifier: es6-before-you-start

nextTitle: "Вместо введения"
nextLink: "http://jsraccoon.ru/es6-introduction"

prevTitle: "How to install Elixir on Mac OS X"
prevLink: "http://jsraccoon.ru/es6-introduction"

description: "Перед изучением нового стандарта ES6 необходимо помнить, что многие нововведения базируются на прошлом стандарте ES5. Для полного понимания многих новых конструкций и особенностей синтаксиса ES6 необходимо знание основ JavaScript. В статье вы найдете подборку книг и несколько воспросов для проверки своей готовности изучения нового стандарта."

tags: [javascript, es6]
---

Перед тем, как вы приступите к изучению ES6 и начнете читать данный цикл статей, я настоятельно рекомендую вам ознакомиться с предыдущим стандартом ES5. 

Если вы всё ещё не достаточно уверены в своих знаниях, то данные ресурсы помогут вам освоить всё самое необходимое.
 

{% highlight javascript %}
var MyFamily = new Family([ // Моя семья
  { Name: "Саша" },
  { Name: "Юля" },
  { Name: "Елизар" }
]);
{% endhighlight %}


Материалы на **русском** языке:

1. [JavaScript.ru](https://learn.javascript.ru/) − самый объемный и полный онлайн учебник. Первая часть учебника полностью посвящена стандарту ES и разбору всех синтаксических конструкций. 

2. [Выразительный JavaScript](http://habrahabr.ru/post/240219/) − бесплатная книга, полностью переведенная на Хабре. Книга послужит очень прочным фундаментом для дальнейшего изучения JavaScript и подойдет абсолютно для всех − в независимости от вашего уровня подготовки вы обязательно узнаете что-нибудь новое. 

3. [JavaScript. Подробное руководство](http://www.ozon.ru/context/detail/id/31286240/) − наиболее полное изложение всех особенностей языка JavaScript, включая стандарт ES5.

4. [JavaScript. Сильные стороны](http://www.ozon.ru/context/detail/id/28288656/) − книга, полностью посвященная лучшим сторонам JavaScript. Перед прочтением рекомендую ознакомиться с [докладом](https://www.youtube.com/watch?v=hQVTIJBZook) Дугласа Крокфорда (автора книги). В докладе кратко излагаются основные идеи, описанные в книге. 

5. [Секреты JavaScript ниндзя](http://www.ozon.ru/context/detail/id/22421421/) − книга, написанная создателем jQuery (Джоном Резигом). Вся книга посвящена использованию функционального программирования в JavaScript. Ясное представление того, что JavaScript − язык *функционального* программирование, отличает мастера от середнячка. 


Материалы на **английском** языке:

Лучшее, что сможете найти для детального изучения всех особенностей JavaScript − серия книг You Don't Know JS. Все книги бесплатные, подробно и без лишней воды описывают всё, что вы вообще можете захотеть знать о JavaScript, а также сложности и неочевидные моменты, которые часто возникают при изучении JavaScript. Серия содержит книги для людей с разным уровнем подготовки, поэтому рекомендую придержитваться следующего порядка прочтения:

1. [Up & Going](https://github.com/getify/You-Dont-Know-JS/blob/master/up%20&%20going/README.md#you-dont-know-js-up--going) − В книге описаны основы JavaScript. Именно на знания полученные из этой книги вы будете опираться в будущем.
2. [Types & Grammar](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20&%20grammar/README.md#you-dont-know-js-types--grammar) − подробно рассмотрен каждый тип данных и "грамматика" (как работают синтаксические конструкции).
3. [Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures) − области видимости и замыкания.
4. [this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes) − ключевое слово `this` и принципы прототипного наследования (основы объектно-ориентированного программирования).