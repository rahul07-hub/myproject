package pages;

import utils.WaitUtility;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class AttendancePage {

    private final WebDriver driver;
    private final WaitUtility wait;

    private final By attendanceNavLink = By.cssSelector("a[href='/attendance']");
    private final By pageHeading       = By.xpath("//h1[contains(text(),'Attendance')]");
    private final By presentMetric     = By.xpath("//*[contains(text(),'Present') or contains(text(),'On Time')]");
    private final By absentMetric      = By.xpath("//*[contains(text(),'Absent')]");
    private final By lateMetric        = By.xpath("//*[contains(text(),'Late')]");
    private final By dailyLogSection   = By.xpath("//*[contains(text(),'Daily Log') or contains(text(),'Today')]");

    public AttendancePage(WebDriver driver, WaitUtility wait) {
        this.driver = driver;
        this.wait   = wait;
    }

    public void navigateToAttendance() {
        try {
            WebElement link = wait.waitForClickable(attendanceNavLink);
            try {
                link.click();
            } catch (Exception e) {
                ((JavascriptExecutor) driver).executeScript("arguments[0].click();", link);
            }
        } catch (Exception e) {
            driver.get("http://localhost:5173/attendance");
        }
        wait.demoPause();
    }

    public boolean isPageLoaded() {
        try {
            wait.waitForVisible(pageHeading);
            return true;
        } catch (Exception e) {
            return driver.getCurrentUrl().contains("/attendance");
        }
    }

    public boolean isPresentMetricVisible() {
        try { return wait.waitForVisible(presentMetric).isDisplayed(); }
        catch (Exception e) { return false; }
    }

    public boolean isAbsentMetricVisible() {
        try { return wait.waitForVisible(absentMetric).isDisplayed(); }
        catch (Exception e) { return false; }
    }

    public boolean isLateMetricVisible() {
        try { return wait.waitForVisible(lateMetric).isDisplayed(); }
        catch (Exception e) { return false; }
    }

    public boolean isDailyLogVisible() {
        try { return wait.waitForVisible(dailyLogSection).isDisplayed(); }
        catch (Exception e) { return false; }
    }
}
