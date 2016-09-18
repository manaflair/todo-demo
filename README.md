# Manaflair Toolbox Demonstration Project

[![](https://img.shields.io/david/manaflair/todo-demo.svg)]()

Each commit in this repository incrementally shows you how to build a functional todo-list by making use of the [Manaflair Toolbox](https://manaflair.github.io) modules. Some chapters have more than a single commit, feel free to subdivise them as you wish.

## Running locally

The application actually works! Just clone it and run `npm install`, then `npm start`. A webserver will be exposed using port [42000](http://localhost:42000).

## Chapters

- [**Chapter 1 : The beginning**](https://github.com/manaflair/todo-demo/tree/chapter-1)

  We start with a clean-state application. It doesn't do anything else than serving a static site, but we don't really need anything more. That'll come later.

- [**Chapter 2 : Where we start modeling**](https://github.com/manaflair/todo-demo/tree/chapter-2) ([diff](https://github.com/manaflair/todo-demo/compare/chapter-1...chapter-2))

  Nothing too fancy here, we just create a few Sequelize models, and instruct Sequelize to use an in-memory database so that we don't have to deal with remote SQL servers. SQLite is awesome! Finally, we also setup a few fixtures.

- [**Chapter 3 : Where we start listening**](https://github.com/manaflair/todo-demo/tree/chapter-3) ([diff](https://github.com/manaflair/todo-demo/compare/chapter-2...chapter-3))

  The next step will require us to start exposing something to the world, via some kind of API. Conveniently, the Manaflair toolbox ships with [Json-Server](https://github.com/manaflair/json-server), a JSON-API-compatible server with out-of-the-box Sequelize support.

- [**Chapter 4 : Where we start talking**](https://github.com/manaflair/todo-demo/tree/chapter-4) ([diff](https://github.com/manaflair/todo-demo/compare/chapter-3...chapter-4))

  Now that we have someone to talk with, the only thing remaining is to speak to it. Serializing JSON-API data can be tricky, but we'll be using [Json-Talk](https://github.com/manaflair/json-talk), a toolbox that brings a lot of useful tools that you can use to fetch data from JSON-API-compatible APIs.

- [**Chapter 4b: Where we start working**](https://github.com/manaflair/todo-demo/tree/chapter-4b) ([diff](https://github.com/manaflair/todo-demo/compare/chapter-4...chapter-4b))

  Our application starts to look fine and dandy, but we're only fetching data, not creating new ones. Since we kinda need this feature for our todo-list, we will fix this by using the default Redux and Redux-Saga integrations shipped with Json-Talk. Less code, more time to watch Netflix. Count me in.

- [**Chapter 5 : Where we start waiting**](https://github.com/manaflair/todo-demo/tree/chapter-5) ([diff](https://github.com/manaflair/todo-demo/compare/chapter-4b...chapter-5))

  We're a bit hyperactive right now - we ask the server for data, but we proceed with rendering our pages before it even has a chance to answer. Maybe we could just wait a few milliseconds before transitioning? Come on, let's do this. Fortunately, [Async-Props](https://github.com/manaflair/async-props) got our back.

- [**Chapter 6 : The ending**](https://github.com/manaflair/todo-demo/tree/chapter-6) ([diff](https://github.com/manaflair/todo-demo/compare/chapter-5...chapter-6))

  For our final chapter, we'll do everything that isn't very important, but serves to smoothen the edges of our todo-list. Nothing too exciting, but you can give a look if you're curious.

Thanks for reading, I hope you've enjoyed this short tutorial of sort. If things are still unclear, check this repository's [issues](https://github.com/manaflair/todo-demo/issues) to see if we've been able to help someone else on this subject and, if not, feel free to open a new one. We will make sure to get back to you as soon as we can.

## License (MIT)

> **Copyright © 2016 Manaflair**
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
