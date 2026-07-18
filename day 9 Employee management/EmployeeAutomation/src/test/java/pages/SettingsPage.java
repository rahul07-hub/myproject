package pages;

import utils.WaitUtility;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class SettingsPage {

    private final WebDriver driver;
    private final WaitUtility wait;

    private final By settingsNavLink = By.cssSelector("a[href='/settings']");
    private final By pageHeading     = By.xpath("//h1[contains(text(),'Settings') or contains(text(),'Profile')]");
    private final By nameInput       = By.cssSelector("input[name='name'], input[placeholder*='name' i]");
    private final By saveButton      = By.xpath("//button[contains(.,'Save') or contains(.,'Update')]");
    private final By profileSection  = By.xpath("//*[contains(text(),'Profile') or contains(text(),'Account') or contains(text(),'Settings')]");

    public SettingsPage(WebDriver driver, WaitUtility wait) {
        this.driver = driver;
        this.wait   = wait;
    }

    public void navigateToSettings() {
        try {
            WebElement link = wait.waitForClickable(settingsNavLink);
            try {
                link.click();
            } catch (Exception e) {
                ((JavascriptExecutor) driver).executeScript("arguments[0].click();", link);
            }
        } catch (Exception e) {
            driver.get("http://localhost:5173/settings");
        }
        wait.demoPause();
    }

    public boolean isPageLoaded() {
        try {
            wait.waitForVisible(pageHeading);
            return true;
        } catch (Exception e) {
            return driver.getCurrentUrl().contains("/settings");
        }
    }

    public boolean isProfileSectionVisible() {
        try {
            return wait.waitForVisible(profileSection).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public void updateName(String newName) {
        try {
            WebElement el = wait.waitForVisible(nameInput);
            el.clear();
            el.sendKeys(newName);
            wait.demoPause();
        } catch (Exception e) {
            System.out.println("[SETTINGS] Name field not found: " + e.getMessage());
        }
    }

    public void clickSave() {
        try {
            wait.waitForClickable(saveButton).click();
            wait.demoPause();
        } catch (Exception e) {
            System.out.println("[SETTINGS] Save button not found: " + e.getMessage());
        }
    }
}
