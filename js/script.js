// Load default + saved places
let defaultPlaces = [
  { name: "Goa", price: 10000 },
  { name: "Manali", price: 12000 },
  { name: "Kerala", price: 15000 },
  { name: "Rajasthan", price: 13000 }     

];

let stored = JSON.parse(localStorage.getItem("places")) || [];
let places = [...defaultPlaces, ...stored];

// Show destinations
let container = document.getElementById("destinations");

if (container) {
  places.forEach(place => {
    container.innerHTML += `
      <div class="card">
        <h3>${place.name}</h3>
        <p>Price: ₹${place.price}</p>
      </div>
    `;
  });
}

// Add place
const form = document.getElementById("form");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    let places = JSON.parse(localStorage.getItem("places")) || [];
    places.push({ name, price });

    localStorage.setItem("places", JSON.stringify(places));

    // ✅ Show popup
    const popup = document.getElementById("popup");
    popup.classList.add("show");

    // Hide after 2 sec
    setTimeout(() => {
      popup.classList.remove("show");
    }, 2000);

    form.reset();
  });
}

// Transport cost
function calculate() {
  let transport = document.getElementById("transport").value;
  let total = parseInt(transport) + 5000;
  document.getElementById("total").innerText = "Total Cost: ₹" + total;
}

// Feedback
function saveFeedback() {
  let fb = document.getElementById("feedback").value;
  localStorage.setItem("feedback", fb);
  alert("Thank you for feedback!");
}
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Show popup
    const popup = document.getElementById("contactPopup");
    popup.classList.add("show");

    // Hide after 2 sec
    setTimeout(() => {
      popup.classList.remove("show");
    }, 2000);

    contactForm.reset();
  });
}
function bookNow(place, price) {
  localStorage.setItem("place", place);
  localStorage.setItem("placePrice", price);

  window.location.href = "payment.html";
}
window.onload = function () {

  const place = localStorage.getItem("place");
  const price = localStorage.getItem("placePrice");

  // Only run if payment page
  if (document.getElementById("place")) {

    document.getElementById("place").innerText = place;
    document.getElementById("placePrice").innerText = price;

  }
};
let selectedTransport = 0;

// Select transport
function selectTransport(price) {
  selectedTransport = price;

  localStorage.setItem("transportPrice", price);

  alert("Transport selected: ₹" + price);
}

// Go to payment page
function goToPayment() {
  if (!localStorage.getItem("transportPrice")) {
    alert("Please select transport first!");
    return;
  }

  window.location.href = "payment.html";
}
const transport = localStorage.getItem("transportPrice");

if (document.getElementById("transportPrice")) {
  document.getElementById("transportPrice").innerText = transport;
}
function calculateTotal() {

  let placePrice = parseInt(localStorage.getItem("placePrice")) || 0;
  let transportPrice = parseInt(localStorage.getItem("transportPrice")) || 0;
  let people = parseInt(document.getElementById("people").value);

  // Validation
  if (!people || people <= 0) {
    alert("Please enter number of people");
    return;
  }

  let total = (placePrice + transportPrice) * people;

  document.getElementById("finalTotal").innerText =
    "Final Amount: ₹" + total;
}