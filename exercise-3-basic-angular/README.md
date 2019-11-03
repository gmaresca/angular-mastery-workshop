# Angular Mastery Workshop

by [@tomastrajan](https://twitter.com/tomastrajan)

# Welcome to Exercise #3 - Basic Angular

In this exercise were going to explore creation of components & services

- Create component
- Render data
- Use various built in directives
- Implement inter component communication 
- Create and use service

## TODO 0: Start application
Make sure your application is running by executing `npm start`

## TODO 1: Create CustomerItemComponent
1. Use `ng g c features/customers/customer-item` to generate new component, it will automatically be added to the `declarations: [ ]` of `CustomersModule`...
2. In the `customers.component.html` render `<my-org-customer-item></my-org-customer-item>` for every value in `customers` array (hint use `*ngFor` directive)
3. In the `customer-item.component.ts` define `@Input()` which accepts the customer object from the parent into `customer` property and also uses `Customer` interface
4. In the `customers.component.html` pass the `customer` object (from `*ngFor` iteration) down to the `<my-org-customer-item></my-org-customer-item>` using `[customer]` property binding
5. In the `customer-item.component.ts` try to log out value `@Input() customer` property in the constructor and in the `ngOnInit()` lifecycle hook (don't forget) to implement the interface and! And check out console in your browser Dev Tools... (hint `console.log('constructor', this.customer);`) 
6. In the `customer-item.component.html` add `<mat-card></mat-card>` as a top level element and render customer name and surname into `<p>` tag inside the card with the help of interpolation `{{ }}` 
7. In the `customer-item.component.scss` add css rule for `mat-card` setting its `display` to `flex` and another rule for `p` setting its `margin` to `0`
8. In the `customer-item.component.html` add `<mat-icon>person</mat-card>` before the `<p>` tag
9. In the `customer-item.component.html` add `[ngClass]` directive on the `<mat-card>` element which should set `vip` class based on the value of `customer.isVip` property
10. In the `customer-item.component.scss` add nested css rule inside of `mat-card` using which will define rule for `.vip` class (nested rules that belong to element are prefixed with `&`, so `&.vip`) and add rule that sets `background-color` to `#fff4ba`
11. In the `customer-item.component.html` add `<mat-icon>star</mat-icon>` but display it conditionally only for the VIP customers (hint:  use `*ngIf` directive)
12. Also, we do not want to display two icons at the same time so hide the original `person` icon in case the customer is VIP
13. In the `customer-item.component.html` add `<button>` with `mat-raised-button` directive and `Say hello` text content, after that add `(click)` event binding which will call `sayHello()` method and pass in the `customer` object as an argument
14. In the `customer-item.component.ts` implement public `sayHello()` method which accepts `customer` of type `Customer` as an argument and logs out customer full name when called (hint: try use javascript template string, to concatenate name and the surname)



## How to start

- try searching for numbered `TODO` readme items and `// TODO` code comments in the `projects` folder or use TODO functionality of your editor 

## How to use exercises

- every exercise folder should be installed using `npm ci`
- every exercise can be started using `npm start` to run the app
- every exercise can start tests in watch mode using `npm run watch`
- every exercise has it's own `README.md` file with additional description of the given exercise
- every exercise project contains ordered `TODO ` in the readme and `// TODO` comments inside of the source code (eg `// TODO 2: description`) which should be followed to complete the given exercise
- you can always search for `// TODO`, or `<!-- TODO` or check `README.md` for the next TODO item
