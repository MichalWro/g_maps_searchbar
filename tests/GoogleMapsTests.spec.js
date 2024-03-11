import { test, expect } from '@playwright/test';
import Locators from './Locators';
import MapsPage from './GoogleMaps';



test.describe('Google Maps Suite', () => {
    test('Smoke Maps test', async ({ page }) => {
        const mapPage = new MapsPage(page);
        const locatorsFromFile = new Locators(page);
        await mapPage.goToMaps();
        await mapPage.isMapLoaded();
        await mapPage.isMapLoadedTitleCheck()

        // Assertion: Check if a specific element is present on the page
        const isElementPresent = locatorsFromFile.searchBoxInput;
        expect(isElementPresent).toBeTruthy();

        await page.screenshot({ path: './screenshots/maps.png' });
    });

  test('Paris Search', async ({ page }) => {

    const mapPage = new MapsPage(page);
    const locatorsFromFile = new Locators(page);
    await mapPage.goToMaps();
    await mapPage.isMapLoaded();
    await mapPage.isMapLoadedTitleCheck()

    // Fill the search box with "Paris" and click the search button
    await mapPage.fillSearchBox(locatorsFromFile.cityParis);
    await mapPage.clickSearchButton();

    // Assert that the search result for Paris is visible
    await expect(page.waitForSelector('h1', { state: 'visible' })).resolves.toBeTruthy();

    // Assert that the heading text is "Paryż"
    const headingText = await page.textContent('h1');
    expect(headingText).toContain(locatorsFromFile.cityParis);

    // Take a screenshot
    await page.screenshot({ path: './screenshots/paris.png' });
  });
  
  test('London Route', async ({ page }) => {

    const mapPage = new MapsPage(page);
    const locatorsFromFile = new Locators(page);
    await mapPage.goToMaps();
    await mapPage.isMapLoaded();
    await mapPage.isMapLoadedTitleCheck()

    // Fill the search box with "London" and click the search button
    await mapPage.fillSearchBox(locatorsFromFile.cityLondon);
    await mapPage.clickSearchButton();

    // Assert that the search result for "London" is visible
    await expect(locatorsFromFile.headerFromSidePanelVisibilityWait).resolves.toBeTruthy();

    // Assert that the heading text is "London"
    const headingText = await page.textContent('h1');
    expect(headingText).toContain(locatorsFromFile.cityLondon);
    // Click Route button
    await mapPage.clickRouteButton();

    // Verify that in direction box "Londyn" is still typed
    const directionBox = locatorsFromFile.directionsInputBox;
    const inputValue = await directionBox.inputValue();
    expect(inputValue).toContain(locatorsFromFile.cityLondon);

    // Take a screenshot
    await page.screenshot({ path: './screenshots/londyn.png' });
  });
  
  test('Direction Means counter', async ({ page }) => {

    const mapPage = new MapsPage(page);
    const locatorsFromFile = new Locators(page);
    await mapPage.goToMaps();
    await mapPage.isMapLoaded();
    await mapPage.isMapLoadedTitleCheck()

    // Fill the search box with "London" and click the search button
    await mapPage.fillSearchBox(locatorsFromFile.cityLondon);
    await mapPage.clickSearchButton();

    // Assert that the search result for "London" is visible
    await expect(locatorsFromFile.headerFromSidePanelVisibilityWait).resolves.toBeTruthy();

    // Assert that the heading text is "London"
    const headingText = await locatorsFromFile.headerFromSidePanel;
    expect(headingText).toContain(locatorsFromFile.cityLondon);
    // Click Route button
    await mapPage.clickRouteButton();

    // Count Route options and verify that there are exactly 6 of them
    const directionPage = locatorsFromFile.directionsWidgetVisible;
    await expect(directionPage).toBeVisible({ timeout: 10000 });
    const directionBox = locatorsFromFile.directionsWidgetOptions;
    expect(directionBox).toHaveCount(6);

    // Take a screenshot
    await page.screenshot({ path: './screenshots/counter.png' });
  });
});
