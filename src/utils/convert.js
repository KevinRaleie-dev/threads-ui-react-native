const convertToObj = (array) => {
    let value = {};
    array.forEach(({ field, message }) => {
        value[field] = message;
    });

    return value;
}

export {
    convertToObj
}