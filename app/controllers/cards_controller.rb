class CardsController < ApplicationController
	def index
		@cards = List.find(params[:list_id]).cards
		render :index
	end

	def show
		@card = Card.find(params[:id])
	end

	def new		
		@card = Card.new
	end

	def create
		@card = List.find(params[:list_id]).cards.new(card_params)
		@card.rank = 1
		if @card.save
			redirect_to list_card_url(params[:list_id], @card)
		else
			flash.now[:errors] = @card.errors.full_messages
			render :new
		end
	end


	private

	def card_params
		params.require(:card).permit(:title, :description, :list_id, :rank)
	end
end
