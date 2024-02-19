export const errors = {
    name: {
        minLength: "nameMinValue",
        maxLength: "nameMaxValue"
    },
    password: {
        minLength: "passwordMinLength",
        maxLength: "passwordMaxLength"
    },
    email: {
        alreadyExists: "userWithThisEmailAlreadyExists",
        format: "emailInvalid"
    },
    code: {
        incorrect: "codeIsIncorrect"
    },
    login: {
        incorrectCredentials: "incorrectCredentials",
        emailIsNotVerified: "emailIsNotVerified"
    }
}