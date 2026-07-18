package com.employee.automation.pages;

import com.employee.automation.utils.WaitUtility;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import java.util.List;

public class DesignationPage {

    private final WebDriver driver;
    private final WaitUtility wait;

    // Navigation and selectors (designations are part of employee details)
    private final By employeesNavLink = By.cssSelector("a[href='/employees']");
    private final By searchInput      = By.cssSelector(".search-bar input");
    private final By tableRows        = By.cssSelector("table tbody tr");
    private final By designationCells = By.cssSelector("table tbody td:nth-child(4)"); // 4th column is designation

    public DesignationPage(WebDriver driver, WaitUtility wait) {
        this.driver = driver;
        this.wait   = wait;
    }

    public void navigateToDesignations() {
        wait.waitForClickable(employeesNavLink).click();
        wait.demoPause();
    }

    public boolean isPageLoaded() {
        try {
            wait.waitForVisible(searchInput);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public void searchDesignation(String designationName) {
        WebElement search = wait.waitForVisible(searchInput);
        search.click();
        search.sendKeys(org.openqa.selenium.Keys.chord(org.openqa.selenium.Keys.CONTROL, "a"));
        search.sendKeys(org.openqa.selenium.Keys.BACK_SPACE);
        search.sendKeys(designationName);
        wait.demoPause();
    }

    public boolean isDesignationVisibleInList(String designationName) {
        List<WebElement> cells = driver.findElements(designationCells);
        for (WebElement cell : cells) {
            if (cell.getText().equalsIgnoreCase(designationName)) {
                return true;
            }
        }
        return false;
    }
}
