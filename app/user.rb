class User < ActiveRecord::Base
  has_many :country_entries, dependent: :destroy

  validates :provider, presence: true
  validates :uid, presence: true

  def self.signin_or_register(auth, first_country = nil)
    user = where(auth.slice(:provider, :uid)).first_or_initialize

    user.name = auth.info ? (auth.info.nickname || auth.info.name) : nil
    user.email = auth.info.email if auth.info
    user.add_first_country(first_country) if user.new_record?
    user.set_auth_token

    user.save!
    user
  end

  def add_first_country(first_country = nil)
    code = first_country ? first_country : CountryEntry.random_country
    self.country_entries.build(code: code)
  end

  def country_codes
    self.country_entries.map(&:code)
  end

  def latest_country_code
    self.country_entries.order('created_at DESC').first.code
  end

  def set_auth_token
    begin
      self.auth_token = SecureRandom.urlsafe_base64
    end while User.exists?(auth_token: self.auth_token)
  end
end
