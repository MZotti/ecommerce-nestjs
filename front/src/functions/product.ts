const getStockColor = (stock: number) => {
    if (stock === 0) {
        return "red";
    } else if (stock <= 10) {
        return "yellow"
    } else {
        return "green"
    }
}

export {
    getStockColor
}