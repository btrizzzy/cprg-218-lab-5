/* Create character card */
function createCard() {

}

/* Get details of Ghibli characters */
async function getGhibli() {
  try {
    const response = await fetch("https://ghibliapi.vercel.app/people/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

/* Populate dropdown list*/
async function renderDetails(result) {
  const card = createCardElement({
    title: data.name,
    subtitle: data.types.map((type) => type.type.name).join(", "),
    image: data.sprites.other["official-artwork"].front_default,
  });
}


getGhibli().then((results) => console.log(results));
