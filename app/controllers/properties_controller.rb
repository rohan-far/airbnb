class PropertiesController < ApplicationController
    def show
        @property = Property.find(params[:id])
        @overall_review_count = @property.reviews.group("final_rating").count.transform_keys(&:to_i)
    end
end