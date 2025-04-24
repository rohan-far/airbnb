import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  static targets = ['icon', 'text'];

  updateWishlistStatus(e) {
    e.preventDefault();

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
      this.element.dataset.status = "true";
      this.iconTarget.classList.remove("fill-none");
      this.iconTarget.classList.add("fill-primary");
      
      if (this.textTarget) {
        this.textTarget.innerText = 'Saved';
      }
      
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
        this.element.dataset.wishlistId = "";
        this.element.dataset.status = "false";
        this.iconTarget.classList.remove("fill-primary");
        this.iconTarget.classList.add("fill-none");
        
        if (this.textTarget) {
          this.textTarget.innerText = 'Save';
        }

        
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
