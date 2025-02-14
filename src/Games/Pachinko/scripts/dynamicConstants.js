const dynamicConstants = {
    canvasWidth: 800,
    canvasHeight: 600,
    updateDimensions({ width, height }) {
        this.canvasWidth = width;
        this.canvasHeight = height;
    },
};

export default dynamicConstants;
