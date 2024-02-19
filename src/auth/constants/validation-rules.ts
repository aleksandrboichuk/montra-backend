export const validationRules = {
    name: {
        minLength: 2,
        maxLength: 50
    },
    password: {
        minLength: 6,
        maxLength: 100
    },
    email: {
        minLength: 5,
        maxLength: 50,
        regexp: "/^[^\\\\d!@#$%^&*()_+{}\\\\[\\\\]:;<>,.?~\\\\\\\\/-]+$/"
    }
}