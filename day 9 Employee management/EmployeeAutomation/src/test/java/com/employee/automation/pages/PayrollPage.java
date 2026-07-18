package com.employee.automation.pages;

import com.employee.automation.utils.WaitUtility;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class PayrollPage {

    private final WebDriver driver;
    private final WaitUtility wait;

    private final By payrollNavLink = By.cssSelector("a[href='/payroll']");
    private final By pageHeading    = By.xpath("//h1[contains(text(),'Payroll')]");
    private final By payrollCards   = By.cssSelector(".metric-card");
    private final By tableRows      = By.cssSelector("table tbody tr");
    private final By totalPayroll   = By.xpath("//*[contains(text(),'Total Payroll')]");

    public PayrollPage(WebDriver driver, WaitUtility wait) {
        this.driver = driver;
        this.wait   = wait;
    }

    public void navigateToPayroll() {
        wait.safeNavigate(driver, payrollNavLink);
        wait.demoPause();
    }

    public boolean isPageLoaded() {
        try { wait.waitForVisible(pageHeading); return true; }
        catch (Exception e) { return false; }
    }

    public String getPageHeading() {
        return wait.waitForVisible(pageHeading).getText();
    }

    public int getPayrollCardCount() {
        return driver.findElements(payrollCards).size();
    }

    public int getPayrollRowCount() {
        return driver.findElements(tableRows).size();
    }

    public boolean isTotalPayrollVisible() {
        try { return wait.waitForVisible(totalPayroll).isDisplayed(); }
        catch (Exception e) { return false; }
    }
}
