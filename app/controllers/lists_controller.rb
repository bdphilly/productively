class ListsController < ApplicationController
	def index
		@lists = Board.find(params[:board_id]).lists
		render :index
	end

	def show
		@list = List.find(params[:id])
	end

	def new
		@list = List.new
	end

	def create
		@list = List.new(list_params)
		@list.rank = 1
		@list.board_id = params[:board_id]
		if @list.save
			redirect_to board_list_url(params[:board_id], @list)
		else
			flash.now[:errors] = @list.errors.full_messages
			render :new
		end
	end

	private

	def list_params
		params.require(:list).permit(:title, :board_id, :rank)
	end
end
