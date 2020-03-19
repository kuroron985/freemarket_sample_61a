class Card < ApplicationRecord
  # アソシエーション
  belongs_to :user, optional: true

  # バリデーション
  validates :customer_number, presence: true, format: { with: /\A[0-9]+\z/} # 半角数字のみ
  validates :year,            presence: true
  validates :month,           presence: true
  validates :security_code,   presence: true, format: { with: /\A[0-9]+\z/} # 半角数字のみ
  
  enum month: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12}
  enum year: {"21":21,"22":22,"23":23,"24":24,"25":25,"26":26,"27":27,"28":28,"29":29,"30":30,"31":31}
end
