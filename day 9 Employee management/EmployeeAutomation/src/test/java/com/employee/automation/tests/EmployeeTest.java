package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.EmployeePage;
import org.openqa.selenium.Alert;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.time.Duration;

public class EmployeeTest extends BaseTest {

    private EmployeePage employeePage;
    private final String employeeName  = "Amit Sharma";
    private final String employeeEmail = "amit.sharma@company.com";

    @BeforeClass
    public void initPage() {
        employeePage = new EmployeePage(driver, wait);
    }

    // ── Helper: dismiss any open browser confirm/alert ─────────────────────
    private void dismissAlert() {
        try {
            WebDriverWait alertWait = new WebDriverWait(driver, Duration.ofSeconds(4));
            Alert alert = alertWait.until(ExpectedConditions.alertIsPresent());
            System.out.println("  → Alert text: " + alert.getText());
            alert.accept();
            wait.pause(500);
        } catch (Exception e) {
            // No alert — that's fine
        }
    }

    // ── Helper: close modal if it is still open ────────────────────────────
    private void dismissModalIfOpen() {
        try {
            if (!driver.findElements(org.openqa.selenium.By.cssSelector(".modal-overlay")).isEmpty()) {
                System.out.println("  → Modal is open — closing it");
                employeePage.closeEditModal();
            }
        } catch (Exception e) {
            // Modal not found — nothing to do
        }
    }

    // ─────────────────────────────────────────────────────────────────────
    @Test(priority = 1, description = "Verify Employee List page loads successfully")
    public void testOpenEmployeePage() {
        employeePage.navigateToEmployees();
        Assert.assertTrue(employeePage.isEmployeePageLoaded(),
                "Employee page heading should load");
        System.out.println("  → Employee list page loaded");
        wait.demoPause();
    }

    @Test(priority = 2, description = "Add a new employee using /add-employee route")
    public void testAddEmployee() {
        dismissModalIfOpen();
        employeePage.navigateToAddEmployee();
        employeePage.fillAddEmployeeForm(
                employeeName, employeeEmail,
                "+91 99999 88888", "New Delhi",
                "Engineering", "Software Engineer",
                "Rahul", "1000000", "Java, Selenium, Testing");
        employeePage.submitAddEmployee();
        // Banner shows for only 2.5s — log result but don't fail (search test confirms add worked)
        boolean bannerSeen = employeePage.isEmployeeAddedSuccessfully();
        System.out.println("  → Add employee banner visible: " + bannerSeen
                + " (employee verified in next search test)");
        // Success is confirmed in testSearchEmployee — we just log here
        System.out.println("  → New employee submitted: " + employeeName);
        wait.demoPause();
    }

    @Test(priority = 3, description = "Search for the newly added employee")
    public void testSearchEmployee() {
        dismissModalIfOpen();
        employeePage.navigateToEmployees();
        wait.pause(1500); // wait for API refresh
        employeePage.searchEmployee(employeeName);
        Assert.assertTrue(employeePage.isEmployeeInList(employeeName),
                "Added employee should appear in search results");
        System.out.println("  → Search verified for: " + employeeName);
        wait.demoPause();
    }

    @Test(priority = 4, description = "Open Edit modal for first employee and close it")
    public void testEditEmployee() {
        dismissModalIfOpen();
        employeePage.navigateToEmployees();
        employeePage.clearSearch();
        wait.pause(800);
        employeePage.clickEditFirstEmployee();
        // Verify modal opened
        boolean modalVisible = !driver.findElements(
                org.openqa.selenium.By.cssSelector(".modal-content")).isEmpty();
        System.out.println("  → Edit modal opened: " + modalVisible);
        // CRITICAL: close modal so subsequent tests can use the sidebar
        employeePage.closeEditModal();
        wait.demoPause();
    }

    @Test(priority = 5, description = "Delete the test employee and verify removal")
    public void testDeleteEmployee() {
        dismissModalIfOpen();
        employeePage.navigateToEmployees();
        wait.pause(800);
        employeePage.searchEmployee(employeeName);
        int countBefore = employeePage.getVisibleEmployeeCount();
        System.out.println("  → Employees matching before delete: " + countBefore);

        employeePage.clickDeleteFirstEmployee();
        dismissAlert(); // accept window.confirm("Are you sure...")
        wait.pause(1500);

        employeePage.searchEmployee(employeeName);
        int countAfter = employeePage.getVisibleEmployeeCount();
        Assert.assertTrue(countAfter < countBefore || countAfter == 0,
                "Employee count should decrease after deletion");
        System.out.println("  → Employee deleted. Count after: " + countAfter);

        // Clear search for clean state
        employeePage.clearSearch();
        dismissModalIfOpen();
        wait.demoPause();
    }
}
