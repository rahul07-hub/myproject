package pages;

import utils.WaitUtility;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class PayrollPage {

    private final WebDriver driver;
    private final WaitUtility wait;

    private final By payrollNavLink = By.cssSelector("a[href='/payroll']");
    private final By pageHeading    = By.xpath("//h1[contains(text(),'Payroll')]");
    private final By totalPayroll   = By.xpath("//*[contains(text(),'Total Payroll') or contains(text(),'Payroll')]");
    private final By tableRows      = By.cssSelector("table tbody tr");
    private final By metricCards    = By.cssSelector(".metric-card, .card");

    public PayrollPage(WebDriver driver, WaitUtility wait) {
        this.driver = driver;
        this.wait   = wait;
    }

    public void navigateToPayroll() {
        try {
            WebElement link = wait.waitForClickable(payrollNavLink);
            try {
                link.click();
            } catch (Exception e) {
                ((JavascriptExecutor) driver).executeScript("arguments[0].click();", link);
            }
        } catch (Exception e) {
            driver.get("http://localhost:5173/payroll");
        }
        wait.demoPause();
    }

    public boolean isPageLoaded() {
        try {
            wait.waitForVisible(pageHeading);
            return true;
        } catch (Exception e) {
            return driver.getCurrentUrl().contains("/payroll");
        }
    }

    public boolean isTotalPayrollVisible() {
        try { return wait.waitForVisible(totalPayroll).isDisplayed(); }
        catch (Exception e) { return false; }
    }

    public int getPayrollRowCount() {
        return driver.findElements(tableRows).size();
    }

    public int getPayrollCardCount() {
        return driver.findElements(metricCards).size();
    }
}
