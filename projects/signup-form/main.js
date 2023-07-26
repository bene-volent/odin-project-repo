const formShow = document.querySelector(".banner-formButton")


const signSection = document.querySelector(".signup")
const formSection = document.querySelector('.main')

const form = document.querySelector("form.form")
const formName = form.name;
const formEmail = form.email;

const formPassword = form.password;
const passwordHints = document.querySelectorAll(".password-hint")
const formConfirmPass = form.confirmPassword;

const formSubmit = document.querySelector(".form-submit")

function validateName() {
    return formName.checkValidity();
}

function validateEmail() {
    return formEmail.checkValidity();
}
function validatePassword() {
    const value = formPassword.value;
    let mask = 0;

    passwordHints.forEach(hint => {
        hint.removeAttribute("data-active")
    })

    if (value.length >= 8) {
        passwordHints[0].toggleAttribute("data-active")
        mask |= 1
    }

    if (value.match(/[A-Z]/)) {
        passwordHints[1].toggleAttribute("data-active")
        mask |= 2
    }

    if (value.match(/[a-z]/)) {
        passwordHints[2].toggleAttribute("data-active")
        mask |= 4
    }

    if (value.match(/[0-9]/)) {
        passwordHints[3].toggleAttribute("data-active")
        mask |= 8
    }
    if (value.match(/[#?!@$%^&*-]/)) {
        passwordHints[4].toggleAttribute("data-active")
        mask |= 16
    }

    const valid = matchPassword()




    if (formConfirmPass.value.length === 0) {
        formConfirmPass.classList.remove("invalid")
        formConfirmPass.classList.remove("valid")

    }
    else {
        setTimeout(() => {
            if (valid) {
                formConfirmPass.classList.remove("invalid")
                formConfirmPass.classList.add("valid")
            }
            else {
                formConfirmPass.classList.remove("valid")
                formConfirmPass.classList.add('invalid')
            }
        }, 350)
    }


    return mask === 31
}

function matchPassword() {
    return formPassword.value === formConfirmPass.value
}

function specialConfirmPassword() {

}

formShow.addEventListener("click", () => {
    signSection.dataset.mobileFormActive = true;

    formSection.classList.add("half-active")

    setTimeout(() => {
        formSection.classList.remove("half-active")
    })
})

function addInputListener(element, validationFunction) {
    element.addEventListener("input", () => {

        const valid = validationFunction()




        if (element.value.length === 0) {
            element.classList.remove("invalid")
            element.classList.remove("valid")
            return
        }

        setTimeout(() => {
            if (valid) {
                element.classList.remove("invalid")
                element.classList.add("valid")
            }
            else {
                element.classList.remove("valid")
                element.classList.add('invalid')
            }
        }, 350)
    })
}




form.addEventListener("submit", (event) => {
    event.preventDefault()
    const validSubmission = validatePassword() && validateEmail() && validateName() && matchPassword()
    formSubmit.dataset.submitted = validSubmission;
    data =
        { name: formName.value, email: formEmail.value, password: formPassword.value }

})

addInputListener(formName, validateName)
addInputListener(formEmail, validateEmail)
addInputListener(formPassword, validatePassword)
addInputListener(formConfirmPass, matchPassword)