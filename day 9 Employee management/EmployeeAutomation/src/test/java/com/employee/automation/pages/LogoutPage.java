package com.employee.automation.pages;

import com.employee.automation.utils.WaitUtility;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LogoutPage {

    private final WebDriver driver;
    private final WaitUtility wait;

    // Sidebar logout button (aria-label="Logout")
    private final By logoutButton  = By.cssSelector("button[aria-label='Logout']");
    // After logout the login page shows "Welcome back"
    private final By loginPageText = By.xpath("//*[contains(text(),'Welcome back') or contains(text(),'Sign In') or contains(text(),'Login')]");

    public LogoutPage(WebDriver driver, WaitUtility wait) {
        this.driver = driver;
        this.wait   = wait;
    }

    public void clickLogout() {
        wait.safeNavigate(driver, logoutButton);   // re-use safeNavigate (closes modal + JS click)
        wait.demoPause();
    }

    public boolean isRedirectedToLoginPage() {
        try {
            wait.waitForVisible(loginPageText);
            return driver.getCurrentUrl().contains("/login");
        } catch (Exception e) {
            return false;
        }
    }
}
