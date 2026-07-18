package hooks;

import io.cucumber.java.Before;
import io.cucumber.java.After;
import io.cucumber.java.Scenario;
import utils.DriverFactory;
import utils.ScreenshotUtility;
import pages.LoginPage;
import utils.WaitUtility;
import com.employee.automation.config.ConfigReader;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;

public class Hooks {

    private static WebDriver driver;
    private static boolean suiteSetupDone = false;

    @Before(order = 1)
    public void setUp() {
        if (!suiteSetupDone) {
            System.out.println("=================================================");
            System.out.println("  INITIALIZING BROWSER & PERFORMING ONE-TIME LOGIN ");
            System.out.println("=================================================");
            driver = DriverFactory.getDriver();
            driver.get(ConfigReader.BASE_URL);
            
            // Perform login only once
            WaitUtility wait = new WaitUtility(driver);
            LoginPage loginPage = new LoginPage(driver, wait);
            loginPage.login(ConfigReader.ADMIN_EMAIL, ConfigReader.ADMIN_PASSWORD);
            
            // Register JVM shutdown hook to close the browser only once at the end
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                System.out.println("\n=================================================");
                System.out.println("  SHUTTING DOWN BROWSER AT END OF EXECUTION ");
                System.out.println("=================================================");
                DriverFactory.quitDriver();
            }));

            suiteSetupDone = true;
        } else {
            driver = DriverFactory.getDriver();
        }
    }

    @After
    public void tearDown(Scenario scenario) {
        if (scenario.isFailed() && driver != null) {
            // Capture screenshot on failure for Cucumber report
            try {
                final byte[] screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
                scenario.attach(screenshot, "image/png", "Failure: " + scenario.getName());
            } catch (Exception e) {
                System.err.println("Could not attach screenshot to Cucumber report: " + e.getMessage());
            }
            // Capture screenshot as local file
            ScreenshotUtility.captureScreenshot(driver, scenario.getName());
        }
    }
}
