FactoryBot.define do
  factory :image do
    image {File.open("#{Rails.root}/test/fixtures/files/images/夕映えの影.jpg")}
    # image {File.open("#{Rails.root}/public/uploads/image/image/4/夕映えの影.jpg")}
    association :item
  end
end
