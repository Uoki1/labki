

// Функції



const createFilesOfCharacter =(names) =>{


    if(!fs.existsSync('./people'))
    {
        fs.mkdir('./people', () => { });
    }
   

    names.forEach(name => {
        fs.writeFileSync(`./people/${name}.txt`, '');
    })

}

const fs = require('fs');


const scenarion = fs.readFileSync('./scenario.txt', 'utf-8');  

    let names = [];
    const result = new Set(scenarion.match(/^[A-Z][a-z]+:/gm)); // Пошук імен персонажів

    result.forEach(el =>{       //pushing names into array without ":" symbol
        const element = el.slice(0,-1);
        names.push(element);
    })

    let regularString = '';

    names.forEach(name =>{          //Формування виразу типу (Triss|Geralt|Max|Yennefer)
       if(names.indexOf(name) != names.length-1)
       {
        regularString += name + '|'
       }
       else{
        regularString += name;
       }
    })



    let a = scenarion;
    const res = {};
    const b = [...a.matchAll(new RegExp(`^(${regularString}):`, 'gmi'))];
    console.log(b);


    for (let i = 0; i < b.length; i += 1) {
        const match = b[i];
        console.log('match:', match);
        const [_1, characterName] = match;
        
        const { index } = match;
        if (res[characterName]) {
            res[characterName].push({
                start: index,
                end: b[i + 1] ? b[i + 1].index : -1
            });
        } else {
            res[characterName] = [{
                start: index,
                end: b[i + 1] ? b[i + 1].index : -1
            }];
        }
    }

    console.log(res);

    createFilesOfCharacter(names)
    

    names.forEach(name =>{
        const indexesOfQuotes = res[name];
        const characterQuotes = [];


        indexesOfQuotes.forEach(index =>{
            const start = index.start;
            const end = index.end;
            const quote = a.slice(start+name.length+2,end);
            characterQuotes.push(quote);
        })

        characterQuotes.forEach(quote =>{
            fs.appendFileSync(`./people/${name}.txt`, `${quote}`);
        })

        
    } )







