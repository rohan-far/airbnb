user = User.create!({
    email: 'ro2@gmail.com',
    password: '123456'
})


6.times do |i|
    property = Property.create!({
        name: Faker::Lorem.unique.sentence(word_count: 3),
        headline: Faker::Lorem.unique.sentence(word_count: 6),
        description: Faker::Lorem.paragraph(sentence_count: 10),
        address_1: Faker::Address.street_address,
        address_2: Faker::Address.street_name,
        city: Faker::Address.city,
        state: Faker::Address.state,
        country: Faker::Address.country,
        price: Money.from_amount((50..100).to_a.sample, "USD"),
        bedroom_count: (2..5).to_a.sample,
        bed_count: (4..10).to_a.sample,
        guest_count: (2..20).to_a.sample,
        bathroom_count: (1..4).to_a.sample,
    })
    property.images.attach(io: File.open("db/images/property_#{i + 1}.png"), filename: property.name)
    property.images.attach(io: File.open("db/images/property_7.png"), filename: property.name)
    property.images.attach(io: File.open("db/images/property_8.png"), filename: property.name)
    property.images.attach(io: File.open("db/images/property_9.png"), filename: property.name)
    property.images.attach(io: File.open("db/images/property_10.png"), filename: property.name)
    property.images.attach(io: File.open("db/images/property_11.png"), filename: property.name)
    property.images.attach(io: File.open("db/images/property_12.png"), filename: property.name)


    ((50..100).to_a.sample).times do
        Review.create!({
            content: Faker::Lorem.paragraph(sentence_count: 10),
            communication_rating: (1..5).to_a.sample,
            cleanliness_rating: (1..5).to_a.sample,
            accuracy_rating: (1..5).to_a.sample,
            checkin_rating: (1..5).to_a.sample,
            location_rating: (1..5).to_a.sample,
            value_rating: (1..5).to_a.sample,
            property: property,
            user: user
        })
    end
end