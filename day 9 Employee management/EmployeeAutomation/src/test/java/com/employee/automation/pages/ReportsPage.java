package com.employee.automation.pages;

import com.employee.automation.utils.WaitUtility;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class ReportsPage {

    private final WebDriver driver;
    private final WaitUtility wait;

    private final By reportsNavLink = By.cssSelector("a[href='/reports']");
    private final By pageHeading    = By.xpath("//h1[contains(text(),'Reports') or contains(text(),'Analytics')]");
    private final By charts         = By.cssSelector(".recharts-responsive-container, .recharts-wrapper");
    private final By metricCards    = By.cssSelector(".metric-card, .card");
    private final By downloadBtn    = By.xpath("//button[contains(.,'Download') or contains(.,'Export')]");

    public ReportsPage(WebDriver driver, WaitUtility wait) {
        this.driver = driver;
        this.wait   = wait;
    }

    public void navigateToReports() {
        wait.safeNavigate(driver, reportsNavLink);
        wait.demoPause();
    }

    public boolean isPageLoaded() {
        try { wait.waitForVisible(pageHeading); return true; }
        catch (Exception e) { return false; }
    }

    public String getPageHeading() {
        return wait.waitForVisible(pageHeading).getText();
    }

    public boolean areChartsVisible() {
        return driver.findElements(charts).size() > 0;
    }

    public int getCardCount() {
        return driver.findElements(metricCards).size();
    }

    public boolean isDownloadAvailable() {
        return driver.findElements(downloadBtn).size() > 0;
    }
}
