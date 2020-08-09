if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function () { };
        F.prototype = o;
        return new F();
    };
}

var another_stooge = Object.create(stooge);

document.writeln("another_stooge.first name: " + another_stooge["first name"]);
document.writeln("another_stooge.last-name: " + another_stooge.lastName);
document.writeln("another_stooge.last-name==='Howard' : " + (another_stooge["lastName"] === 'Howard'));
document.writeln("another_stooge.first name==='Jerome' : " + (another_stooge["first name"] === "Jerome"));


if ((another_stooge.lastName === "Howard") && (another_stooge["first name"] === "Jerome")) {
    document.writeln("it's true");
} else {
    document.writeln("it's false");
}

stooge.profession = 'actor';
document.writeln("another_stooge.profession: " + another_stooge.profession);

var name;
for (name in another_stooge) {
    if ((typeof another_stooge[name] !== 'function')) {
        document.writeln(name + ': ' + another_stooge[name]);
    }
}

another_stooge.married = false;
another_stooge.profession = 'stuntman';

for (name in another_stooge) {
    if (another_stooge.hasOwnProperty(name)) {
        document.writeln('hasOwnProperty - ' + name + ': ' + another_stooge[name]);
    }
}

delete another_stooge.profession

document.writeln("another_stooge.profession: " + another_stooge.profession);