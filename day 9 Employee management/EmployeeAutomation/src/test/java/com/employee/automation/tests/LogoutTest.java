package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.LogoutPage;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class LogoutTest extends BaseTest {

    private LogoutPage logoutPage;

    @BeforeClass
    public void initPage() {
        logoutPage = new LogoutPage(driver, wait);
    }

    @Test(priority = 1, description = "Perform Logout action and verify redirection to login page")
    public void testLogout() {
        logoutPage.clickLogout();
        Assert.assertTrue(logoutPage.isRedirectedToLoginPage(),
                "Should navigate back to login page after clicking logout");
        System.out.println("  → Logged out successfully and redirected to login page");
        wait.demoPause();
    }
}
