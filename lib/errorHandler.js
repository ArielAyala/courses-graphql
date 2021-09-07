
function errorHandler(error) {
    console.error(error)
    throw new Error('Fallo en la operación en el servidor')
}

module.exports = errorHandler;