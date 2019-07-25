Gerador de infográfico (HTML)
===================================================
O gerador de infográfico utilizou a biblioteca: TinyMCE - JavaScript Library for Rich Text Editing (https://github.com/tinymce/tinymce.git)

## Configuração
> Para rodar no PC com Windows:
> [Python](https://www.python.org/getit/), [Ruby](https://rubyinstaller.org/downloads/), o Ruby precisa ser com With DEVKIT, escolha a versão do seu Windows 32bits ou 64 bits

> É necessário ter o [Node.js](https://nodejs.org/en/), [Typescript](https://www.typescriptlang.org/#download-links) e [Grunt] (https://gruntjs.com/) previamente instalado globalmente no seu computador.

> Os arquivos estão no vm13->Programas->Desenvolvimento Cursos (\\vm13\Programas\Desenvolvimento Cursos)
> A versão do nodejs precisa ser 9.4.0
> A versão do Python precisa ser 2.7.14

## Instalação do gerador

* Clone pelo comando 'git clone git@git.nescon.medicina.ufmg.br:cursos-nescon/infografico.git' ou faça o download do repositório.
* Acesse o diretório do repositório por um terminal: `cd caminho para o diretório do repositório`.
* Em seguida, como administrador execute o comando `npm install` para instalar as dependências do curso.
* Depois de instalar as dependências, execute os comandos `grunt` e `grunt start` para começar o desenvolvimento.
* Nos PC usando windows execute os comandos `grunt --force` e `grunt start --force`


Build tasks
------------
`grunt`
Lints, compiles, minifies and creates release packages for TinyMCE. This will produce the production ready packages.

`grunt start`
Starts a webpack-dev-server that compiles the core, themes, plugins and all demos. Go to `localhost:3000` for a list of links to all the demo pages.

`grunt dev`
Runs tsc, webpack and less. This will only produce the bare essentials for a development build and is a lot faster.

`grunt test`
Runs all tests on PhantomJS.

`grunt bedrock-manual`
Runs all tests manually in a browser.

`grunt bedrock-auto:<browser>`
Runs all tests through selenium browsers supported are chrome, firefox, ie, MicrosoftEdge, chrome-headless and phantomjs.

`grunt webpack:core`
Builds the demo js files for the core part of tinymce this is required to get the core demos working.

`grunt webpack:plugins`
Builds the demo js files for the plugins part of tinymce this is required to get the plugins demos working.

`grunt webpack:themes`
Builds the demo js files for the themes part of tinymce this is required to get the themes demos working.

`grunt webpack:<name>-plugin`
Builds the demo js files for the specific plugin.

`grunt webpack:<name>-theme`
Builds the demo js files for the specific theme.

`grunt --help`
Displays the various build tasks.

Bundle themes and plugins into a single file
---------------------------------------------
`grunt bundle --themes=modern --plugins=table,paste`

Minifies the core, adds the modern theme and adds the table and paste plugin into tinymce.min.js.

