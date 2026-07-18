package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.config.ConfigReader;
import com.employee.automation.pages.LoginPage;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class LoginTest extends BaseTest {

    private LoginPage loginPage;

    @BeforeClass
    public void initPage() {
        loginPage = new LoginPage(driver, wait);
    }

    @Test(priority = 1, description = "Verify Login page is displayed")
    public void verifyLoginPageDisplayed() {
        Assert.assertTrue(loginPage.isLoginPageDisplayed(),
                "Login page should be displayed with email and password fields");
        System.out.println("  → Login page loaded successfully");
        wait.demoPause();
    }

    @Test(priority = 2, description = "Login with valid admin credentials")
    public void loginWithValidCredentials() {
        loginPage.login(ConfigReader.ADMIN_EMAIL, ConfigReader.ADMIN_PASSWORD);

        // After login, URL should not contain /login
        String currentUrl = driver.getCurrentUrl();
        Assert.assertFalse(currentUrl.contains("/login"),
                "Should be redirected away from login page after successful login");
        System.out.println("  → Login successful, redirected to: " + currentUrl);
        wait.demoPause();
    }
}
