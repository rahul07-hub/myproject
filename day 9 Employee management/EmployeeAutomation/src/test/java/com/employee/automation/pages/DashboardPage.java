package com.employee.automation.pages;

import com.employee.automation.utils.WaitUtility;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

public class DashboardPage {

    private final WebDriver driver;
    private final WaitUtility wait;

    // Locators
    private final By heroHeading      = By.xpath("//h2[contains(text(),'Hi')]");
    private final By metricCards      = By.cssSelector(".metric-card");
    private final By metricValues     = By.cssSelector(".metric-card .metric-value");
    private final By metricLabels     = By.cssSelector(".metric-card .metric-label");
    private final By quickActionCards = By.cssSelector(".quick-action-card");
    private final By activityItems    = By.cssSelector(".activity-item");
    private final By upcomingEvents   = By.xpath("//*[contains(text(),'Upcoming Events')]");
    private final By recentEmployees  = By.xpath("//*[contains(text(),'Recent Employees')]");
    private final By chartTitle       = By.xpath("//*[contains(text(),'Employee Growth')]");
    private final By attendanceChart  = By.xpath("//*[contains(text(),'Attendance Trend')]");

    public DashboardPage(WebDriver driver, WaitUtility wait) {
        this.driver = driver;
        this.wait   = wait;
    }

    public boolean isDashboardLoaded() {
        try {
            wait.waitForVisible(heroHeading);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getHeroHeading() {
        return wait.waitForVisible(heroHeading).getText();
    }

    public int getMetricCardCount() {
        return driver.findElements(metricCards).size();
    }

    public String getMetricValueByLabel(String label) {
        List<WebElement> cards = driver.findElements(metricCards);
        for (WebElement card : cards) {
            String cardLabel = card.findElement(By.cssSelector(".metric-label")).getText();
            if (cardLabel.equalsIgnoreCase(label)) {
                return card.findElement(By.cssSelector(".metric-value")).getText();
            }
        }
        return null;
    }

    public boolean isTotalEmployeesCardVisible() {
        return getMetricValueByLabel("Total Employees") != null;
    }

    public boolean isActiveEmployeesCardVisible() {
        return getMetricValueByLabel("Active Employees") != null;
    }

    public boolean isDepartmentsCardVisible() {
        return getMetricValueByLabel("Departments") != null;
    }

    public boolean isMonthlySalaryCardVisible() {
        return getMetricValueByLabel("Monthly Salary") != null;
    }

    public boolean isAttendanceChartVisible() {
        try {
            return wait.waitForVisible(attendanceChart).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isRecentActivityVisible() {
        return driver.findElements(activityItems).size() > 0;
    }

    public boolean isUpcomingEventsVisible() {
        try {
            return wait.waitForVisible(upcomingEvents).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public int getQuickActionCount() {
        return driver.findElements(quickActionCards).size();
    }
}
