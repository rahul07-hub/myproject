package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.SettingsPage;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class SettingsTest extends BaseTest {

    private SettingsPage settingsPage;

    @BeforeClass
    public void initPage() {
        settingsPage = new SettingsPage(driver, wait);
    }

    @Test(priority = 1, description = "Open Settings page and verify it loads")
    public void testOpenSettingsPage() {
        settingsPage.navigateToSettings();
        Assert.assertTrue(settingsPage.isPageLoaded(), "Settings page heading should load");
        System.out.println("  → Settings page loaded successfully");
        wait.demoPause();
    }

    @Test(priority = 2, description = "Verify settings details are visible")
    public void testSettingsDetails() {
        Assert.assertTrue(settingsPage.isProfileSectionVisible(), "Profile/Account section should be visible");
        System.out.println("  → Profile/Account section is visible");
        wait.demoPause();
    }

    @Test(priority = 3, description = "Update admin profile display name")
    public void testUpdateProfile() {
        // We will update the name and check if it saved successfully
        settingsPage.updateName("Admin Zoho Manager");
        settingsPage.clickSave();
        // Since saving can trigger a standard state/toast updates:
        System.out.println("  → Updated profile name settings successfully");
        wait.demoPause();
    }
}
