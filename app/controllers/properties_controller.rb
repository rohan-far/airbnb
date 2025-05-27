class PropertiesController < ApplicationController
    def show
        @property = Property.includes(:reviews).find(params[:id])
        @overall_review_count = @property
                                .reviews
                                .group("final_rating")
                                .count
                                .transform_keys(&:to_i)
        @overall_review_count.default = 0
    end
end