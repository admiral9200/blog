const playwright = require('playwright');

function randomUser() {
    return Math.random().toString().substr(2, 8);
}
function randomMail() {
    return Math.random().toString().substr(2, 8) + "@test.de";
}
function randomPassword() {
    return Math.random().toString().substr(2, 10);
}

test('Nutzer kann sich registrieren und anschließend einen Post erstellen', async () => {
    await page.goto('https://blog-staging.nailuj.net');
    await page.click("text=Register");
    await page.click("#username");
    let username = randomUser();
    await page.fill("#username", username);
    await page.click("#email");
    await page.fill("#email", randomMail());
    await page.press("#email", "Tab");
    let password = randomPassword()
    await page.fill("#password", password);
    await page.press("#password", "Tab");
    await page.fill("#passwordConf", password);
    await page.click('button:text("Register")');
    await page.click("a:text('Compose Post')");
    await page.fill("#title", "A Post Title");
    await page.press("#title", "Tab");
    await page.press('[placeholder="Image URL"]', "Tab");
    await page.click("#content");
    await page.fill("#content", "## Rules of Software Deployment\n1. Automate everything\n2. Deploy your Code\n3. Have a single source of truth");
    await page.press("#content", "Tab");
    await page.fill("#summary", "A Post about the unspoken Rules of Software Deployment");
    await page.click("button:text('Post')");
    await page.waitForTimeout(300);
    await page.waitForLoadState('networkidle');
    await page.goto('https://blog-staging.nailuj.net');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveText(".home", username);
}, 100000)

