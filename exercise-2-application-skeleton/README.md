# Angular Mastery Workshop

by [@tomastrajan](https://twitter.com/tomastrajan)

# Welcome to Exercise #2 - Application skeleton

In this exercise were going to explore how to scaffold application skeleton using Angular CLI and Angular Schematics

- Create CoreModule
- Create SharedModule
- Create base layout
- Create lazy loaded HomeModule
- Create lazy loaded CustomersModule

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
5. Replace <h1> in the `app.component.html` template with the `<div class="content"></div>` (it will use some prepared styles you can find in `app.component.scss`)
6. Import `MatToolbarModule` and `MatButtonModule` from `@angular/material` inside of `shared.module.ts` and add the mto both `imports: [ ]` and `exports: [ ]` arrays...
7. Add `<mat-toolbar [color]="primary">Customer Admin</mat-toolbar>` in the `header.component.html` (remove original content`<p>` tag) 


## How to start

- try searching for numbered `TODO` readme items and `// TODO` code comments in the `projects` folder or use TODO functionality of your editor 

## How to use exercises

- every exercise folder should be installed using `npm ci`
- every exercise can be started using `npm start` to run the app
- every exercise can start tests in watch mode using `npm run watch`
- every exercise has it's own `README.md` file with additional description of the given exercise
- every exercise project contains ordered `TODO ` in the readme and `// TODO` comments inside of the source code (eg `// TODO 2: description`) which should be followed to complete the given exercise
