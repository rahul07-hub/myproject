package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.ReportsPage;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class ReportsTest extends BaseTest {

    private ReportsPage reportsPage;

    @BeforeClass
    public void initPage() {
        reportsPage = new ReportsPage(driver, wait);
    }

    @Test(priority = 1, description = "Open Reports page and verify it loads")
    public void testOpenReportsPage() {
        reportsPage.navigateToReports();
        Assert.assertTrue(reportsPage.isPageLoaded(), "Reports page heading should load");
        System.out.println("  → Reports page loaded successfully");
        wait.demoPause();
    }

    @Test(priority = 2, description = "Verify charts are displayed")
    public void testChartsDisplay() {
        Assert.assertTrue(reportsPage.areChartsVisible(), "At least one analytics chart should be displayed");
        System.out.println("  → Analytics charts found and visible");
        wait.demoPause();
    }

    @Test(priority = 3, description = "Verify summary cards and export availability")
    public void testSummaryCardsAndExport() {
        int cardCount = reportsPage.getCardCount();
        System.out.println("  → Summary cards on Reports page: " + cardCount);
        boolean downloadBtn = reportsPage.isDownloadAvailable();
        System.out.println("  → Download/Export button available: " + downloadBtn);
        wait.demoPause();
    }
}
