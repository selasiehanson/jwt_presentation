class AuthController < ApplicationController

  skip_before_action :authenticate_request

  def authenticate
    user = User.find_by(email: params[:email], password: params[:password])

    if user 
      render json: { auth_token: user.generate_auth_token }
    else
      render json: { error: 'Unvalid useranme or password' } , status: :unauthorized
    end
  end
end
