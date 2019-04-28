/*
* Main JS Object for the whole application.
*/


/*Definition of main function to re-use for contact*/
function SurfSiteApp() {

	/*
	* Global parameters reused in the app
	*/
	this.EMAIL_REGEXP = new RegExp("^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
	this.NAME_REGEXP = new RegExp("(?:^[A-Z][\\'\\-A-Za-z\\.\\s]+\\w$)");
	this.CONTACT_ERROR_DIV_ID = "contactErrorMessage";
	this.CONTACT_SUCCESS_DIV_ID = "contactSuccessMessage";

	//0.85sec
	this.TRANSITION_MILLISEC = 850;

	//0.075sec
	this.DISPLAY_DELAY_MILLISEC = 75;

	//4sec
	this.SUCCESS_MESSAGE_HIDE_MILLISEC = 4000;

	//0.5sec
	this.VALIDATION_DELAY = 760;

	this.INPUT_ERROR_CLASS = "inputError";

	this.navigatePageTo = function(page) {

	}

	this.addInputErrorStyle = function(e) {
		if (!e.classList.contains(this.INPUT_ERROR_CLASS)) {
			e.classList.add(this.INPUT_ERROR_CLASS);
		}
	};

	this.removeInputErrorStyle = function(e) {
		if (e.classList.contains(this.INPUT_ERROR_CLASS)) {
			e.classList.remove(this.INPUT_ERROR_CLASS);
		}
	};
}

var surfSiteApp = new SurfSiteApp();


/*
Contact Form specific Java Script
*/

surfSiteApp.contactNameValid = null;
surfSiteApp.contactEmailValid = null;
surfSiteApp.contactMessageValid = null;
surfSiteApp.contactNameTimeout = null;
surfSiteApp.contactEmailTimeout = null;
surfSiteApp.contactMessageTimeout = null;

surfSiteApp.submitContactForm = function() {

	if (!this.validateContactName() || !this.validateContactEmail() || !this.validateContactMessage()) {
		return;
	}

	//if there is no error
	this.hideErrorMessage();
	this.displaySuccessMessage("Thank you for your message. We will get back to you as soon as possible.");
	this.clearContactForm();
	window.scrollTo(0, 0);
};

surfSiteApp.validateContactName = function() {

	var nameInput = document.contactForm.name;
	var name = nameInput.value;

	if (name == undefined || name == null || name == "") {

		this.displayErrorMessage("Entering name is mandatory");
		this.addInputErrorStyle(nameInput);
		return false;

	} else {

		if (!this.NAME_REGEXP.test(name)) {

			this.displayErrorMessage("Please enter valid name");
			this.addInputErrorStyle(nameInput);
			return false;

		} else {

			this.removeInputErrorStyle(nameInput);
			return true;
		}
	}
};

surfSiteApp.formReqNameValidation = function() {

	var this_ = this;
	clearTimeout(this.contactNameTimeout);

	this.contactNameTimeout = setTimeout(function() {

        this_.contactNameValid = this_.validateContactName();

		if (this_.contactNameValid && (this_.contactEmailValid === null || this_.contactEmailValid === true)
			&& (this_.contactMessageValid === null || this_.contactMessageValid === true)) {

			this_.hideErrorMessage();

		} else if (this_.contactNameValid && this_.contactEmailValid === false) {

			this_.validateContactEmail();

		} else if (this_.contactNameValid && this_.contactMessageValid === false) {

			this_.validateContactMessage();
		}
    }, this.VALIDATION_DELAY);
};

surfSiteApp.validateContactEmail = function() {

	var emailInput = document.contactForm.email;
	var email = emailInput.value;

	if (email == undefined || email == null || email == "") {

		this.displayErrorMessage("Entering email is mandatory");
		this.addInputErrorStyle(emailInput);
		return false;

	} else {

		if (!this.EMAIL_REGEXP.test(email)) {

			this.displayErrorMessage("Please enter valid email");
			this.addInputErrorStyle(emailInput);
			return false;

		} else {

			this.removeInputErrorStyle(emailInput);
			return true;
		}
	}
};

surfSiteApp.formReqEmailValidation = function() {

	var this_ = this;
	clearTimeout(this.contactEmailTimeout);

	this.contactEmailTimeout = setTimeout(function() {

		this_.contactEmailValid = this_.validateContactEmail();

		if (this_.contactEmailValid && (this_.contactNameValid === null || this_.contactNameValid === true)
			&& (this_.contactMessageValid === null || this_.contactMessageValid === true)) {

			this_.hideErrorMessage();

		} else if (this_.contactEmailValid && this_.contactNameValid === false) {

			this_.validateContactName();

		} else if (this_.contactEmailValid && this_.contactMessageValid === false) {

			this_.validateContactMessage();
		}

	}, this.VALIDATION_DELAY);
};

surfSiteApp.validateContactMessage = function() {

	var textInput = document.contactForm.text;
	var text = textInput.value;

	if (text == "" || text == undefined || text == null) {

		this.displayErrorMessage("Entering message is mandatory");
		this.addInputErrorStyle(textInput);
		return false;

	} else {

		this.removeInputErrorStyle(textInput);
		return true;
	}
};

surfSiteApp.formReqMessageValidation = function() {

	var this_ = this;
	clearTimeout(this.contactMessageTimeout);

	this.contactMessageTimeout = setTimeout(function() {

	this_.contactMessageValid = this_.validateContactMessage();

		if (this_.contactMessageValid && (this_.contactNameValid === null || this_.contactNameValid === true)
			&& (this_.contactEmailValid === null || this_.contactEmailValid === true)) {

			this_.hideErrorMessage();

		} else if (this_.contactMessageValid && this_.contactNameValid === false) {

			this_.validateContactName();

		} else if (this_.contactMessageValid && this_.contactEmailValid === false) {

			this_.validateContactEmail();
		}
	}, this.VALIDATION_DELAY);
};

surfSiteApp.displayErrorMessage = function(message) {

	var errorMessageDiv = this.findErrorMessageDiv();
	errorMessageDiv.style.display = 'block';
	setTimeout(function() {
		errorMessageDiv.style.opacity = 1;
	}, this.DISPLAY_DELAY_MILLISEC);
	errorMessageDiv.innerHTML = message;
};

surfSiteApp.hideErrorMessage = function() {

	var errorMessageDiv = this.findErrorMessageDiv();
	errorMessageDiv.style.opacity = 0;
	setTimeout(function() {
		errorMessageDiv.innerHTML = "";
		errorMessageDiv.style.display = 'none';
	}, this.TRANSITION_MILLISEC);
};

surfSiteApp.displaySuccessMessage = function(message) {

	var successMessageDiv = this.findSuccessMessageDiv();
	successMessageDiv.style.display = 'block';
	successMessageDiv.innerHTML = message;
	setTimeout(function() {
		successMessageDiv.style.opacity = 1;
	}, this.DISPLAY_DELAY_MILLISEC);

	/*
	* Javascript engine will create a new Execution context
	* when we call the setTimeout below, so we need to pass
	* a reference to this.
	*/
	var this_ = this;
	setTimeout(function() {
		this_.hideSuccessMessage();
	}, this.SUCCESS_MESSAGE_HIDE_MILLISEC);
};

surfSiteApp.hideSuccessMessage = function() {

	var successMessageDiv = this.findSuccessMessageDiv();
	successMessageDiv.style.opacity = 0;
	setTimeout(function() {
		successMessageDiv.innerHTML = "";
		successMessageDiv.style.display = 'none';
	}, this.TRANSITION_MILLISEC);
};

surfSiteApp.findErrorMessageDiv = function() {
	return document.getElementById(this.CONTACT_ERROR_DIV_ID);
};

surfSiteApp.findSuccessMessageDiv = function() {
	return document.getElementById(this.CONTACT_SUCCESS_DIV_ID);
};

surfSiteApp.clearContactForm = function() {
	document.contactForm.name.value = "";
	document.contactForm.email.value = "";
	document.contactForm.text.value = "";
};

