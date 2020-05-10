const form = document.getElementById('form');
var calculateBtn = document.getElementById('calculate-btn');

var usernameFeedbackDiv = document.getElementById('username-feedback');
var loverNameFeedbackDiv = document.getElementById('lover-name-feedback');

var popupWindow = document.getElementById('popup-window');
var messageDiv = document.getElementById('message');
var smileyDiv = document.getElementById('smiley');
var formError;
var value;
form.addEventListener('submit', function (e) {
    e.preventDefault();
    // inputs
    var username = document.getElementById('username').value;
    var loverName = document.getElementById('lover-name').value;

    usernameFeedbackDiv.innerHTML = "";
    loverNameFeedbackDiv.innerHTML = "";
    // validation for user name
    validateUsername(username);
    // validation for lover name
    validateLoverName(loverName);

    if (formError == false) {
        openPopup();
        circle();
        setTimeout(function () {
            messageDiv.innerHTML = `${loverName} loves you ${value}%`;
        }, 1700);
        setTimeout(function () {
            smileyDiv.innerHTML = '<img src="smiley-love.png" alt=""></img>';
        }, 1900)
    } // end if 

    e.preventDefault();
});
closePopupWindow();

function closePopupWindow() {
    document.getElementById('close').addEventListener('click', function (e) {
        popupWindow.classList.remove('open');
        location.reload();
    });

}



// circle animation
function circle() {
    var bar = new ProgressBar.Circle(progress, {
        color: '#c70655',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 4,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: {
            color: '#700d23',
            width: 4
        },
        to: {
            color: '#c70655',
            width: 6
        },
        // Set default step function for all animate calls
        step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            value = Math.round(circle.value() * 100);

            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value);
            }

        }
    });

    bar.text.style.fontSize = '2.5rem';

    value = Math.floor(Math.random() * 11) / 10;
    bar.animate(value); // Number from 0.0 to 1.0
}


// open pop up
function openPopup() {
    popupWindow.classList.add('open');
}

// function to validate username
function validateUsername(username) {
    formError = false;
    if (username == "") {
        formError = true;
        usernameFeedbackDiv.innerHTML = '* Please enter your name';
    } else if (username.length <= 2) {
        usernameFeedbackDiv.innerHTML = '* Enter at least 3 characters';
        formError = true;
    } else if (!isNaN(username)) {
        usernameFeedbackDiv.innerHTML = '* Numbers are not allowed';
        formError = true;
    }

}
// function to validate lover name
function validateLoverName(loverName) {
    var formError = false;
    if (loverName == "") {
        loverNameFeedbackDiv.innerHTML = '* Please enter your lover name';
        formError = true;
    } else if (loverName.length <= 2) {
        loverNameFeedbackDiv.innerHTML = '* Enter at least 3 characters';
        formError = true;
    } else if (!isNaN(loverName)) {
        loverNameFeedbackDiv.innerHTML = '* Numbers are not allowed';
        formError = true;
    }
}