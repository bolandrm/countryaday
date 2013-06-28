class User < ActiveRecord::Base
  validates :provider, presence: true
  validates :uid, presence: true

  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid)).first_or_create do |user|
      user.name = auth.info ? (auth.info.nickname || auth.info.name) : nil
      user.email = auth.info.email if auth.info
    end
  end
end
