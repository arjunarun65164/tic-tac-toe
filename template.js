//One of something = module
//multiple of something = factory function

const factoryFunction = function(age){
    const name = 'hello';
    const not_accessed = 'sup';
    return {name, age} //only these returned items can be access
}
//create a function which returns an object. only have access to that object
//inheritance is done by calling factoryFunction within another function 
    //and using factoryFunction's returned values


const constructor = function (age){
    this.age = age;
    this.name = 'hello'
}
//same thing as the factory function but with a constructor


const module = (function(){
    const add = (a,b)=> a+b;
    const subtract = (a,b)=> a-b;
    const multiply = (a,b)=> a*b;
    const divide = (a,b)=> a/b;

    return {add, subtract, multiply, divide}
})()




