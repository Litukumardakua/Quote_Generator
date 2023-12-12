const quoteContainer =document.getElementById('quote-container');
const quoteText =document.getElementById('quote');
const authorText =document.getElementById('author');
const twitterBtn =document.getElementById('twitter');
const newQuoteBtn =document.getElementById('new-quote');
const loader =document.getElementById('loader');


let apiQuote = []

// show loader
 function loading(){
  loader.hidden = false
  quoteContainer.hidden = true;
 }

 // Hide loading

 function complete(){
  quoteContainer.hidden = false;
  loader.hidden = true;
 }
// show new quote

function newQuate(){
  loading();
const quote = apiQuote[Math.floor(Math.random()*apiQuote.length)];
// check if author field is blank and replace it with 'unknow
  if (!quote.author){
    authorText.textContent = 'UnKnown'
  }else{
    authorText.textContent = quote.author;
  }
  //check the Quote length to determine styling
  if(quote.text.length > 120){
    quoteText.classList.add('long-quote');
  }else{
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
  complete();
}


// get quotes from API
async function getQuotes(){
  loading();
   const apiUrl = 'https://type.fit/api/quotes'; 
   try {
    const response = await fetch(apiUrl)
    apiQuote = await response.json();
    newQuate();
   } catch (error) {
    console.log("check error ====>",error);
    
   }
}

//Tweet Quote
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl,'_blank'); // twitter open new tab
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuate)
twitterBtn.addEventListener('click',tweetQuote)

getQuotes()