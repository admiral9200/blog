module.exports = {
    preset: "jest-playwright-preset",
    testPathIgnorePatterns: [
        "/app/",
        "/__tests__/"
    ],
    "setupFilesAfterEnv": ["expect-playwright"],
    testEnvironmentOptions: {
        'jest-playwright': {
            launchOptions: {
                headless: true
            },
            browsers: ['chromium', 'firefox']
        },
    }
}