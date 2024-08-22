export const TranslationMMT = async (text, lang) => {
    const fetch = require('node-fetch');
    const url = `https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=${lang}&q=${encodeURIComponent(text)}&mt=1&onlyprivate=0&de=a%40b.c`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY, // Subscribe to rapidapi-mymemorytranslation for free to get a key access and add it in the file .env → REACT_APP_RAPID_API_KEY = <<key access>>
            'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
        },
    };

    try{
        const response = await fetch(url, options);
        const translatedText = await response.text();
        return translatedText;
    } catch(error){
        console.error('Error al traducir ', error);
        return error;
    }
}