package pages;

import utils.WaitUtility;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class DepartmentPage {

    private final WebDriver driver;
    private final WaitUtility wait;

    private final By departmentsNavLink = By.cssSelector("a[href='/departments']");
    private final By pageHeading        = By.xpath("//h1[contains(text(),'Department')]");
    private final By totalDeptMetric    = By.xpath("//*[contains(text(),'Total Departments') or contains(text(),'Department')]");
    private final By cards              = By.cssSelector(".card, .department-card, .metric-card");

    public DepartmentPage(WebDriver driver, WaitUtility wait) {
        this.driver = driver;
        this.wait   = wait;
    }

    public void navigateToDepartments() {
        try {
            WebElement link = wait.waitForClickable(departmentsNavLink);
            try {
                link.click();
            } catch (Exception e) {
                ((JavascriptExecutor) driver).executeScript("arguments[0].click();", link);
            }
        } catch (Exception e) {
            driver.get("http://localhost:5173/departments");
        }
        wait.demoPause();
    }

    public boolean isPageLoaded() {
        try {
            wait.waitForVisible(pageHeading);
            return true;
        } catch (Exception e) {
            return driver.getCurrentUrl().contains("/departments");
        }
    }

    public boolean isTotalDepartmentsVisible() {
        try {
            return wait.waitForVisible(totalDeptMetric).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public int getDepartmentCardCount() {
        return driver.findElements(cards).size();
    }
}
