package com.employee.automation.reports;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;
import com.employee.automation.config.ConfigReader;

public class ExtentManager {

    private static ExtentReports extent;

    public static ExtentReports getInstance() {
        if (extent == null) {
            createInstance();
        }
        return extent;
    }

    private static void createInstance() {
        String reportPath = ConfigReader.REPORTS_DIR + "EmployeeAutomation_Report.html";
        new java.io.File(ConfigReader.REPORTS_DIR).mkdirs();

        ExtentSparkReporter sparkReporter = new ExtentSparkReporter(reportPath);
        sparkReporter.config().setDocumentTitle("Employee Management - Automation Report");
        sparkReporter.config().setReportName("Selenium TestNG POM Framework Report");
        sparkReporter.config().setTheme(Theme.DARK);
        sparkReporter.config().setEncoding("utf-8");

        extent = new ExtentReports();
        extent.attachReporter(sparkReporter);
        extent.setSystemInfo("Application", "Employee Management System");
        extent.setSystemInfo("Environment", "Local - localhost:5173");
        extent.setSystemInfo("Framework", "Selenium 4 + TestNG 7 + POM");
        extent.setSystemInfo("Browser", ConfigReader.BROWSER);
        extent.setSystemInfo("Author", "QA Automation Team");
    }

    public static void flush() {
        if (extent != null) {
            extent.flush();
        }
    }
}
