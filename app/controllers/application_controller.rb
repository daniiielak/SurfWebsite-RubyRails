class ApplicationController < ActionController::Base
    
  protect_from_forgery prepend: true, with: :exception  

  skip_before_action :verify_authenticity_token, if: -> { controller_name == 'sessions' && action_name == 'create' }
  skip_before_action :verify_authenticity_token, if: -> { controller_name == 'sessions' && action_name == 'destroy' }
  skip_before_action :verify_authenticity_token, if: -> { controller_name == 'registrations' && action_name == 'create' }
  skip_before_action :verify_authenticity_token, if: -> { controller_name == 'ActionController' && action_name == 'create' }
    skip_before_action :verify_authenticity_token, if: -> { controller_name == 'users' && action_name == 'destroy' }

end
