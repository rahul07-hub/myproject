package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.DesignationPage;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class DesignationTest extends BaseTest {

    private DesignationPage designationPage;

    @BeforeClass
    public void initPage() {
        designationPage = new DesignationPage(driver, wait);
    }

    @Test(priority = 1, description = "Open Designation Directory (Employee List) and verify load")
    public void testOpenDesignationPage() {
        designationPage.navigateToDesignations();
        Assert.assertTrue(designationPage.isPageLoaded(), "Page should load with search capabilities");
        System.out.println("  → Designation directory opened successfully");
        wait.demoPause();
    }

    @Test(priority = 2, description = "Search and verify designations are populated in the directory")
    public void testVerifyDesignations() {
        designationPage.searchDesignation("Software Engineer");
        Assert.assertTrue(designationPage.isDesignationVisibleInList("Software Engineer"),
                "Designation 'Software Engineer' should be visible in search results");
        System.out.println("  → Verified designation: Software Engineer");
        wait.demoPause();
    }
}
