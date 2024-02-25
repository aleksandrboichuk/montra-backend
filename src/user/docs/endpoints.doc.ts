export const endpointsDoc = {
    profile: {
        responses: {
            ok: {
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            description: "User data",
                            type: "object",
                        },
                    },
                },
                description: "Token successfully refreshed"
            },
            unauthorized: {
                schema: {
                    type: 'object',
                    properties: {
                        message: {description: "Invalid token"}
                    },
                }
            }
        }
    }
}
