class Property < ApplicationRecord
 
    has_many_attached :images

    has_many :reviews, dependent: :destroy
    
    has_many :wishlists, dependent: :destroy

    has_many :wishlisted_users, through: :wishlists, source: :user, dependent: :destroy
    
    monetize :price_cents, allow_nil: true
    
    validates :name, presence: true
    validates :headline, presence: true
    validates :description, presence: true
    validates :address_1, presence: true
    validates :state, presence: true
    validates :city, presence: true
    validates :country, presence: true


    def update_average_rating
        average_rating = reviews.average(:final_rating);
        update_column(:average_final_rating, average_rating)
    end

    def wishlisted_by?(user = nil)

        return if user.nil?

        wishlisted_users.include?(user)
    end
end
