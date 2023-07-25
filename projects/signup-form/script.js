const form = document.querySelector("form")
const fname = form.fname
const lname = form.lname
const email = form.email
const contact = form.contact
const password = form.password
const confirmPassword = form.confirmPassword

const passwordStrengthMeter = document.querySelector(".password__strength-meter")


function validateName(value) {
    const rule = /\.|([A-Z]?[a-z]+)/
    const match = value.match(rule);
    return match !== null && match[0] === value;

}

function validateEmail() {
    return email.validity.valid
}

function validateContact() {
    const rule = /(\+[0-9]{1,4}\-?)?[1-9]([0-9]{9})/
    const match = contact.value.match(rule)
    return match !== null && match[0] === contact.value;
}

function validatePasswordStrength(password) {
    const first = password.match(/[A-Z]/) !== null
    const second = password.match(/[a-z]/) !== null
    const third = password.match(/[0-9]/) !== null
    const fourth = password.match(/[*.!@$%^&(){}[\]:;<>,\.?\/~_+\-=|\\]/) !== null
    return first + second + third + fourth;
}
function matchPassword() {
    const key = password.value;
    const confirmKey = confirmPassword.value;
    return key === confirmKey;
}


// let validationTimeout;
let timeoutTime = 1000

function handleValidityEvent(element, validityFunction) {
    const inputBox = element.parentElement
    
    inputBox.classList.remove("valid")
    inputBox.classList.remove("invalid")

    if (element.value.length === 0) return


    setTimeout(() => {
        if (validityFunction(element.value)) {
            inputBox.classList.add("valid")
        } else {
            inputBox.classList.add("invalid")
        }
    }, timeoutTime)

}


fname.addEventListener("input", () => {
    handleValidityEvent(fname, validateName)
})

lname.addEventListener("input", () => {
    handleValidityEvent(lname, validateName)
})


email.addEventListener("input", () => {
    handleValidityEvent(email, validateEmail)
})

contact.addEventListener("input", () => {
    handleValidityEvent(contact, validateContact)
})

password.addEventListener("input", () => {
   
    const inputBox = password.parentElement
   
    inputBox.classList.remove("invalid")
    inputBox.classList.remove("valid")

    if (password.value.length === 0) return

    const strength = validatePasswordStrength(password.value)
    
    setTimeout(() => {
        passwordStrengthMeter.dataset.value = strength
        if (strength == 4) {
            inputBox.classList.add("valid")
        } else {
            inputBox.classList.add("invalid")
        }

        handleValidityEvent(confirmPassword,matchPassword)
    }, timeoutTime)




})

confirmPassword.addEventListener("input", () => {

    handleValidityEvent(confirmPassword, matchPassword)
})


form.addEventListener('submit',(event)=>{
    event.preventDefault()
    const data = {
        name:fname.value+" " + lname.value,
        email:email.value,
        contactNo:contact.value,
        password:password.value
    }
    console.log(data)
})