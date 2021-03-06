---
layout: post

title: "Todo-приложение на Backbone"
categories: JavaScript
date: 2016-08-10 22:50:58 +0700

identifier: backbone-es6-todo

nextTitle: "Вместо введения"
nextLink: "#"

prevTitle: "How to install Elixir on Mac OS X"
prevLink: "#"

slogan: Клиентское приложения на ES6 c Webpack

description: "Перед изучением нового стандарта ES6 необходимо помнить, что многие нововведения базируются на прошлом стандарте ES5. Для полного понимания многих новых конструкций и особенностей синтаксиса ES6 необходимо знание основ JavaScript. В статье вы найдете подборку книг и несколько воспросов для проверки своей готовности изучения нового стандарта."

tags: [javascript, backbone, es6]
---

**Webpack** это *client-side* сборщик и загрузчик модулей (module builder and module loader). В данном материале мы будет писать код по стандарту ES6 с использованием webpack'а.

Код ниже также расположен на [GitHub](#) в проекте webpack-es6-demo.

## Особенности webpack

1. Поддержика различных модульных форматов: `AMD`, `CommonJS`, `ES6`;
2. Поддерживает пакетные менеджеры (bower, npm);
3. Подгружает не только код, но и CSS, шаблоны;
4. Загружает модули только по требованию;
5. Имеет встроенный сервер для разработки;
6. Дружит со средствами автоматической сборки, типа `Grunt`, `Gulp`.

## Установка webpack

Установка webpack глобально.

```
$ npm install -g webpack
```

Для поддержки **ES6** воспользуемся `Babel`.

```
$ npm install babel-core babel-loader babel-preset-es2015 node-libs-browser webpack --save-dev
```

## Использование webpack и ES6

Демо проект webpack-es6-demo имеет следующую структуру:

```
webpack-es6-demo/
  es6/
    module.js
    app.js
  index.html
  webpack.config.js
```

Командой `webpack --watch` мы сможем скомпилировать наш ES6-код в файлах `module.js` и `app.js` в файл `bundle.js`. После запуска команды откройте `index.html` в браузере (можно прямо из файловой системы). `index.html` запустит `bundle.js`, что в свою очередь значит, что мы можем увидеть, что делает `app.js`.

В реальных проектах, вы, вероятно, не будет использовать webpack напрямую, а с помощью средств автоматической сборки, таких как Gulp, Grunt и т.д.

#### Конфиг `webpack.config.js`

Конфигурационный файл webpack'а содержит следующее:
{% highlight javascript %}
var path = require('path');
module.exports = {
  entry: './es6/app.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{ 
      test: path.join(__dirname, 'es6'),
      loader: 'babel-loader',
      query: {
        presets: 'es2015'
      }
    }]
  }
};
{% endhighlight %}

Как это работает:

1. На вход подается объект с параметрами (конфиг). В свойстве `entry` указывается файл, с которого начинается выполнение JavaScript кода.
2. `output`: выходной файл (который находится в том же каталоге, что и `webpack.config.js`).
3. Для поддержки ES6 подключаем модуль `babel-loader`. Свойство `test` определяет, какие файлы нужно подгружать.

#### HTML

В html-файле подгружаем созданный webpack файл `bundle.js`.

{% highlight html %}
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <title>webpack ES6 demo</title>
</head>
<body>
  <script src="bundle.js"></script>
</body>
</html>
{% endhighlight %}

#### Код на ECMAScript 6

Следующие два файла будут написаны по стандарту ES6 и автоматически упакованы webpack в bundle.js

{% highlight javascript %}
// app.js:

import MyModule from './module.js';

let body = document.querySelector('body');
body.textContent = `Hello, ${new MyModule('ES6')}!`;


// module.js:

export default class SomeModule {
    constructor(name) {
        this.name = name;
    }
    toString() {
        return this.name;
    }
}

{% endhighlight %}

Заметьте, что пути указывается аналогично Node.js.

#### Использование пакетов npm

Можем ли мы установить пакеты через npm и использовать их в своем ES6 коде? Легко! Для примера возьмем пакет `lodash`; установим его.

```
$ mkdir node_modules
$ npm install lodash
```

Теперь где-нибудь у себя в ES6 коде напишем:

{% highlight javascript %}
import { zip } from 'lodash';
console.log(zip(['1', '2'], ['a', 'b']));
{% endhighlight %}

## Альтернативы webpack

Если webpack вас не устраиваем, существует несколько альтернатив длоя написание клиентского ES6-кода. Например, `jspm` или `Browserify`.

...
Вольный перевод статьи "[Writing client-side ES6 with webpack](http://www.2ality.com/2015/04/webpack-es6.html)".