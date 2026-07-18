package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.DashboardPage;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class DashboardTest extends BaseTest {

    private DashboardPage dashboardPage;

    @BeforeClass
    public void initPage() {
        dashboardPage = new DashboardPage(driver, wait);
        // Navigate to dashboard
        driver.get("http://localhost:5173/");
        wait.demoPause();
    }

    @Test(priority = 1, description = "Verify Dashboard opens successfully after login")
    public void verifyDashboardOpens() {
        Assert.assertTrue(dashboardPage.isDashboardLoaded(),
                "Dashboard should load with hero banner");
        System.out.println("  → Dashboard loaded successfully");
        wait.demoPause();
    }

    @Test(priority = 2, description = "Verify hero banner greeting is visible")
    public void verifyHeroBanner() {
        String heading = dashboardPage.getHeroHeading();
        Assert.assertTrue(heading.contains("Hi"),
                "Hero banner should display greeting 'Hi <username>'");
        System.out.println("  → Hero heading: " + heading);
        wait.demoPause();
    }

    @Test(priority = 3, description = "Verify Total Employees stat card is displayed")
    public void verifyTotalEmployeesCard() {
        Assert.assertTrue(dashboardPage.isTotalEmployeesCardVisible(),
                "Total Employees metric card should be visible");
        String val = dashboardPage.getMetricValueByLabel("Total Employees");
        System.out.println("  → Total Employees: " + val);
        wait.demoPause();
    }

    @Test(priority = 4, description = "Verify Active Employees stat card is displayed")
    public void verifyActiveEmployeesCard() {
        Assert.assertTrue(dashboardPage.isActiveEmployeesCardVisible(),
                "Active Employees metric card should be visible");
        String val = dashboardPage.getMetricValueByLabel("Active Employees");
        System.out.println("  → Active Employees: " + val);
        wait.demoPause();
    }

    @Test(priority = 5, description = "Verify Departments stat card is displayed")
    public void verifyDepartmentsCard() {
        Assert.assertTrue(dashboardPage.isDepartmentsCardVisible(),
                "Departments metric card should be visible");
        String val = dashboardPage.getMetricValueByLabel("Departments");
        System.out.println("  → Departments: " + val);
        wait.demoPause();
    }

    @Test(priority = 6, description = "Verify Monthly Salary stat card is displayed")
    public void verifyMonthlySalaryCard() {
        Assert.assertTrue(dashboardPage.isMonthlySalaryCardVisible(),
                "Monthly Salary metric card should be visible");
        String val = dashboardPage.getMetricValueByLabel("Monthly Salary");
        System.out.println("  → Monthly Salary: " + val);
        wait.demoPause();
    }

    @Test(priority = 7, description = "Verify Attendance widget/chart is displayed")
    public void verifyAttendanceWidget() {
        Assert.assertTrue(dashboardPage.isAttendanceChartVisible(),
                "Attendance trend chart should be visible on dashboard");
        System.out.println("  → Attendance chart visible");
        wait.demoPause();
    }

    @Test(priority = 8, description = "Verify Recent Activity section is displayed")
    public void verifyRecentActivity() {
        Assert.assertTrue(dashboardPage.isRecentActivityVisible(),
                "Recent Activity feed should contain items");
        System.out.println("  → Recent activity items displayed");
        wait.demoPause();
    }

    @Test(priority = 9, description = "Verify Upcoming Events section is displayed")
    public void verifyUpcomingEvents() {
        Assert.assertTrue(dashboardPage.isUpcomingEventsVisible(),
                "Upcoming Events section should be visible");
        System.out.println("  → Upcoming events section visible");
        wait.demoPause();
    }

    @Test(priority = 10, description = "Verify Quick Action cards are displayed")
    public void verifyQuickActions() {
        int count = dashboardPage.getQuickActionCount();
        Assert.assertTrue(count >= 4,
                "Dashboard should have at least 4 quick action cards");
        System.out.println("  → Quick action cards found: " + count);
        wait.demoPause();
    }
}
