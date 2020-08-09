{
    document.writeln("b: " + b);
}

if (true)
    if ({})
        if ([])
            if (42)
                if ("0")
                    if ("false")
                        if (new Date())
                            if (-42)
                                if (12n)
                                    if (3.14)
                                        if (-3.14)
                                            if (Infinity)
                                                if (-Infinity) {
                                                    document.writeln("truthy");
                                                }

if (foo()) {
    document.writeln("truthy2");
} else {
    document.writeln("falsy");
}

// Function declaration
function foo() { return empty_object };

document.writeln("&& operator: " + (0 && "2"));

var empty_object = {};
var stooge = {
    "first name": "Jerome", 
    lastName: "Howard",
    address: "13 allée de la chapelle 33120 Arcachon"
};

document.writeln("stooge: " + stooge);
document.writeln("stooge.first name: " + stooge["first name"]);
document.writeln("stooge.last-name: " + stooge.lastName);
document.writeln("stooge.address: " + stooge.address);
document.writeln("undefined stooge property: " + stooge.age);
document.writeln("undefined stooge property with default value: " + (stooge.age || 49));

document.writeln("undefined stooge property protection with && : " + (stooge.age && stooge.age.year));



