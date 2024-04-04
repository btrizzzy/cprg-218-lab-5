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
            <h6>Featured in: </h6>
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
    const gender = data.gender;
    const filmData = await fetchDetails(data.films[0])
    const card = createCard({
      title: charName,
      subtitle: gender,
      text: filmData.title,
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