class SessionsController < ApplicationController
	def create
		@user = User.find_by_username_and_password(params[:user][:username], params[:user][:password])

		if @user
			sign_in(@user)
			redirect_to boards_url
		else
			flash.now[:errors] = ["Incorrect Username/Password!"]
			render :new
		end
	end

	def destroy
		sign_out
		redirect_to new_session_url
	end
end
