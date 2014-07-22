module Api
  class ApiController < ApplicationController
    before_filter :ensure_signed_in!
  end
end