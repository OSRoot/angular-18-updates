# Angular 18 updates
## in this repo you will find most of the effective changes that are made in Angular 18
<!-- [TOC] Visit https://github.com/angular/angular -->
# Content 
- 1- New Control flow syntax is now stable.
- 2- Defer syntax is now stable.
- 3- Change Detection with Zone js.
- 4- HttpClient Module Deprecation.
- 5- ng-content fallback.
- 6- Form Events: a way to group the event of the form.
- 7- Routing: redirect as a function
- 8- Server Side Rendering: two new awesome feature
- 9- Internationalization.
- 10- A new builder package and deprecation.
- 11- No more donwleveling async/await (Experimental).
- 12- An new alias: ng dev => `ng dev` command 
- 13- What can we expect in the future?
- 14- Material Design 3.0

#### New Control Flow Syntax
#### Defer Syntax
#### Change Detection with Zone js
#### HttpClient Module Deprecation
#### ng-content fallback
#### Form Events: a way to group the event of the form
#### Routing: redirect as a function
#### Server Side Rendering: two new awesome feature
#### Internationalization
#### A new builder package and deprecation
#### No more donwleveling async/await (Experimental)
#### An new alias: ng dev => `ng dev` command 
#### What can we expect in the future?
#### Material Design 3.0
#### Microsoft released Typescript Version 5.4


[TOC] https://github.com/OSRoot/angular-18-updates.git 

### some files are included in the repo to replace them when you decide to use them
### 1- Interceptor
#### - as the HttpClient module has been deprecated, we configured a new interceptor to work with new http client provider.
- check the files


### <!- This section regarding the new changes in Typescript Version 5.4 -->

[TOC] https://devblogs.microsoft.com/typescript/announcing-typescript-5-4/

- To get started using TypeScript through NuGet or through npm with the following command: `npm install -D typescript`
### What is new in TypeScript 5.4?
### - Preserved Narrowing in Closures Following Last Assignments :
--> This means the if used a parameter or let variable in non-hoisted functions, the type-checker will look for
the last assignment to that variable and use that type.

    ```
    function foo(x: number | string) {
        if (typeof x !== "string") {
            x = 5; // ok
        }
        else {
            x = ""; // error in older versions
        }
    }
    ```
    -------------------------------------------------------------------------------------

    ```
    function createStreetLight<C extends string>(colors: C[], defaultColor?: C) {
    // ...
    }
    createStreetLight(["red", "yellow", "green"], "blue"); // undesired behavior
    // -----------------------------------------------------------------------------
    function createColors<C extends string, D extends C>(colors: C[], defaultColor?: D){
    console.log(colors, defaultColor);
    }
    // createColors(['red', 'blue'], 'green'); // here we declared that C is string 
    // and D is string as well and the compiler is happy with that.
    // the D extends C with the specified type C.

    ```


### - The NoInfer Utility Type : 
--> Surrounding a type in NoInfer<...> gives a signal to TypeScript not to dig in and match against the inner types to find candidates for type inference.

    ```
    // Works with NoInfer better in Version 5.4 // use this in version 5.4
    function createColors3<C extends string>(colors:C[], df:NoInfer<C>){
    }

    createColors3(["red", "yellow", "green"], "blue"); // this will not work 
    ```

### - Object.groupBy
--> Object.groupBy takes an iterable, and a function that decides which "group" each element should be placed in. The function needs to make a "key" for each distinct group, and Object.groupBy uses that key to make an object where every key maps to an array with the original element in it.
    ```
    // /////////////////////////////////////////////////////////////////////////////////
    // Using Object.groupBy method -- not yet implemented in version 5.4 for public use
    const array = [0, 1, 2, 3, 4, 5];

    const myObj = Object.groupBy(array, (num, index) => {
        return num % 2 === 0 ? "even": "odd";
    });
    // equivalent to
    const myObj = {
        even: [0, 2, 4],
        odd: [1, 3, 5],
    };
    // /////////////////////////////////////////////////////////////////////////////////
    ```
### - Map.groupBy
--> Map.groupBy is similar, but produces a Map instead of a plain object. This might be more desirable if you need the guarantees of Maps, you’re dealing with APIs that expect Maps, or you need to use any kind of key for grouping – not just keys that can be used as property names in JavaScript.

    ```
    const myObj = Map.groupBy(array, (num, index) => {
    return num % 2 === 0 ? "even" : "odd";
    });
    // and just as before, you could have created myObj in an equivalent way:

    const myObj = new Map();
    myObj.set("even", [0, 2, 4]);
    myObj.set("odd", [1, 3, 5]);
    ```