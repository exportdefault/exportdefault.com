---
layout: post

title: "Шаблон Singleton для классов в ES6"
categories: JavaScript
date: 2016-08-16 22:50:58 +0700

identifier: singleton-in-es6

nextTitle: "Вместо введения"
nextLink: "#"

prevTitle: "How to install Elixir on Mac OS X"
prevLink: "#"

slogan: ""

description: "Одиночка (англ. Singleton) - шаблон проектирования, гарантирующий, что в однопоточном приложении будет единственный экземпляр класса с глобальной точкой доступа."

tags: [javascript, singleton, es6, pattern]
---

Одиночка (англ. *Singleton*) - шаблон проектирования, гарантирующий, что в однопоточном приложении будет единственный экземпляр класса с глобальной точкой доступа. Многие называют этот шаблон антипаттерном, но в некоторых случаях он может оказаться очень полезным.

В **ES6** его можно просто реализовать с помощью "классов". К сожалению в данном стандарте не поддерживаются свойства внутри класса, поэтому данный вариант работать не будет (кстати он будет функционировать в ES7):

{% highlight javascript %}
// Uncaught SyntaxError: Unexpected identifier
class Singleton {
  let instance = null;
}
{% endhighlight %}

Для того, чтобы избежать повторной инициализации экземпляра этого же класса, нужно хранить состояние (инициализирован или нет) в переменной, которая не будет зависить от этого класса, т.е. будет объявлена за пределами класса.

## Шаблон Singleton-class в es6

Пример, показанный ниже будет иметь только один экземпляр класса, независимо от того, сколько раз мы будет инициализировать его.

{% highlight javascript %}
// внешняя переменная, хранящая инстанс класса (по умолчанию: null)
let instance = null;

class Singleton {  
  constructor() {
    if(!instance){
      instance = this;
    }

    // для тестирования, что у нас только один экземпляр
    this.time = new Date()

    return instance;
  }
}
{% endhighlight %}


## Тестирование Singleton

В классе выше мы определили свостйво `time`, чтобы убедиться, что шаблон работает должным образом.

{% highlight javascript %}
 let testClass = new Singleton()
 console.log(testClass.time);

 setTimeout(() => {
   let testClass2 = new Singleton();
   console.log(testClass2.time);
 }, 5000);
{% endhighlight %}

Если в консоль выведится одно и тоже время (а так оно и будет), значит мы имеем рабочий вариант реализации шаблона одиночки в ES6. Этот вариант отлично работает и при использовании модульного подхода, т.к. ссылка на `instance` будет находится в замыкании.

You can always assign variables to window.MyClass = whatever (global.MyClass for nodejs) no matter where you are, and access these values from any other file in your application. That's not always the best way to go about sharing data globally in your application though. The module loader in nodejs (or AMD in ES6) takes whatever you export and caches it. Lets say you have a file such as:

MyModule.js:

class MyClass {
  constructor() {
    this.someData = 55;
  }
}

export default (new myClass);
now whenever we require this file from elsewhere, we're ALWAYS being given the SAME instance of myClass. This means:

file1.js:

import MyClass from './MyModule'
MyClass.someData = 100;
file2.js:

import MyClass from './MyModule'
console.log(MyClass.someData);
This is called the singleton pattern, where we pass around one common instance of your class all throughout your application. So in this manner we're able to access the same instance of MyClass from different files all without polluting the global scope (we avoid making assignments to global.MyClass but accomplish the same functionality).