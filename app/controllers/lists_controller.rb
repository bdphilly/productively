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
		@list = Board.find(params[:board_id]).lists.new(list_params)
		@list.rank = 1
		if @list.save
			redirect_to board_list_url(params[:board_id], @list)
		else
			flash.now[:errors] = @list.errors.full_messages
			render :new
		end
	end

	def edit
		@list = List.find(params[:id])
	end

	def update
		@list = List.find(params[:id])

		if @list.update_attributes(list_params)
			redirect_to board_list_url(@list.board_id, @list)
		else
			flash.now[:errors] = @list.errors.full_messages
			render :edit
		end
	end

	private

	def list_params
		params.require(:list).permit(:title, :board_id, :rank)
	end
end