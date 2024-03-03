export const endpointsDoc = {
    responses: {
        unauthorized: {
            description: "Bearer token expired"
        }
    },
    remove: {
        responses: {
            ok: {
                schema: {
                    properties: {
                        data: {
                            properties: {
                                result: {
                                    type: "boolean"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
