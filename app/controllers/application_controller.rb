class NotAuthenticatedError < StandardError
end

class AuthenticationTimeoutError < StandardError
end

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  before_action :set_current_user, :authenticate_request  

  rescue_from NotAuthenticatedError  do
    render json: { error: 'Not Authorized' }, status: :unauthorized
  end

  rescue_from AuthenticationTimeoutError do
    render json: { error: 'Auth token is expired'}, status: 419
  end

  private 

  def set_current_user
    if decoded_auth_token
      @current_user ||= User.find(decoded_auth_token[:user_id])
    end
  end

  def authenticate_request
    if auth_token_expired?
      fail AuthenticationTimeoutError
    elsif !@current_user
      fail NotAuthenticatedError
    end
  end

  def decoded_auth_token
    @decoded_auth_token ||= AuthToken.decode(http_auth_header_content)
  end

  def auth_token_expired?
    decoded_auth_token && decoded_auth_token.expired?
  end

  def http_auth_header_content
    return @http_auth_header_content if defined? @http_auth_header_content

    @http_auth_header_content = begin
      if request.headers["Authorization"].present?
        request.headers['Authorization'].split(' ').last # expect values as 'Bearer ajsdkjasdkjasdjk'
      else 
        nil
      end
    end
  end

end

