/* Create character card */
function createCard(item) {
  return `
    <li class="card">
        <div class="card-content">
            <p class="subheader">
                ${item.subtitle}
            </p>
            <h3 class="header">
                ${item.title}
            </h3>
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
    console.error(error);
  }
}

/* Render selected character card */
function renderResults(data) {
  const card = createCard({
    title: data.name,
    subtitle: data.classification,
  });
  document.getElementById("results").innerHTML = card;
}

/* Populate dropdown list */
async function renderDropdown() {
  const select = document.getElementById("dropdown");
  const list = await fetchGhibli();
  if (list) {
    list.forEach((item) => {
      const option = document.createElement("option");
      option.textContent = item.name;
      option.value = item.url;
      select.appendChild(option);
    });
  }
}

/* Click event */
async function dropdownClick(event) {
  const select = document.getElementById("dropdown");
  const url = select.options[select.selectedIndex].value;
  const response = await fetch(url);
  const data = await response.json();
  if (data) {
    renderResults(data);
  }
}

const confirmButton = document.getElementById("confirm-button");
confirmButton.addEventListener("click", dropdownClick);

/* Call to populate the dropdown */
renderDropdown();
