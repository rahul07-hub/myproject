package pages;

import utils.WaitUtility;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class LoginPage {

    private final WebDriver driver;
    private final WaitUtility wait;

    // Locators
    private final By emailInput    = By.cssSelector("input[type='email']");
    private final By passwordInput = By.cssSelector("input[type='password']");
    private final By submitButton  = By.cssSelector("button[type='submit']");
    private final By welcomeText   = By.xpath("//*[contains(text(),'Welcome back')]");
    private final By errorMessage  = By.cssSelector(".status-badge.absent");

    public LoginPage(WebDriver driver, WaitUtility wait) {
        this.driver = driver;
        this.wait   = wait;
    }

    public boolean isLoginPageDisplayed() {
        return driver.getCurrentUrl().contains("/login");
    }

    public void enterEmail(String email) {
        WebElement el = wait.waitForVisible(emailInput);
        el.clear();
        el.sendKeys(email);
    }

    public void enterPassword(String password) {
        WebElement el = wait.waitForVisible(passwordInput);
        el.clear();
        el.sendKeys(password);
    }

    public void clickSignIn() {
        wait.waitForClickable(submitButton).click();
    }

    public void login(String email, String password) {
        enterEmail(email);
        enterPassword(password);
        wait.demoPause();
        clickSignIn();
        wait.demoPause();
    }

    public boolean isErrorDisplayed() {
        try {
            return wait.waitForVisible(errorMessage).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getWelcomeText() {
        return wait.waitForVisible(welcomeText).getText();
    }
}
