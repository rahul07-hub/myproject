package com.employee.automation.pages;

import com.employee.automation.utils.WaitUtility;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class AttendancePage {

    private final WebDriver driver;
    private final WaitUtility wait;

    private final By attendanceNavLink = By.cssSelector("a[href='/attendance']");
    private final By pageHeading       = By.xpath("//h1[contains(text(),'Attendance')]");
    private final By presentMetric     = By.xpath("//*[contains(text(),'On Time / Present')]");
    private final By lateMetric        = By.xpath("//*[contains(text(),'Late Arrivals')]");
    private final By absentMetric      = By.xpath("//*[contains(text(),'Absent')]");
    private final By onLeaveMetric     = By.xpath("//*[contains(text(),'On Leave')]");
    private final By dateInput         = By.cssSelector("input[type='date']");
    private final By dailyLogTable     = By.xpath("//*[contains(text(),'Daily Log')]");
    private final By weeklyOverview    = By.xpath("//*[contains(text(),'Weekly Overview')]");
    private final By tableRows         = By.cssSelector("table tbody tr");
    private final By modalOverlay      = By.cssSelector(".modal-overlay");

    public AttendancePage(WebDriver driver, WaitUtility wait) {
        this.driver = driver;
        this.wait   = wait;
    }

    /** Close any open modal/overlay before navigating */
    private void closeModalIfOpen() {
        try {
            if (!driver.findElements(By.cssSelector(".modal-content .close-btn")).isEmpty()) {
                driver.findElement(By.cssSelector(".modal-content .close-btn")).click();
                wait.pause(500);
            }
        } catch (Exception ignored) {}
    }

    public void navigateToAttendance() {
        closeModalIfOpen();
        WebElement link = wait.waitForClickable(attendanceNavLink);
        try {
            link.click();
        } catch (Exception e) {
            ((JavascriptExecutor) driver).executeScript("arguments[0].click();", link);
        }
        wait.demoPause();
    }

    public boolean isPageLoaded() {
        try {
            wait.waitForVisible(pageHeading);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isPresentMetricVisible() {
        try { return wait.waitForVisible(presentMetric).isDisplayed(); }
        catch (Exception e) { return false; }
    }

    public boolean isLateMetricVisible() {
        try { return wait.waitForVisible(lateMetric).isDisplayed(); }
        catch (Exception e) { return false; }
    }

    public boolean isAbsentMetricVisible() {
        try { return wait.waitForVisible(absentMetric).isDisplayed(); }
        catch (Exception e) { return false; }
    }

    public boolean isOnLeaveMetricVisible() {
        try { return wait.waitForVisible(onLeaveMetric).isDisplayed(); }
        catch (Exception e) { return false; }
    }

    public boolean isDailyLogVisible() {
        try { return wait.waitForVisible(dailyLogTable).isDisplayed(); }
        catch (Exception e) { return false; }
    }

    public boolean isWeeklyOverviewVisible() {
        try { return wait.waitForVisible(weeklyOverview).isDisplayed(); }
        catch (Exception e) { return false; }
    }

    public int getAttendanceRowCount() {
        return driver.findElements(tableRows).size();
    }

    public void selectDate(String date) {
        driver.findElement(dateInput).clear();
        driver.findElement(dateInput).sendKeys(date);
        wait.demoPause();
    }
}
