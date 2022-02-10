// import 'expect-puppeteer';
/* global page */
const baseUrl = 'https://modest-noyce-77df12.netlify.app/';

describe('app navigation', () => {
  // beforeEach(async () => {
  //   await page.goto();
  // });

  it('should show the home page message', async () => {
    await page.goto(`${baseUrl}/`);

    await page.waitForNetworkIdle();

    // Get an element containing some text using XPath
    const [firstNameInput] = await page.$x(
      '//label[contains(text(), "First name")]//input',
    );

    await firstNameInput.type('Karl');

    // await page.waitForTimeout(5000);

    // TODO: This is where you would add the following:
    // 1. Add the last name text (like above)
    // 2. Click on the "Add Guest" button (like in the other test file)
    // 3. Check the page for the guest text (like in the other file)
  });

  // it('should show the home page message', async () => {
  //   await expect(page).toMatch('Option 1.0');
  // });

  // afterAll(async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   await page.close();
  //   await browser.close();
  // });
});
