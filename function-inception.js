Object.prototype.identity = function () {
    return this.constructor.name;
};

function displayAllProperties(object, label) {
    document.writeln('\n/* **************************************** */');
    document.writeln('/* ** ' + (label || object.identity()) + ' **************** */');
    for (property in Object.keys(object)) {
        document.writeln(property + ': ' + object[property]);
    }
    document.writeln('/* **************************************** */\n');
}

var generator = function (a, b) {
    return {
        add: function () {
            return (a + b)
        }
    };
};

displayAllProperties(generator, "generator");
var operation = generator(3, 5);
document.writeln("add method : " + operation.add()); // 3

// Create a variable called add and store a function // in it that adds two numbers.
var add = function (a, b) {
    return a + b;
};

var addNamed = function add(a, b) {
    return a + b;
};


displayAllProperties(add, "add")
displayAllProperties(another_stooge, "another_stooge")

// ****************** The Method Invocation Pattern ****************** //

// Create myObject. It has a value and an increment 
// method. The increment method takes an optional
// parameter. If the argument is not a number, then 1 // is used as the default.
var myObject = {
    value: 0,
    increment: function (inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function () {
        return this.value;
    }
};

myObject.increment();
document.writeln(myObject.value);     // 1
myObject.increment(2);
document.writeln(myObject.value);    // 3


// ****************** The Method Invocation Pattern ****************** //

// Augment myObject with a double method.
myObject.double = function () {
    var that = this; // Workaround.
    var helper = function () {
        that.value = add(that.value, that.value);
    };
    helper(); // Invoke helper as a function. 
};

// Invoke double as a method.
myObject.double();
document.writeln(myObject.getValue()); // 6

displayAllProperties(myObject, "myObject");

// ****************** The Constructor Invocation Pattern ****************** //

// Create a constructor function called Quo. // It makes an object with a status property.
var Quo = function (string) {
    this.status = string;
};

// Give all instances of Quo a public method
// called get_status.
Quo.get_status = function () {
    return "Own-" + this.status;
};

displayAllProperties(Quo, "Quo");

var quoTest = new Quo("test");

displayAllProperties(quoTest, "quoTest");

document.writeln(quoTest.status); // confused

// Give all instances of Quo a public method
// called get_status.
Quo.prototype.get_status = function () {
    return this.status;
};

displayAllProperties(Quo, "Quo")

// Make an instance of Quo.
var myQuo = new Quo("confused");

displayAllProperties(myQuo, "myQuo")

document.writeln(myQuo.get_status()); // confused

// ****************** The Apply Invocation Pattern ****************** //

// Make an array of 2 numbers and add them.
var array = [3, 4];
var sum = add.apply(null, array); // sum is 7
// Make an object with a status member.
var statusObject = {
    status: 'A-OK'
};
// statusObject does not inherit from Quo.prototype, // but we can invoke the get_status method on
// statusObject even though statusObject does not have // a get_status method.
var status = Quo.prototype.get_status.apply(statusObject); // status is 'A-OK'
document.writeln("status :" + status); // confused

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

add.method("sub", function () {
    return a - b;
});

displayAllProperties(add, "add extended");

//document.writeln("add sub" + add(3, 4).sub()); // confused

Number.method('integer', function () {
    return Math[(this < 0) ? 'ceil' : 'floor'](this);
});
displayAllProperties(Number, "Number");

document.writeln((-10 / 3).integer()); // -3
var foo = function (a, b) {
    if ((typeof a === Number) && (typeof b === Number)) {
        var r = 2;
    } else {
        var r = 5;
    }

    return r;
}

document.writeln("foo :" + foo(2, 5));
document.writeln("foo :" + foo("n", 5));

var myProtectedObject = function () {
    var value = 0;
    return {
        increment: function (inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function () {
            return value;
        }
    };
}();

displayAllProperties(myProtectedObject, "myProtectedObject");

myProtectedObject.increment();
document.writeln(myProtectedObject.getValue());     // 1
myProtectedObject.increment(2);
document.writeln(myProtectedObject.getValue());    // 3

// Define a function that sets a DOM node's color // to yellow and then fades it to white.
var fade = function (node) {
    var level = 1;
    var step = function () {
        var hex = level.toString(16);
        node.style.backgroundColor = '#FFFF' + hex + hex;
        if (level < 15) {
            level += 1;
            setTimeout(step, 100);
        }
    };
    setTimeout(step, 100);
};

fade(document.body);

document.writeln("<h1>Tata</h1>");     // 1
document.writeln("<h1>Titi</h1>");     // 1
document.writeln("<h1>Toto</h1>");     // 1


document.writeln("<h2>nafnaf</h2>");     // 1
document.writeln("<h2>nifnif</h2>");     // 1
document.writeln("<h2>noufnouf</h2>");     // 1
// BAD EXAMPLE
// Make a function that assigns event handler functions to an array of nodes the wrong way.
// When you click on a node, an alert box is supposed to display the ordinal of the node.
// But it always displays the number of nodes instead.
var add_the_handlers = function (nodes) {
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = function (e) {
            alert(i);
        };
    }
};

add_the_handlers(document.getElementsByTagName("h1"));
// END BAD EXAMPLE

// BETTER EXAMPLE
// Make a function that assigns event handler functions to an array of nodes the right way.
// When you click on a node, an alert box will display the ordinal of the node.
var better_add_the_handlers = function (nodes) {
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = function (i) {
            return function (e) {
                alert(i);
            };
        }(i);
    }
};

better_add_the_handlers(document.getElementsByTagName("h2"));
// BETTER EXAMPLE