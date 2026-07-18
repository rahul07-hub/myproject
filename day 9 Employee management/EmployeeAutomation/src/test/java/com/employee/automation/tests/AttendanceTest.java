package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.AttendancePage;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class AttendanceTest extends BaseTest {

    private AttendancePage attendancePage;

    @BeforeClass
    public void initPage() {
        attendancePage = new AttendancePage(driver, wait);
    }

    @Test(priority = 1, description = "Open Attendance page and verify it loads")
    public void testOpenAttendancePage() {
        attendancePage.navigateToAttendance();
        Assert.assertTrue(attendancePage.isPageLoaded(), "Attendance log page heading should load");
        System.out.println("  → Attendance page loaded successfully");
        wait.demoPause();
    }

    @Test(priority = 2, description = "Verify all daily attendance metrics exist")
    public void testAttendanceMetrics() {
        Assert.assertTrue(attendancePage.isPresentMetricVisible(), "Present metric card should be visible");
        Assert.assertTrue(attendancePage.isLateMetricVisible(), "Late metric card should be visible");
        Assert.assertTrue(attendancePage.isAbsentMetricVisible(), "Absent metric card should be visible");
        Assert.assertTrue(attendancePage.isOnLeaveMetricVisible(), "On Leave metric card should be visible");
        System.out.println("  → All attendance metrics cards verified successfully");
        wait.demoPause();
    }

    @Test(priority = 3, description = "Verify daily log table and weekly overview chart are visible")
    public void testDailyLogAndWeeklyOverview() {
        Assert.assertTrue(attendancePage.isDailyLogVisible(), "Daily log table should be visible");
        Assert.assertTrue(attendancePage.isWeeklyOverviewVisible(), "Weekly overview chart should be visible");
        int rows = attendancePage.getAttendanceRowCount();
        System.out.println("  → Visible logs in daily table: " + rows);
        wait.demoPause();
    }
}
