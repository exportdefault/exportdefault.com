---
layout: post

title:  "Backbone c ES6"
categories: JavaScript
author: amorgunov
date:   2016-08-01 22:50:58 +0300
type: article

comments: true
identifier: backbone-es6

nextTitle: "Вместо введения"
nextLink: "http://jsraccoon.ru/es6-introduction"

prevTitle: "How to install Elixir on Mac OS X"
prevLink: "http://jsraccoon.ru/es6-introduction"

slogan: backbone + ecmascript6 = ♡

description: "Перед изучением нового стандарта ES6 необходимо помнить, что многие нововведения базируются на прошлом стандарте ES5. Для полного понимания многих новых конструкций и особенностей синтаксиса ES6 необходимо знание основ JavaScript. В статье вы найдете подборку книг и несколько воспросов для проверки своей готовности изучения нового стандарта."

tags: [javascript, es6]
---

После утверждения стандарта ES6 прошло уже много времени. Если прочитали одну статью или две (сотни) о новых возможностях, но до сих пор не начали использовать их, то давайте начнем прямо сейчас.

Перед изучением материала рекомендую прочитать статью "Болванка для Gulp", описывающий процесс создание gulp-файла, который можно использовать для реализации простый приложений или тестирования.

Подготовка ... (?)

### Babel + Browserify

На сегодняшний день не один браузер нативно не поддерживает модули ES6, поэтому мы будет использовать babel совместно с browserify для "транспайлер

....

Traceur's compilation can be run both offline or in realtime, in the browser. While not suggested for production sites, we can take advantage of this realtime compilation for purposes of trying things out. To get started, we're going to install a handful of components using Bower and create a basic index.html file.

bower install jquery underscore backbone es6-module-loader
{% highlight html %}
<!DOCTYPE html>
<html>
<head>
    <title>Backbone with ES6</title>
</head>
<body>

    <div id="app"></div>

    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/underscore/underscore.js"></script>
    <script src="bower_components/backbone/backbone.js"></script>
    <script src="bower_components/traceur/traceur.js"></script>
    <script src="bower_components/es6-module-loader/dist/es6-module-loader.js"></script>

</body>
</html>
{% endhighlight %}
From here, things will work similarly to other module loaders you may have used (think Browserify or RequireJS). You'll specify a module to import as your “main” file. Your main file will then handle loading any dependencies it needs (and the dependencies will load their dependencies, and so on). Let's create our main file and load it using the ES6 Module Loader. We'll create app/scripts/main.js and then add the following below the <script> tags we wrote above.
{% highlight javascript %}
<script>
    System.import('app/scripts/main');
</script>
{% endhighlight %}
### Классы и экспортирование модулей

Что бы разобраться, как работают "классы" и модули, сделаем следующее:

1. Определим модуль для нашего роута `Route`, который будет наследоваться от `Backbone.Router`.
2. Импортируем роут в наш главный файл `main` и создатим объект класса `Route`.
3. Запустим "историю Backbone" и убедимся, что был выбран роут по умолчанию.
4. Дополнительно, создадим несколько представлений для отображения шаблона при вызове роута.

Давайте создам файл, `app/js/router.js`:

{% highlight javascript %}
export default class Router extends Backbone.Router {
  constructor () {
    super({
      routes: {
        '': 'home',
        'about': 'about'
      }
    });
  }

  home () {
    console.log('Router#home was called!');
  }

  about () {
    console.log('Router#about was called!');
  }
}
{% endhighlight %}

Для тех, кто уже писал приложения на Backbone c использованием **CoffeeScript**, данный синтаксис будет выглядеть очень знакомым. Как вы видите, использую ES6, у нас возможность использовать синкасический сахар для создания "классов". Теперь не требуется использовать прототип напрямую.

Мы передали родительскому "классу" через метод `super` объект с маршрутами `routes` внутри конструктора, а так же для привязки конструктора `Backbone.Router` к нашему классу. К сожалению в ES6 нет возможности использовать свойства объектов, поэтому приходится работать через функции, но на подходе уже ES7, в котором этот момент был исправлен.

В стандарте **ES5**, вместо `super()` нам бы пришлось написать следущее:

{% highlight javascript %}
// Ууууух
Backbone.Router.prototype.constructor.apply(this, arguments)
{% endhighlight %}

Помимо опредения класса, мы так же экспортируем его как модуль. В данном случае мы экспортируем весь класс, установив его для экпорта по умолчанию (export default). Далешь мы увидим разницу между экспортом по умолчанию и просто экспортом, но сейчас важно не это, а то, что с помощью **export** мы может экпортировать переменную, объек, функцию или класс.


Importing modules

Back in our app/scripts/main.js file, we can now import the functionality we just exported above.

import Router from './router';
When we import modules in ES6 we import the exports by name. In this case, since we defined a default export, we can import the entire module and give it a custom name, or “Router”, in this case. Importing by name is demonstrated below.

We'll now expand our main file by creating a class for our application. Inside this class we'll define a constructor which will be responsible for creating an instance of our imported router and starting Backbone's history.

import Router from './router';

class Application {

    constructor () {
        new Router();
        Backbone.history.start();
    }

}

$(() => {
    new Application();
});

In addition to the Application class, we're also waiting for the DOM to be ready using jQuery (using ES6 arrow functions) and creating a new instance of our Application class when it is. If we open our HTML file in browser now, we should see that “Router#home was called!” was successfully logged out to the console. Good start!

Exporting multiple declarations

Let's add a couple of simple views to our application. We'll add app/scripts/views.js and define a couple of classes inside it:

class HomeView extends Backbone.View {

    initialize () {
        this.template = $('script[name="home"]').html();
    }

    render () {
        this.$el.html(_.template(this.template));
        return this;
    }

}

class ResourcesView extends Backbone.View {

    initialize () {
        this.template = $('script[name="resources"]').html();
    }

    render () {
        this.$el.html(_.template(this.template));
        return this;
    }

}

export { HomeView, ResourcesView };
These are exceptionally simple views, albeit written in the ES6 class syntax as the router is above. In each case, we're pulling some HTML out of the DOM and setting it as our template, and defining a render method which simply sets the View's $el contents to the result of the compiled template.

At the bottom, we're exporting, just like with the router, but this time we're exporting multiple declarations. Note how we're wrapping the declarations of our two classes in braces: we're exporting an object whose keys represent separate named exports. Before we can use these, we need to actually create our templates. We're using Underscore templates here because they're quick and handy. Add these to your index.html file, below all of the scripts.

<script type="text/template" name="home">
    <h1>Home</h1>
    <a href="#resources">Go to “Resources”</a>
</script>

<script type="text/template" name="resources">
    <h1>Resources</h1>
    <a href="#">Go to back to “Home”</a>
</script>
Importing named exports

We'll switch back to app/scripts/router.js now and import our views. When a route method is called, we'll create a new instance of the appropriate view and render it into the DOM. At the top of the file, import the views we just created:

import { HomeView, ResourcesView } from './views';
Remember how I mentioned above that when importing “default” exports we can name the imported module whatever we want? We can do that when importing named exports as well. The above could easily be rewritten like this:

import { HomeView as home, ResourcesView as resources } from './views';
I think the names of the exports work just fine as import names here, so we'll leave it as in the first example. Now, in our router methods, we just need to create and render the views.

class Router extends Backbone.Router {

    // constructor

    home () {
        console.log('Route#home was called!');
        var view = new HomeView();
        $('#app').html(view.render().$el);
    }

    resources () {
        console.log('Route#resources was called!');
        var view = new ResourcesView();
        $('#app').html(view.render().$el);
    }

} 
And that's it! You can check out the completed demo and get the source code as well.



....

Вольный перевод статьи "Backbone with ES6" http://mikefowler.me/2014/06/11/backbone-with-es6/.







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