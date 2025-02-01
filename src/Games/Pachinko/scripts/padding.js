const DECIMAL_MULTIPLIER = 10000;

const pad = (n) => {
    return n * DECIMAL_MULTIPLIER;
}

const unpad = (n) => {
    return Math.floor(n / DECIMAL_MULTIPLIER);
}

module.exports = {
    DECIMAL_MULTIPLIER,
    pad,
    unpad
};
