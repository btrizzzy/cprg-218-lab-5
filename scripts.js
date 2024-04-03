
async function fetchCharacters() {
  try {
    const response = await fetch('https://ghibliapi.vercel.app/people');
    const data = await response.json();
    return data.results;
    console.log(data.results);
    
    //Error handling
    } catch (error) {
    console.log('Error');
    }
}