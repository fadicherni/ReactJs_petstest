const baseUrl = "https://petstore.swagger.io/v2";

const PET_URLS = {
    getPetsByStatus: (status= 'available') =>  `${baseUrl}/pet/findByStatus?status=${status}`,
    deletePet: (id) =>  `${baseUrl}/pet/${id}`,
    addPet: `${baseUrl}/pet`,
};
export {
    baseUrl,
    PET_URLS,
};

