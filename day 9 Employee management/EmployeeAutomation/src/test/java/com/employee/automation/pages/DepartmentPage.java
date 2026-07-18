package com.employee.automation.pages;

import com.employee.automation.utils.WaitUtility;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import java.util.List;

public class DepartmentPage {

    private final WebDriver driver;
    private final WaitUtility wait;

    private final By departmentsNavLink = By.cssSelector("a[href='/departments']");
    private final By pageHeading        = By.xpath("//h1[contains(text(),'Departments')]");
    private final By totalDeptMetric    = By.xpath("//*[contains(text(),'Total Departments')]");
    private final By totalEmpMetric     = By.xpath("//*[contains(text(),'Total Employees')]");
    private final By cards              = By.cssSelector(".card");

    public DepartmentPage(WebDriver driver, WaitUtility wait) {
        this.driver = driver;
        this.wait   = wait;
    }

    public void navigateToDepartments() {
        wait.safeNavigate(driver, departmentsNavLink);
        wait.demoPause();
    }

    public boolean isPageLoaded() {
        try { wait.waitForVisible(pageHeading); return true; }
        catch (Exception e) { return false; }
    }

    public String getPageHeading() {
        return wait.waitForVisible(pageHeading).getText();
    }

    public boolean isTotalDepartmentsVisible() {
        try { return wait.waitForVisible(totalDeptMetric).isDisplayed(); }
        catch (Exception e) { return false; }
    }

    public boolean isTotalEmployeesMetricVisible() {
        try { return wait.waitForVisible(totalEmpMetric).isDisplayed(); }
        catch (Exception e) { return false; }
    }

    public int getDepartmentCardCount() {
        return driver.findElements(cards).size();
    }
}
