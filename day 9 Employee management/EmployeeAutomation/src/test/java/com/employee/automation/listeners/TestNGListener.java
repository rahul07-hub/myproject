package com.employee.automation.listeners;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import utils.DriverFactory;
import com.employee.automation.reports.ExtentManager;
import utils.ScreenshotUtility;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

public class TestNGListener implements ITestListener {

    private static final ExtentReports extent = ExtentManager.getInstance();
    private static final ThreadLocal<ExtentTest> extentTest = new ThreadLocal<>();

    public static ExtentTest getTest() {
        return extentTest.get();
    }

    @Override
    public void onTestStart(ITestResult result) {
        String testName = result.getMethod().getMethodName();
        String description = result.getMethod().getDescription();

        // Retrieve the Cucumber scenario name if available
        Object[] parameters = result.getParameters();
        if (parameters != null && parameters.length > 0) {
            testName = parameters[0].toString().replace("\"", "");
        }

        ExtentTest test = extent.createTest(testName,
                (description != null && !description.isEmpty()) ? description : testName);
        extentTest.set(test);
        System.out.println("\n▶  START: " + testName);
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        extentTest.get().log(Status.PASS, "✅ PASSED: " + result.getMethod().getMethodName());
        System.out.println("✅ PASSED: " + result.getMethod().getMethodName());
    }

    @Override
    public void onTestFailure(ITestResult result) {
        String testName = result.getMethod().getMethodName();
        extentTest.get().log(Status.FAIL, "❌ FAILED: " + testName);
        extentTest.get().log(Status.FAIL, result.getThrowable());

        // Capture screenshot on failure
        String screenshotPath = ScreenshotUtility.captureScreenshot(
                DriverFactory.getDriver(), testName);
        if (screenshotPath != null) {
            try {
                extentTest.get().addScreenCaptureFromPath(screenshotPath);
            } catch (Exception e) {
                System.err.println("Could not attach screenshot: " + e.getMessage());
            }
        }
        System.out.println("❌ FAILED: " + testName + " → " + result.getThrowable().getMessage());
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        extentTest.get().log(Status.SKIP, "⏭  SKIPPED: " + result.getMethod().getMethodName());
        System.out.println("⏭  SKIPPED: " + result.getMethod().getMethodName());
    }

    @Override
    public void onFinish(ITestContext context) {
        ExtentManager.flush();
    }
}
