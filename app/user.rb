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

  def add_country_for_today
    day_of_last_country_entry = Time.at(latest_country_entry.created_at).to_date
    today = Time.now.to_date

    unless day_of_last_country_entry === today
      begin
        code = CountryEntry.random_country
      end while country_codes.include?(code)

      self.country_entries.create(code: code)
    end
  end

  def add_first_country(first_country = nil)
    # if the user has opted to get a 'preview' by asking for a first country,
    # we will get that info from this cookie.  Clean it up if that's the case
    first_country.gsub!('"', '') if first_country

    code = first_country ? first_country : CountryEntry.random_country
    self.country_entries.build(code: code)
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
