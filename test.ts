
// /////////////////////////////////////////////////////////////////////////////////
// Works but awkward and not good practice
    function createColors<C extends string, D extends C>(colors: C[], defaultColor?: D){
        console.log(colors, defaultColor);
    }
// createColors(['red', 'blue'], 'green'); // Error in Version 5.4 TS.

// /////////////////////////////////////////////////////////////////////////////////
// Not working as expected
    function createColors2<C extends string>(colors: C[], defaultColor?: C) {
        // ...
    }
    // createColors2(["red", "yellow", "green"], "blue"); // undesired behavior
// /////////////////////////////////////////////////////////////////////////////////
// Works with NoInfer better in Version 5.4 // use this in version 5.4
    function createColors3<C extends string>(colors:C[], df:NoInfer<C>){
    }
// createColors3(["red", "yellow", "green"], "blue"); // this will not work 
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
