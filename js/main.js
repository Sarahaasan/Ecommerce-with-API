//handle navbar toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('mobile-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('hidden');
    });
  }
});
//---------------------------------------------------------------------------
// handle animation of features section 
document.addEventListener("DOMContentLoaded", () => {
  const featuresSection = document.querySelector("#features");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        featuresSection.classList.add("show");
        observer.unobserve(featuresSection); 
      }
    });
  }, { threshold: 0.2 });

  observer.observe(featuresSection);
});
//--------------------------------------------------------------------------


// fetch api 
async function fetchAPI(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
///* auto-scrolling horizontal card */  
async function ImageScriller()
 { 
    const data = await fetchAPI("../products.json");
  if (!data) return;


    const scroll_row = document.getElementById("scrollRow");
    data.products.forEach ( item => {
        const scrol_card = document.createElement("div");
         scrol_card.className = "bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex-shrink-0 w-60 p-4 text-center";
         scrol_card.innerHTML = `
      <img src="${item.thumbnail}" alt="product image" loading="lazy 
           class="w-40 h-40 mx-auto object-contain rounded-lg mb-3">
      <p class="text-sm font-semibold text-gray-700 capitalize">${item.category}</p>
    `;
        scroll_row.appendChild(scrol_card);
    });
 }
 ImageScriller()

//  cards
function card(product) {
  return `
    <div class="mt-4">
      <div class="relative group w-full h-48 rounded-t-lg overflow-hidden">
        <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-full object-cover bg-gray-100" />

        <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg">
          <button class="heart_whishlist text-red-600 px-4 py-2 rounded-full transform -translate-y-12 group-hover:translate-y-0 transition-transform"
        data-id="${product.id}">
            <i class="ri-heart-fill text-2xl text-white"></i>
           </button>

        <a href="./description.html" target="_blank"
   class="see_more bg-[#DC2626] text-white px-5 py-2 rounded-full shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-300 inline-block text-center transform translate-y-12 group-hover:translate-y-0">
  See More
</a>

        </div>
      </div>

      <div class="flex items-center justify-between mt-4 ">
        <span class="text-sm font-semibold text-gray-800">${product.title}</span>
        <span class="text-xl font-bold text-[#DC2626]">${product.price}</span>
      </div>
   
     <div class="flex flex-col relative overflow-hidden h-6 cat_cart_container hover:text-[#DC2626] transition-colors duration-300">
       <a href="#" target="_blank" class="add_to_cart absolute inset-0 flex items-center transition-transform duration-300 ease-in-out">
    <i class="ri-shopping-cart-line mr-1"></i> Add to cart </a>
  <span class="cat absolute inset-0 flex items-center text-sm text-gray-600 transition-transform duration-300 ease-in-out">
    ${product.category}
  </span>
</div>

    </div>
  `;
}
async function loadCards() {
  const data = await fetchAPI("../products.json");
  if (!data || !data.products) return;

  const container = document.getElementById("cardsContainer");
  container.innerHTML = ""; 

  data.products.forEach(product => {
    const cardWrapper = document.createElement("div");
    cardWrapper.innerHTML = card(product);
    container.appendChild(cardWrapper);
  });
  document.querySelectorAll('.heart_whishlist').forEach(button => {
  button.addEventListener('click', () => handleHeartClick(button));
});
}
loadCards();

// filtering whishlist 
let wishlist = [];

function handleHeartClick(button) {
  const id = parseInt(button.dataset.id);
  const icon = button.querySelector('i');
  const isInWishlist = wishlist.includes(id);

  if (isInWishlist) {

    wishlist = wishlist.filter(pid => pid !== id);
    icon.classList.remove('text-red-600');
    icon.classList.add('text-white');
  } else {

    wishlist.push(id);
    icon.classList.remove('text-white');
    icon.classList.add('text-red-600');
  }

  console.log('Wishlist:', wishlist);
}


