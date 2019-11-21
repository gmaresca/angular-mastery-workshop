# Angular Mastery Workshop

by [@tomastrajan](https://twitter.com/tomastrajan)

# Welcome to exercise - Application skeleton

In this exercise were going to explore how to scaffold application skeleton using Angular CLI and Angular Schematics

- Create CoreModule
- Create SharedModule
- Create base layout
- Prepare routing
- Create lazy loaded HomeModule and CustomersModule

## TODO 0: Start application
Make sure your application is installed `npm ci` and is running by executing `npm start`

## TODO 1: Create CoreModule
We're going to use Angular Schematics to help us scaffold base application structure

1. Run `ng generate module core` (or `ng g m core`) which will generate `CoreModule` file in the `src/core` folder
2. Add `CoreModule` to the `imports: [ ]` array of the `AppModule` (the IDE should auto-import the module form correct location...)

## TODO 2: Create SharedModule
1. Run `ng generate module shared` (or `ng g m shared`) which will generate `SharedModule` file in the `src/shared` folder
2. Inside of our freshly generated module, please add `exports: [ ]` array to the `@NgModule` decorator and fill it with `CommonModule`. That way we can only import `SharedModule` and not both `SharedModule` and `CommonModule` in most other modules...
3. Open `CoreModule`, remove `CommonModule` from its `imports: [ ]` array and add `SharedModule` instead (the IDE should auto-import the module form correct location...)
4. Add `SharedModule` to the `imports: [ ]` array of the `AppModule` (the IDE should auto-import the module form correct location...)

## TODO 3: Create base layout
Now lets create some basic layout with header (and navigation), footer and center content area where we will display active route

1. Use `ng g c core/layout/header` to generate new header component, it will automatically be added to the `declarations: [ ]` of `CoreModule` and add it to the `exports: [ ]` too! 
2. Add `<my-org-header></my-org-header>` as the first component in the `app.component.html` template
3. Use Use `ng g c core/layout/footer` to generate new footer component, it will automatically be added to the `declarations: [ ]` of `CoreModule` and add it to the `exports: [ ]` too!
4. Add `<my-org-footer></my-org-footer>` as the last component in the `app.component.html` template 
5. Replace `<h1>` in the `app.component.html` template with the `<div class="content"></div>` (it will use some prepared styles you can find in `app.component.scss`)
6. Import `MatToolbarModule` and `MatButtonModule` from `@angular/material` inside of `shared.module.ts` and add them to both `imports: [ ]` and `exports: [ ]` arrays...
7. Add `<mat-toolbar color="primary">Customer Admin</mat-toolbar>` in the `header.component.html` (remove original content`<p>` tag) 

## Todo 4: Prepare routing

1. Inside of `SharedModule` import the`RouterModule` and add it to both `imports: [ ]` and `exports: [ ]` arrays, this will enable us to use routing related components and directives...
2. In the `app.component.html` add `<router-outlet></router-outlet>` as a child of the `<div class="content"></div>`, this will be the location where we want to display our routes...
3. In the `header.component.html` add `<button mat-raised-button routerLink="home">Home</button>` as a child of `<mat-toolbar>`
4. In the `header.component.html` add `<button mat-raised-button routerLink="customers">Customers</button>` as a second child of `<mat-toolbar>`
5. (Optional) Add `button { margin: 0 0 0 20px; }` to the `header.component.scss` (our css rule does NOT have to be specific because Angular scopes styles per component)

## Todo 5: Create lazy loaded HomeModule and CustomersModule
1. Run `ng g m features/home --route home --module app.module.ts` which is a schematics that we used previously to generated `Core` and `Shared` modules but now we use it with additional options `--route` and `--module` which will cause it to be generated as a lazy loaded module belonging to the root `AppModule` (its routing)
2. Run `ng g m features/customers --route customers --module app.module.ts` will generate lazy loaded `CustomersModule`...
3. Navigate to routes using menu in the toolbar (if this does NOT work try restarting your application using `npm start`, CLI sometimes doesn't catch all the generated files while running...)
4. As you might have noticed, we're not displaying any route when navigating to plain root url `http://localhost:4200/`, lets fix that by adding redirect as a first route in `app-routing.module.ts` in the `routes: [ ]` array

```javascript
{
  path: '',
  pathMatch: 'full',
  redirectTo: 'home'
}

```

Try to use `http://localhost:4200/` url in your browser and see what happens!


## Todo 6: Analyze
1. Run `npm run analyze` to see how the graph changed as we're now having two lazy loaded modules

# Great! We have nice application skeleton, layout and routing with lazy loading, that's a great starting point to start developing features!

## How to start

- try searching for numbered `TODO` readme items and `// TODO` code comments in the `projects` folder or use TODO functionality of your editor 

## How to use exercises

- every exercise folder should be installed using `npm ci`
- every exercise can be started using `npm start` to run the app
- every exercise can start tests in watch mode using `npm run watch`
- every exercise has it's own `README.md` file with additional description of the given exercise
- every exercise project contains ordered `TODO ` in the readme and `// TODO` comments inside of the source code (eg `// TODO 2: description`) which should be followed to complete the given exercise
- you can always search for `// TODO`, or `<!-- TODO` or check `README.md` for the next TODO item
