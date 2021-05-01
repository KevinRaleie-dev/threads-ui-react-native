export const initialValues = {
    email: '', 
    username: '', 
    password: ''
};

const landingImagesArray = [
    "https://images.unsplash.com/photo-1508216310976-c518daae0cdc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3RyZWV0d2VhcnxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1588117260148-b47818741c74?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyZWV0d2VhcnxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1612115819136-51296f55dffd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0cmVldHdlYXJ8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1520014321782-49b0fe958b59?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3RyZWV0d2VhcnxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHN0cmVldHdlYXJ8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1558715037-450df9fd23bf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHN0cmVldHdlYXJ8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1508970566-7e0cca18e5d7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHN0cmVldHdlYXJ8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1533182821538-a4b8e21a1c6c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHN0cmVldHdlYXJ8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
];

export const randomImage = landingImagesArray[Math.floor(Math.random() * landingImagesArray.length)];