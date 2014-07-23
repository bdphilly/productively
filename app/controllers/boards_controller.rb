class BoardsController < ApplicationController
	before_action :ensure_signed_in!

	def index
		@boards = Board.all
	end

	def show
		@board = Board.find(params[:id])
	end

	def new
		@board = Board.new
	end

	def create
		@board = current_user.boards.new(board_params)
		if @board.save
			# render :json => @board
			redirect_to board_url(@board)
		else
			flash.now[:errors] = @board.errors.full_messages
			render :new
		end
	end

	def update
		@board = current_user.boards.find(params[:id])

		if @board.update_attributes
			redirect_to board_url(@board)
		else
			flash.now[:errors] = @board.errors.full_messages
			render :new
		end
	end

	def destroy
		@board = current_user.boards.find(params[:id])
		@board.try(:destroy)
		redirect_to boards_url
	end

	private

	def board_params
		params.require(:board).permit(:title)
	end
end
