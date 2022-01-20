console.log('Hello world!')

fetch("http://localhost:3000/data")
    .then(res => res.text())
    .then(res => {
        const words = res.split(/\r?\n/).filter(e => e.length > 0)
        console.log(words)
    });