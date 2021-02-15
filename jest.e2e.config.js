module.exports = {
    preset: "jest-playwright-preset",
    testPathIgnorePatterns: [
        "/app/",
        "/__tests__/"
    ],
    "setupFilesAfterEnv": ["expect-playwright"],
    testEnvironmentOptions: {
        'jest-playwright': {
            browsers: ['chromium', 'firefox', 'webkit']
        },
    }
}