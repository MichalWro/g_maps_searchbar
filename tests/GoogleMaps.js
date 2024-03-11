import Locators from './Locators';
import { expect } from '@playwright/test';



class MapsPage {
    constructor(page) {
      this.page = page;
      this.locators = new Locators(page);
    }
  
    async goToMaps() {
        // Navigate to the Google Maps website
        await this.page.goto(this.locators.url);

        // Handle consent modal if it appears
        const acceptButton = this.locators.acceptAllButton;
        if (acceptButton.isVisible()) {
        await acceptButton.click();
        } 
        else {
            console.log("Accept click was not necessary");
        }
    }
    
    async isMapLoaded() {
        const searchBoxInput = this.locators.searchBoxInput;
        await searchBoxInput.isVisible();
    }

    async isMapLoadedTitleCheck() {
        const pageTitle = await this.page.title();
        return expect(pageTitle).toContain(this.locators.pageTitle);
    }

    async fillSearchBox(cityName) {
        await this.page.fill(this.locators.searchBoxInputString, cityName);
    }

    async clickRouteButton() {
        const routeButton = this.locators.directionsButton;
        await routeButton.click();
    }

    async clickSearchButton() {
        const searchButton = this.locators.searchButtonString;
        await searchButton.click();
    }
  }
  
  export default MapsPage;