# Angular Mastery Workshop

by [@tomastrajan](https://twitter.com/tomastrajan)

# Welcome to Exercise #1 - Angular CLI

In this exercise were going to explore Angular CLI

* Learn how to execute Angular CLI commands and how to get and use`--help` for given command
* Create new Angular workspace 
* Learn how to use Angular schematics
* Create application in the workspace
* Run the application (and options)
* Build the application (and options)
* Test the application (and options)
* Analyze the application 
* Explore workspace configuration
* Generate basic application skeleton using schematics
* Add Angular Material component framework
* Add prettier support


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
1. Once we created our application we can run it in two ways, first being `ng serve` (and second being `npm start`, check that command in the `package.json` file)
2. Open browser at `http://localhost:4200` to see the application running
3. Adjust the `start` command in the `package.json` file by adding `--open` flag, stop running app and restart it using `npm start`
4. Once running open your browsers DEV tools and explore the network tab about what kind of files represent the application and check their size
5. Add new `start:prod` command to your `package.json` file and add both `--open` and `--prod` flags, stop running app and restart it using `npm start:prod`
4. Once running open your browsers DEV tools and explore the network tab about what kind of files represent the application and check their size
6. What other difference besides the size of the files was between the DEV and the PROD mode and what is its purpose?

## TODO 5 - Build the application

