export const endpointsDoc = {
    profile: {
        responses: {
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
