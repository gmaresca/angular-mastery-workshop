# Angular Mastery Workshop

by [@tomastrajan](https://twitter.com/tomastrajan)

# Welcome to Exercise #1 - Angular CLI

In this exercise were going to explore Angular CLI

- Learn how to execute Angular CLI commands and how to get and use`--help` for given command
- Create new Angular workspace
- Learn how to use Angular schematics
- Create application in the workspace
- Run the application (and options)
- Build the application (and options)
- Test the application (and options)
- Analyze the application
- Explore workspace configuration
- Add Prettier support
- Remove default placeholder content
- Add Angular Material component framework

## TODO 1 - Learn how to use Angular CLI

1. Run `ng` command to see all the available Angular CLI commands
2. Try running `ng <some-command> --hep`

## TODO 2 - Create new Angular workspace

1. Workspaces are created using `ng new` command but before we execute it explore available options
2. Run `ng new exercise-1-angular-cli` command with options that disables creation of initial application, sets style to `scss` , enables `routing` and sets `prefix` to `my-org`
3. Once done explore what was generated inside your IDE and enter the workspace folder in your console (eg `cd exercise-1-angular-cli`)

## TODO 3 - Learn how to use Angular schematics

1. Once in an Angular workspace we can start using Angular schematics to scaffold code instead of writing it manually
2. Schematics are executed using`ng generate` (or `ng g`), running this command will give us list of all available schematics
3. Similarly to Angular CLI we can explore schematics option using `ng g <scheamtic-name> --help`

## TODO 4 - Create application in the workspace

1. Application in a workspace can be generated using Angular schematics
2. Explore options of `application` schematics using `--help` flag
3. Create an application with name `customer-admin-app` and following options: enabled `routing`, `scss` style and `my-org` prefix
4. Once done explore what was generated inside your IDE

## TODO 5 - Run the application

1. Once we created our application we can run it in two ways, first being `ng serve` (and second being `npm start`, check that script in the `package.json` file)
2. Open browser at `http://localhost:4200` to see the application running
3. Adjust the `start` script in the `package.json` file by adding `--open` flag, stop running app and restart it using `npm start`
4. Once running open your browsers DEV tools and explore the network tab about what kind of files represent the application and check their size
5. Add new `start:prod` script to your `package.json` file and add both `--open` and `--prod` flags, stop running app and restart it using `npm start:prod`
6. Once running open your browsers DEV tools and explore the network tab about what kind of files represent the application and check their size
7. What other difference besides the size of the files was between the DEV and the PROD mode and what is its purpose?

## TODO 5 - Build the application

1. Serving application is great for the development purposes but we have to build artifacts to deploy to production
2. Build application using `ng build` (or `npm run build`, notice the `run` keyword, every script besides `start` and `test` ha to use `run`)
3. Once done explore the `dist` folder
4. Add new `build:prod` script to your `package.json` file and add `--prod` flags, and build your application again using `npm build:prod`
5. Once done explore the `dist` folder
6. What other difference besides the size of the files was between the DEV and the PROD mode and what is its purpose?
7. Explore options of `ng build` script using `--help` flag
8. Open `brwoserlist` file (`projects/customer-admin-app/`) and change `> 0.5%` to `> 5%`, remove `last 2 versions` and `Firefox ESR`
9. Build your application again using `npm build:prod`
10. What files have been generated compared to previously and why?
11. Explore [browserlist](https://browserl.ist/?q=%3E+0.5%25%2C+last+2+versions%2C+Firefox+ESR%2C+not+dead%2C+not+IE+9-11) for your query

## TODO 6 - Test the application

1. Run `ng test` (or `npm test`)
2. Explore the new opened browser window
3. Stop the test script and open `karma.conf.js` file (`projects/customer-admin-app/`)
4. Change `browsers: ['Chrome'],` to `browsers: ['ChromeHeadless'],` and set `singleRun` to `true`
5. That way we get single test run scenario which is great for continous integration
6. Add `watch` script to your `package.json` file which will execute `ng test` with`--watch` flag and run it
7. Install `karma-spec-reporter` package using `npm i -D` (install dev dependency) and add it to the plugins in `karma.conf.js` file
8. Adjust your `watch` script in `package.json` by adding `--reporters spec` flag and run it
9. Check out the new test output
10. Try breaking a test by changing `toEqual('customer-admin-app');` in the `app.component.spec.ts` file (`/projects/customer-admin-app/src/app/`) to `customer-admin-app 1`
11. Check out the new test output and try changing tests couple of times
12. Run end to end tests using `ng e2e`
13. Run tslint using `ng lint`

### Continuous Integration testing
It usually makes sense to create dedicated `ci` npm script in package json which will execute all the tests in order for every
push to give branch, such a command can look like `"ci": "ng lint && ng test && ng e2e"`...

## TODO 7 - Analyze application

Analyzing application can come in handy when debugging produced bundle size...

1. Install `webpack-bundle-analyzer` as a dev dependency (`npm i -D`)
2. Add `analyze` script to your `package.json` file which will run `ng build` with `--prod` and `--stats-json` flags
3. Extend the command with `&& webpack-bundle-analyze ./dist/customer-admin-app/stats-es2015.json`
4. Run the analyze command and explore the website in opened tab (try checking "Show content of concatenated modules" checkbox)

### Troubleshooting

On windows machines without GitBash, WSL or cygwin it might NOT be possible to use `&&` to chain commands in the npm scripts
In that case we have to install `npm i -D npm-run-all` package and change our `analyze` script to look like this...

```json
{
  "scripts": {
    "analyze": "npm-run-all analyze:*",
    "analyze:stats": "ng build --prod --stats-json",
    "analyze:open": "webpack-bundle-analyzer ./dist/customer-admin-app/stats-es2015.json"
  }
}
```

## TODO 8 - Explore workspace configuration

Our workspace setup is prety much done, let's see how it looks like and what can be configured...

1. Open `angular.json` file in the workspace root, it represents the main descriptor and configuration of the whole workspace
2. Depending on your IDE, try to collapse `projects` property
3. Our workspace currently has only one project (`customer-admin-app`) and for that reason it was set as the `defaultProject`, single workspace can host multiple apps and libraries and the `defaultProject` tells CLI to run given command agains that project by default, we can still build other project by specifying it using `--project` flag so for example we could use `ng build --prod --project some-other-app`
4. Inside of `customer-admin-app` you cna find `architect` property with `build` property and finally `configuration` property, here you can see what options are applied by default when using `--prod` flag (it is possible to define your own custom configurations which then can be activated using `--configuration <my-config>` flag when running commands)
5. Explore the `schematics` property of the `customer-admin-app`, here you can set schematics defaults so let's say if you always wanted to use components with inline templates instead of standalone HTML file you could specify it here instead of always writing `ng generate component some-component --inline-template`
6. Try to use code completing (of your IDE) inside of schematics configuration and you should get hints about all the available options

## TODO 9 - Add Prettier support

Prettier is amazing frontend tooling package which enables autoformatting of your source code leting you focus on developing features instead!

1. Install `prettier` as a dev dependency `npm i -D`
2. Create `.prettierrc` file in the workspace root and add the following content

```json
{
  "singleQuote": true,
  "printWidth": 100
}
```

3. Try to go to any source file in the `customer-admin-app`, (eg `app.component.ts`) and break formatting, then depending on IDE try to run prettier

   - Intellij IDEA - press `CTRL ALT SHIFT P` (check your plugins if it doesnt work...)
   - VS Code - install prettier extension and then it should be available with `SHIFT ALT F`

4. Add `format:write` script to your `package.json` file with `prettier \"projects/**/*.{ts,scss,json,html,js}\" --write` content
5. Add `format:test` script to your `package.json` file with `prettier \"projects/**/*.{ts,scss,json,html,js}\" --list-different` content
6. Try running the `format:test` followed by the `format:write` and again followed by `format:test`, all the errors should be gone!
7. It is also a good idea to disable potentially conflicting `tslint` rule and let prettier handle the formating, to do that we should set both `"max-line-length"` and `"quotemark""` rules in `tslint.json` (in the workspace root) to false

## TODO 10 - Remove default placeholder content
As we might have noticed, running freshly generated application comes with some default content which
gives us some pointers abou the next steps. That being said we need to get rid of it to start developing our own features.

1. Open the `app.component.html` file a delete all its content.
2. Add `<h1>{{title}} app is running!</h1>` instead
3. Open the `app.component.spec.ts` file and change `compiled.querySelector('.content span')` to `compiled.querySelector('h1')`
4. Try to run tests using `npm test`


## TODO 11 - Add Angular Material component framework

Angular Material is a "official" component framework developed by the Angular team and open source colaborators, as such 
it represents a great starting point for developing beautiful Angular applications ( other options being nothing, other 3rd party component frameworks or your own custom framework, but that takes LOTS of time, skill and dedication...)

Setting up Angular material is not trivial and includes couple of steps and choices to be made on the way...

Luckily, Angular CLI and Angular Schematics support automating of such proceses using `ng add` command!

1. Run `ng add --help` to see available options, the `collection` stands for the package to be added and in our case that will be `@angular/materail`
2. Run `ng add @angular/material`, the package will be installed and the Angular Schematics will prompt us for some required options that we didn't provide with the commnad
3. Choose `Custom` theme
4. Confirm setup of HammerJS
5. Add browser animations
6. Once done, the command line will inform us about what changes have been made by running the `ng add` schematics, let's explore these files...
    * `main.ts` - the `hammerjs` import was added
    * `app.module.ts` - the `BrowserANimationModule` was added
    * `index.html` - links to fonts used by Angular Material were added, try to add `mat-typography` class on the `<body>` tag
    * `styles.scss` - large custom theme setup was added automatically including hints how to adjust it further!
    
7. All this setup executed seamlessly with the power of Angular Schematics, pretty epic! Remember, many popular 3rd party libraries come with the `ng add` support simplifying the setup and usage dramatically!
8. Run application using `npm start` to see how `mat-typography` affected the fonts


# Great! We have set up nice Angular workspace and are ready for the development!
