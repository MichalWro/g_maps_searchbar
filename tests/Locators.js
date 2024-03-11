class Locators {
    constructor(page) {
      this.page = page;
    }
  
    get url() {
        return 'https://www.google.com/maps?hl=en';
    }
  
    get acceptAllButton() {
        return this.page.getByLabel('Accept all').first();
    }
  
    get searchBoxInput() {
        return this.page.locator('#searchboxinput');
    }
    
    get searchBoxInputString() {
        return '#searchboxinput';
    }
    
    get pageTitle() {
        const title = 'Google Maps';
        return title;
    }

    get cityParis() {
        return 'Paris';
    }

    get cityLondon() {
        return 'London';
    }

    get searchButtonString() {
        return this.page.locator('#searchbox-searchbutton');
    }

    get directionsButton() {
        return this.page.locator('[data-value="Directions"]')
        ;
    }
    
    get directionsInputBox() {
        return this.page.locator('#directions-searchbox-1> div > div > input')
        ;
    }

    get directionsWidgetVisible() {
        return this.page.locator('.widget-directions > div > div:nth-child(2) > div > div > div');
        ;
    }
    
    get directionsWidgetOptions() {
        return this.page.locator('.widget-directions > div > div:nth-child(2) > div > div > div > div');
        ;
    }

    get headerFromSidePanel() {
        return this.page.textContent('h1');
    }

    get headerFromSidePanelVisibilityWait() {
        return this.page.waitForSelector('h1', { state: 'visible' });
    }

  }
  
  export default Locators;