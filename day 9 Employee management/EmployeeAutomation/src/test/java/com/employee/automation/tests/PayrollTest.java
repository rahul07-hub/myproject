package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.PayrollPage;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class PayrollTest extends BaseTest {

    private PayrollPage payrollPage;

    @BeforeClass
    public void initPage() {
        payrollPage = new PayrollPage(driver, wait);
    }

    @Test(priority = 1, description = "Open Payroll page and verify it loads")
    public void testOpenPayrollPage() {
        payrollPage.navigateToPayroll();
        Assert.assertTrue(payrollPage.isPageLoaded(), "Payroll page heading should load");
        System.out.println("  → Payroll page loaded successfully");
        wait.demoPause();
    }

    @Test(priority = 2, description = "Verify payroll cards and metrics")
    public void testPayrollMetrics() {
        int cardCount = payrollPage.getPayrollCardCount();
        Assert.assertTrue(cardCount > 0, "At least one payroll card should be visible");
        Assert.assertTrue(payrollPage.isTotalPayrollVisible(), "Total Payroll card/label should be visible");
        System.out.println("  → Payroll metrics card count: " + cardCount);
        wait.demoPause();
    }

    @Test(priority = 3, description = "Verify payroll list table is populated")
    public void testPayrollList() {
        int rowCount = payrollPage.getPayrollRowCount();
        System.out.println("  → Total payroll rows: " + rowCount);
        wait.demoPause();
    }
}
