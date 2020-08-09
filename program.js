document.writeln('Hello, world!');

{
    var toto = "toto";
}

toto[1] = "a";
toto[3] = "a";

document.writeln('Hello, ' + toto);

toto = "tata";

document.writeln('Hello, ' + toto);

let a = b = "hello";
a = a + " world";

document.writeln(a);

//Function.prototype.method = function (name, func) {
//    this.prototype[name] = func;
//    return this;
//};