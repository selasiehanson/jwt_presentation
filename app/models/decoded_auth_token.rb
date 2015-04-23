class DecodedAuthToken
  def expired?
    self[:exp] <= Time.now.to_i
  end
end
