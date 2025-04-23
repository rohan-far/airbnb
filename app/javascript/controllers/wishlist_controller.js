import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  updateWishlistStatus(){

    const isUserLoggedIn = this.element.dataset.userLoggedIn;

    if (isUserLoggedIn === "false"){
      document.querySelector(".js-login").click();
      return 
    }
    
    if (this.element.dataset.status === "false"){
      const propertyId = this.element.dataset.propertyId;
      const useId = this.element.dataset.userId;
      
      this.addPropertyToWishlist(propertyId, useId);
    }
    else{
      const wishlistId = this.element.dataset.wishlistId;
      this.removePropertyFromWishlist(wishlistId)
    }
  }
  addPropertyToWishlist(property_id, user_id){
    const params = {
      property_id: property_id,
      user_id: user_id,
      };
      
      const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      
    };

    fetch('/api/wishlists', options)
    .then(response => {
      if (!response.ok) {
        console.log(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data.id);
      this.element.dataset.wishlistId = data.id;
      this.element.classList.remove("fill-none");
      this.element.classList.add("fill-primary");
      this.element.dataset.status = "true";
    })
    .catch(e => {
      console.log(e);
    });
  }

  removePropertyFromWishlist(wishlistId) {
    fetch('/api/wishlists/' + wishlistId, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.status === 204) {
        // success, but no content
        this.element.dataset.wishlistId = "";
        this.element.classList.remove("fill-primary");
        this.element.classList.add("fill-none");
        this.element.dataset.status = "false";
      } else {
        return response.json().then(data => {
          console.error("Unexpected response:", data);
        });
      }
    })
    .catch(e => {
      console.log(e);
    });
  }  
}
