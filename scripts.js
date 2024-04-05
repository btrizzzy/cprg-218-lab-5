/* Create character card */
function createCard(item) {
  return `
    <li class="card">
        <div class="card-content">
            <h1 class="header">
                ${item.title}
            </h1>
            <h3 class="subheader">
                ${item.subtitle}
            </h3>
            <h6>Featured In: </h6>
            <img src="${item.image} alt=""></img>
            <p class="card-text">
                ${item.text}
            </p>
        </div>
    </li>
  `;
}

/* Fetch all Ghibli characters */
async function fetchGhibli() {
  try {
    const response = await fetch("https://ghibliapi.vercel.app/people/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

/* Fetch species of selected character */
async function fetchSpecies(speciesAPILink) {
  try {
    const response = await fetch(speciesAPILink);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching species details:", error);
  }  
}

/* Fetch film details of selected character */
async function fetchDetails(filmAPILink) {
  try {
    const response = await fetch(filmAPILink);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching film details:", error);
  }  
}

/* Render selected character card */
async function renderResults(data) {
  try {
    const charName = data.name;
    let gender = data.gender === "NA" ? "Gender information not available" : data.gender;
    let age = data.age === "" || data.age === "NA" ? "Age information not available" : data.age;
    const speciesData = await fetchSpecies(data.species);
    const filmData = await fetchDetails(data.films[0]);
    const subtitle = `Gender: ${gender} <br> Age: ${age} <br> Species: ${speciesData.name}`;
    const text = ` ${filmData.title} (${filmData.release_date})`
    const card = createCard({
      title: charName,
      subtitle: subtitle,
      text: text,
      image: filmData.image,
    });

    document.getElementById("results").innerHTML = card;

    } catch (error) {
    console.error("Error rendering character card:", error);
  }
}

/* Populate dropdown list */
async function renderDropdown() {
  try {
    const select = document.getElementById("dropdown");
    const list = await fetchGhibli();
    list.forEach((item) => {
      const option = document.createElement("option");
      option.textContent = item.name;
      option.value = item.url;
      select.appendChild(option);
    });
  }
  catch (error) {
  console.error("Error populating dropdown list:", error);
  }
}

/* Click button event */
async function dropdownClick(event) {
  try {
    const select = document.getElementById("dropdown");
    const url = select.options[select.selectedIndex].value;
    const response = await fetch(url);
    const data = await response.json();
    renderResults(data);
  }
  catch (error) {
  console.error("Error processing dropdown click:", error);
  }
}

/* Clickity click */
const confirmButton = document.getElementById("confirm-button");
confirmButton.addEventListener("click", dropdownClick);

/* Call to populate the dropdown */
renderDropdown();