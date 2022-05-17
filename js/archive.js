const urlParams = new URLSearchParams(window.location.search);
// in the URL grab params and store it's value in id

const artwork_type = urlParams.get("artwork_type");
const sort_by_year = urlParams.get("sort_by_year");
const sort_by_artist = urlParams.get("sort_by_artist")

// console.log(artwork_type);

let url = "https://kea2021int-f4d0.restdb.io/rest/artworks";

if (artwork_type) {
    url = "https://kea2021int-f4d0.restdb.io/rest/artworks?q={%22artwork_type%22:%20%22" + artwork_type + "%22}";
}

if (sort_by_year) {
    if (sort_by_year == "descending_order") {
        url = "https://kea2021int-f4d0.restdb.io/rest/artworks?h={%22$orderby%22:%20{%22artwork_date%22:%20-1}}";
    } else if (sort_by_year == "ascending_order") {
        url = "https://kea2021int-f4d0.restdb.io/rest/artworks?h={%22$orderby%22:%20{%22artwork_date%22:%20+1}}";
    }
}

if (sort_by_artist) {
    url = 'https://kea2021int-f4d0.restdb.io/rest/artworks?q={"artist_name":"' + sort_by_artist + '"}'
}

// console.log(url);

// The API-key
const options = {
    headers: {
        "x-apikey": "614cd5acdfa7346e2f968fcd",
    },
};

fetch(url, options)
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    })
    .then((data) => {
        //We have the data
        // console.log(data);
        handleData(data);
    })
    .catch((e) => {
        //Woops, something went wrong
        console.error("An error occured:", e.message);
    });

function handleData(data) {
    data.forEach((artworks) => {
        // console.log(artworks);
        // 1. make a template
        // 2. grab it 
        const template = document.querySelector(".archive_template").content;
        // 3. clone it
        const clone = template.cloneNode(true);
        // 4. populate with data
        clone.querySelector(".archive_tile_artwork").textContent = artworks.artwork_title;
        clone.querySelector(".archive_tile_artist").textContent = artworks.artist_name;
        clone.querySelector(".artwork_date").textContent = artworks.artwork_date;
        clone.querySelector(".artwork_description").textContent = artworks.description;
        clone.querySelector(".artwork_type").textContent = artworks.artwork_type;
        clone.querySelector(".archive_tile_img").src = artworks.images_url[0];

        // 5. append it to the DOM
        const parent = document.querySelector(".archive_content");
        parent.appendChild(clone);
    });
}

//Side menu collapsible

const coll = document.querySelectorAll(".collapsible");
let i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}


// Filtering side menu

const allCheckboxes = document.querySelectorAll('input[type=checkbox]');

allCheckboxes.forEach(checkedCheckbox);

function checkedCheckbox(el) {
    if (el.value == artwork_type) {
        el.checked = true;
    } else if (el.value == sort_by_year) {
        el.checked = true;
    } else if (el.value == sort_by_artist) {
        el.checked = true;
    }
}

allCheckboxes.forEach(filtering);

// function filtering(el) {
//     console.log(el);
//     el.addEventListener("click", () => {
//         if (el.value == artwork_type) {
//             window.location.href = "archive.html";
//         } else {
//             const filterVal = el.value;
//             console.log(filterVal);
//             window.location.href = "archive.html?artwork_type=" + filterVal;
//         }
//     })
// }

function filtering(el) {
    el.addEventListener("click", () => {
        if (el.checked == true) {
            console.log(el.value);
            if (el.name == "artwork_type") {
                let filterVal = el.value;
                window.location.href = "archive.html?artwork_type=" + filterVal;
            } else if (el.name == "sort_by_year") {
                let filterVal = el.value;
                window.location.href = "archive.html?sort_by_year=" + filterVal;
            } else if (el.name == "artists") {
                let filterVal = el.value;
                window.location.href = "archive.html?sort_by_artist=" + filterVal;
            }
        } else {
            window.location.href = "archive.html"
        }
    })
}