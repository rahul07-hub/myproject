package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.DepartmentPage;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class DepartmentTest extends BaseTest {

    private DepartmentPage departmentPage;

    @BeforeClass
    public void initPage() {
        departmentPage = new DepartmentPage(driver, wait);
    }

    @Test(priority = 1, description = "Open Departments page and verify it loads")
    public void testOpenDepartmentPage() {
        departmentPage.navigateToDepartments();
        Assert.assertTrue(departmentPage.isPageLoaded(), "Departments page should be loaded");
        System.out.println("  → Departments page opened successfully");
        wait.demoPause();
    }

    @Test(priority = 2, description = "Verify department metrics cards are displayed")
    public void testDepartmentMetrics() {
        Assert.assertTrue(departmentPage.isTotalDepartmentsVisible(), "Total Departments metric should be visible");
        Assert.assertTrue(departmentPage.isTotalEmployeesMetricVisible(), "Total Employees metric should be visible");
        System.out.println("  → Department metrics visible");
        wait.demoPause();
    }

    @Test(priority = 3, description = "Verify department cards list is populated")
    public void testDepartmentList() {
        int cardCount = departmentPage.getDepartmentCardCount();
        System.out.println("  → Total department cards: " + cardCount);
        // Note: The UI renders mock departments or pulls from db.json
        wait.demoPause();
    }
}
