const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we're connected!")
    createKitty()
});

function createKitty() {
    const kittySchema = new mongoose.Schema({
        name: String
    });

    // NOTE: methods must be added to the schema before compiling it with mongoose.model()
    kittySchema.methods.speak = function () {
        const greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
        console.log(greeting);
    }

    const Kitten = mongoose.model('Kitten', kittySchema);

    const silence = new Kitten({ name: 'Silence' });
    console.log(silence.name); // 'Silence'

    const fluffy = new Kitten({ name: 'fluffy' });
    fluffy.speak(); // "Meow name is fluffy"

    fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
    });

    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
    })

    silence.save()

    Kitten.find({ name: /^fluff/ }, function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
    })

}
