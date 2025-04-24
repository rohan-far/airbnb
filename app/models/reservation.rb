class Reservation < ApplicationRecord
  belongs_to :user
  belongs_to :property

  validates :checkin_date, presence: :true
  validates :checkout_date, presence: :true

  # coming_reservatoin function name, we are thinking about future or upcoming dates, so in that case checkin_date will be greater, here is the "?" to pass this value, so checking_date should be greater than today, it can have 4,6 or 15 so we order all those reservations by checkin_date 
  scope :upcoming_reservations, -> { where("checkin_date > ?", Date.today).order(:checkin_date)}
  scope :current_reservations, -> { where("checkout_date > ?", Date.today).where("checkin_date < ?", Date.today).order(:checkout_date) }

end
