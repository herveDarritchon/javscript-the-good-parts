String.method('deentityify', function () {
    // The entity table. It maps entity names to // characters.
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };
    // Return the deentityify method. 
    return function () {
        // This is the deentityify method. It calls the string 
        // replace method, looking for substrings that start 
        // with '&' and end with ';'. If the characters in
        // between are in the entity table, then replace the 
        // entity with the character from the table. It uses 
        // a regular expression (Chapter 7).
        return this.replace(/&([^&;]+);/g, function (match, p1) {
            var r = entity[p1];
            console.log('- match : ' + match + ' - p1 : ' + p1 + ' - r : ' + r);
            return typeof r === 'string' ? r : match;
        }
        );
    };
}());

document.writeln('&lt;&quot;je suis&gt;'.deentityify()); // <">
document.writeln('Visit Microsoft'.replace("Microsoft", "W3Schools")); // <">
document.writeln("Mr Blue has a blue house and a blue car".replace("Microsoft", "W3Schools")); // <">
document.writeln('&lt;&quot;je suis&gt;'.replace(/&([^&;]+);/g, "<HTM $&L>")); // <">
document.writeln('&lt;&quot;je suis&gt;'); // <">

var serial_maker = function () {
    // Produce an object that produces unique strings. A // unique string is made up of two parts: a prefix // and a sequence number. The object comes with
    // methods for setting the prefix and sequence
    // number, and a gensym method that produces unique // strings.
    var prefix = '';
    var seq = 0;
    return {
        set_prefix: function (p) {
            prefix = String(p);
            return this;
        },
        set_seq: function (s) {
            seq = s;
            return this;
        },
        gensym: function () {
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    };
};

var sm = serial_maker()
    .set_prefix("Q")
    .set_seq(1000);

document.writeln('serial number 0 : ' + sm.gensym());
document.writeln('serial number 1 : ' + sm.gensym());
document.writeln('serial number 2 : ' + sm.gensym());

Function.method('curry', function () {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;
    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});
// Something isn't right...

var add1 = add.curry(1);
document.writeln(add1(6)); // 7

var memoizer = function (memo, fundamental) {
    var shell = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fundamental(shell, n);
            memo[n] = result;
        }
        return result;
    };
    return shell;
};

var fibonacci = function (n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

var fibonacci2 = function () {
    var memo = [0, 1];
    var fib = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
}();

var fibonacci3 = memoizer([0, 1], function (shell, n) {
    return shell(n - 1) + shell(n - 2);
});

for (var i = 30; i <= 40; i += 1) {
    document.writeln('// ' + i + ': ' + fibonacci3(i));
}
