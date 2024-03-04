export const endpointsDoc = {
    register: {
        responses: {
            ok: {
                schema: {
                    type: 'object',
                    properties: {
                        data: {description: "User item body", type: "boolean"},
                    },
                },
                description: "User successfully registered and logged in"
            },
            badRequest: {
                schema: {
                    type: 'object',
                    properties: {
                        message: {description: "Validation errorMessages", type: "object"},
                    },
                },
                description: "Request body validation errorMessages"
            }
        },
        body: {
            schema: {
                type: 'object',
                properties: {
                    name: {description: "User name", example: "John"},
                    email: {description: "User email", example: "test@montra.com"},
                    password: {description: "User passwords", example: "12345qwerty"},
                },
            },
        }
    },
    login: {
        responses: {
            badRequest: {
                schema: {
                    type: 'object',
                    properties: {
                        message: {description: "Authentication errorMessages"}
                    },
                }
            }
        },
        body: {
            schema: {
                type: 'object',
                properties: {
                    email: {description: "User Email", example: "test@montra.com"},
                    password: {description: "User Password", example: "12345qwerty"},
                },
            },
        }
    },
    refreshToken: {
        responses: {
            badRequest: {
                schema: {
                    type: 'object',
                    properties: {
                        message: {description: "Invalid token"}
                    },
                }
            }
        }
    },
    verifyEmail: {
        responses: {
            badRequest: {
                schema: {
                    type: 'object',
                    properties: {
                        message: {description: "Verification code error message", type: "object"},
                    },
                }
            }
        },
        body: {
            schema: {
                type: 'object',
                properties: {
                    code: {description: "Verification code", example: "123456"},
                },
            },
        }
    },
    sendEmailVerificationLetter: {
        responses: {
            ok: {
                schema: {
                    type: 'object',
                    properties: {
                        success: {description: "Sending result", type: "boolean"},
                    },
                },
                description: "User successfully registered and logged in"
            },
            badRequest: {
                schema: {
                    type: 'object',
                    properties: {
                        message: {description: "Verification code errorMessages", type: "object"},
                    },
                },
                description: "Request body validation errorMessages"
            }
        },
        body: {
            schema: {
                type: 'object',
                properties: {
                    userId: {description: "User Id", example: "uuid123", type: "numeric"},
                },
            },
        }
    }
}
