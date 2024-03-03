export const endpointsDoc = {
    forgotPassword: {
        responses: {
            ok: {
                schema: {
                    type: 'object',
                    properties: {
                        success: {description: "Letter sending result", type: "boolean"},
                    },
                }, description: "Letter with reset link was sent"
            },
            badRequest: {
                schema: {
                    type: 'object',
                    properties: {
                        message: {description: "User not found"}
                    },
                }
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
    validateCode: {
        responses: {
            ok: {
                schema: {
                    type: 'object',
                    properties: {
                        userId: {description: "User Id", type: "string"},
                    },
                }, description: "Code is valid"
            },
            badRequest: {
                schema: {
                    type: 'object',
                    properties: {
                        message: {description: "Code is invalid"}
                    },
                }
            }
        }
    },
    resetPassword: {
        responses: {
            ok: {
                schema: {
                    type: 'object',
                    properties: {
                        success: {description: "Password was reset", type: "boolean"},
                    },
                }, description: "Code is valid"
            },
            badRequest: {
                schema: {
                    type: 'object',
                    properties: {
                        message: {description: "Code is invalid or expired"}
                    },
                }
            }
        }
    }
}
