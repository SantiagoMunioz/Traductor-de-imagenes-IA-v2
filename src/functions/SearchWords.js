import { BadWords } from "../data-bases/BadWords";

export const SearchWords = (bWords) => {
    const cleanWords = bWords.toLowerCase().replace(/(\r\n|\n|\r)/gm, ' ');
    const words = cleanWords.split(' ');
    for(let i = 0; i < words.length; i++){
        words[i] = words[i].replace(',','');
        words[i] = words[i].replace('.','');
        words[i] = words[i].replace(' ','');
        if( BadWords.includes(words[i]) ){ return(true); }
    };
    return(false);
}