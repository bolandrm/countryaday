class User < ActiveRecord::Base
  has_many :country_entries, dependent: :destroy

  validates :provider, presence: true
  validates :uid, presence: true

  def self.signin_or_register(auth, first_country = nil)
    user = where(auth.slice(:provider, :uid)).first_or_create do |user|
      user.name = auth.info ? (auth.info.nickname || auth.info.name) : nil
      user.email = auth.info.email if auth.info
      user.set_auth_token
    end

    if user.country_entries.count == 0
      CountryEntry.add_for_user(user.id, first_country)
    end

    user
  end

  def add_new_country_if_new_day
    CountryEntry.add_new_country_if_new_day(self.id)
  end

  def country_codes
    self.country_entries.map(&:code)
  end

  def latest_country_entry
    self.country_entries.order('created_at DESC').first
  end

  def latest_country_code
    latest_country_entry.code
  end

  def set_auth_token
    begin
      self.auth_token = SecureRandom.urlsafe_base64
    end while User.exists?(auth_token: self.auth_token)
  end
end
