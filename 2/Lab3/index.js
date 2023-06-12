
// Функції

const createFilesOfHeroes =(names) =>{


    if(!fs.existsSync('./people'))
    {
        fs.mkdir('./people', () => { });
    }
   

    names.forEach(name => {
        fs.writeFileSync(`./people/${name}.txt`, '');
    })

}



const fs = require('fs');




const scenarion = fs.readFileSync('./scenario.txt', 'utf-8');       //Витягую цілий текст з файлу


const result = scenarion.match(/^[A-Z][a-z]+:/gm);       //пошук імен за допомгою регулярних виразів
console.log(result);

const names = [];

result.forEach(element =>{          //Відібрані імя з текстового документа
    if(!names.includes(element.slice(0,-1)))
    {
        names.push(element.slice(0,-1));
    }
})

console.log(names);

createFilesOfHeroes(names);

names.forEach(name=>{
    const quotes = scenarion.match(new RegExp(`${name}:.+`, 'gm'));
    
    console.log(quotes);

    const new_quotes = [];

    const nameLength = name.length;
    
    quotes.forEach(quote=>{

        if(!new_quotes.includes(quote.slice(nameLength + 1))){
            new_quotes.push(quote.slice(nameLength + 1));
        }


    })

    new_quotes.forEach(new_quote =>{
        fs.appendFileSync(`./people/${name}.txt`, `${new_quote}\n`);
    })
})





