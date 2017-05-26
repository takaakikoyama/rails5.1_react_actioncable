class RoomsController < ApplicationController
  def show
    respond_to do |format|
      format.json { render json: Message.all }
      format.html {}
    end
  end
end
