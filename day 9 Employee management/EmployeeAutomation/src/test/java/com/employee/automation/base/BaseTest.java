package com.employee.automation.base;

import com.employee.automation.config.ConfigReader;
import com.employee.automation.driver.DriverFactory;
import com.employee.automation.utils.WaitUtility;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;

public class BaseTest {

    protected static WebDriver driver;
    protected static WaitUtility wait;

    @BeforeSuite(alwaysRun = true)
    public void setupSuite() {
        System.out.println("═══════════════════════════════════════════════");
        System.out.println("  EMPLOYEE MANAGEMENT - AUTOMATION FRAMEWORK  ");
        System.out.println("  Selenium 4 + TestNG 7 + Page Object Model   ");
        System.out.println("═══════════════════════════════════════════════");

        DriverFactory.initDriver();
        driver = DriverFactory.getDriver();
        wait = new WaitUtility(driver);

        // Navigate to the application
        driver.get(ConfigReader.BASE_URL);
        System.out.println("[SETUP] Browser launched → " + ConfigReader.BASE_URL);
        wait.demoPause();
    }

    @AfterSuite(alwaysRun = true)
    public void teardownSuite() {
        System.out.println("\n═══════════════════════════════════════════════");
        System.out.println("  ALL TEST SUITES COMPLETED — CLOSING BROWSER ");
        System.out.println("═══════════════════════════════════════════════");
        DriverFactory.quitDriver();
    }

    protected WebDriver getDriver() {
        return DriverFactory.getDriver();
    }

    protected WaitUtility getWait() {
        return wait;
    }
}
