const mockingoose = require("mockingoose");


afterEach(() => {
    jest.clearAllMocks();
    mockingoose.resetAll();
});
