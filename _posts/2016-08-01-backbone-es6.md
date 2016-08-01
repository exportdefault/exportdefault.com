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

После утверждения стандарта ES6 прошло уже много времени, многие известные фреймворки, типа AngularJS2, React Native, Backbone уже поддерживают возможности нового стандарта Если вы прочитали статью или две (сотни) о новых возможностях, но до сих пор не начали их использовать, то давайте начнем прямо сейчас.

### Babel + Browserify

Если у вас настроен gulp/webpack на сборку JS кода, то можете переходить сразу к следующему разделу.

На сегодняшний день не один браузер нативно не поддерживает модули ES6, но современный javascript-код можно писать для браузеров с помощью инструметов Babel и Browserify.

Babel - это транспайлер, трансформирующий код на предыдущий стандарт, а Browserify позволяет использовать модульную структуру в браузере. 

Первым делом нужно, чтобы у вас была установлена платформа `nodejs`, в состав которой входит `npm` - менеджер пакетов, с помощью которого мы и установим необходимое. Создадим и перейдем в директорию, в которой будем работать. В ней запустим команду `npm init`, для создания файла `package.json` (на все вопросы можно просто нажимать Enter).

{% highlight bash %}
mkdir backbone-es6 && cd backbone-es6
npm init
{% endhighlight %}

Далее установим babel и browserify локально в проект и глобально, для запуска из консоли:

{% highlight bash %}
npm install -g babel browserify
npm install babel-core babel-preset-es2015 browserify --save-dev
{% endhighlight %}

Префикс `--save-dev` мы используем для сохранения пакетов в нашем `package.json`, далее откроем этот файл, проверим, что зависимости добавились и заменим строчки, относящиеся к `scripts` на следующее:

{% highlight json %}
"scripts": {
  "compile": "babel src --presets es2015 --out-dir=dist && browserify dist/app.js > dist/bundle.js"
},
{% endhighlight %}

Теперь при запуске команды `npm run compile` сначала все файлы из папки `src` будут "бабелифицированы" под стандарт ES5 и помещены в каталог `dist`, а потом с помощью `browserify` собираем код в один файл - `bundle.js`.

Давайте попробуем что-нибудь написать на ES6:

{% highlight javascript %}
// src/app.js
class ES6Today {
  use() {
    console.log("Hello from a JS class!");
  }
}

var es6 = new ES6Today();
es6.use(); // output: Hello from a JS class!
{% endhighlight %}

Запускаем подготовленную нами команду, вставляем файл `bundle.js` в html-страничку и смотрим в консоль. Видим то, что и ожидали увидеть. Стоит отметить, что в JS классы это просто обертка для функций-конструкторов, синтаксический сахар, а не типичные си-подобные классы.


### Backbone/Undersore/jQuery

Теперь давайте перейдем к backbone-приложению. Для начала с помощью bower установим все необходимые компоненты и создадим основной `index.html` файл.

{% highlight bash %}
bower install jquery underscore backbone
{% endhighlight %}

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
    <script src="dist/bundle.js"></script>
</body>
</html>
{% endhighlight %}

Так же создадим файл `app.js` в директории `src`, который будет точкой входа нашего ма.

### Классы и экспортирование

Что бы разобраться, как работают "классы" и их экспортирование через модули, сделаем следующее:

1. Определим "класс" для нашего роута `Route`, который будет наследоваться от `Backbone.Router`.
2. Импортируем роут в наш главный файл `main` и создатим объект класса `Route`.
3. Запустим "историю Backbone" и убедимся, что был выбран роут по умолчанию.
4. Дополнительно, создадим несколько представлений для отображения шаблона при вызове роута.

Давайте создам файл, `src/router.js`:

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
Backbone.Router.prototype.constructor.apply(this, arguments);
// Ууууух
{% endhighlight %}

Помимо опредения класса, мы так же экспортируем его как модуль. В данном случае мы экспортируем весь класс, установив его для экпорта по умолчанию (export default). Далешь мы увидим разницу между экспортом по умолчанию и просто экспортом, но сейчас важно не это, а то, что с помощью **export** мы может экпортировать переменную, объек, функцию или класс.

### Импортирование модулей

Вернется к нашему главному файлу `src/app.js`, и прямо сейчас импортируем только что написанный нами функционал.

{% highlight javascript %}
import MyRouter from './router';
{% endhighlight %}

Когда мы импортируем модуль в ES6, мы должны указывать имя модуля, который был экспортирован. Но в нашем случае, мы использовали конструктую `default export`, поэтому мы может импортировать модуль указав любое имя, например `MyRouter`. Импорт по имени рассмотрим далее.

Теперь расширим наш основной файл, создав внутри него класс приложения. Внутри класса мы определим конструктор, который будет при создании экземпляра приложения создавать экземпляр MyRouter и запускать `Backbone.history.start();`.

{% highlight javascript %}
import MyRouter from './router';

class Application {

    constructor () {
        new MyRouter();
        Backbone.history.start();
    }

}

$(() => {
    new Application();
});
{% endhighlight %}

Дополнительно, мы создали обертку jQuery, использую стрелочную функцию, которая создаст экземпляр приложения, когда будет готов DOM.

Если мы откроем наш HTML-файл в браузере, то должны увидеть в консоле: `Router#home was called!`. Хорошее начало!

#### Экспорт нескольких моделей

Давайте расширим наше прилоедние и добавим пару простый представленй. Создадим файл `src/views.js` и определим несколько классов внутри:

Let's add a couple of simple views to our application. We'll add app/scripts/views.js and define a couple of classes inside it:

{% highlight javascript %}
class HomeView extends Backbone.View {

    initialize () {
        this.template = $('script[name="home"]').html();
    }

    render () {
        this.$el.html(_.template(this.template));
        return this;
    }
}

class AboutView extends Backbone.View {

    initialize () {
        this.template = $('script[name="about"]').html();
    }

    render () {
        this.$el.html(_.template(this.template));
        return this;
    }
}

export { HomeView, ResourcesView };
{% endhighlight %}

Это очень простые вьюхи, хоть и написаны с использованием синтаксиса ES6, как и класс роута выше. В каждом случае мы помещаем некоторый html из DOM и устанавливаем его в качестве шаблона `template`, и определяем метод `render()`, который просто помещаем в `this.$el` результат скомпилированного шаблона.

В самом низу мы экспортируем классы, так же, так и класс `Route`, но в этот раз мы экпортируем несколько объявлений. Стоит отметить, что мы оборачиваем наши два класса в фигурные скобки: мы экспортируем объекты, которые перечислены в этих фигурных скобках. Предже чем мы смодем их использовать, нам нужно создать сами шаблоны. Для этого мы используем шаблоны `Underscore`, которые `Backbobe` использует по умолчанию. Добавим в `index.html`, перед скриптами.

{% highlight html %}
<script type="text/template" name="home">
    <h1>Home</h1>
    <a href="#resources">Go to "About"</a>
</script>

<script type="text/template" name="resources">
    <h1>About</h1>
    <a href="#">Go to back to "Home"</a>
</script>
{% endhighlight %}

#### Импорт по имени

Перейдем обратно в `src/router.js` и испортируем наши представления. Когда вызывается один из методов роута, мы создаем новый экземпляр соответствующего представления и выводит результат на страницу. Вверху файла подключаем представления:

{% highlight javascript %}
import { HomeView, AboutView } from './views';
{% endhighlight %}

Помните, я говорил, когда мы импортим по умолчанию, мы можем называть импортируемые модули как мы и хотим? Мы можем это делать и при импорте по имени. Код выше можно легко переписать следующим образом:

{% highlight javascript %}
import { HomeView as home, AboutView as about } from './views';
{% endhighlight %}

Я считаю, что имена при экспорте отлично подходят для нашего примера, поэтому оставим первый вариант. Теперь, обновим наши метода роута, добавив создание представлений и вызов их метода `render()`.

{% highlight javascript %}
class MyRouter extends Backbone.Router {

    // constructor
    home () {
        console.log('Route#home was called!');
        var view = new HomeView();
        $('#app').html(view.render().$el);
    }

    about () {
        console.log('Route#about was called!');
        var view = new AboutView();
        $('#app').html(view.render().$el);
    }

}
{% endhighlight %}

Вот и все! Вы можете посмотреть [полную демку](#), а так же [исходники на гитхабе](#).

...
Вольный перевод статьи "[Backbone with ES6](http://mikefowler.me/2014/06/11/backbone-with-es6/)".