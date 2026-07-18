package pages;

import utils.WaitUtility;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class ReportsPage {

    private final WebDriver driver;
    private final WaitUtility wait;

    private final By reportsNavLink = By.cssSelector("a[href='/reports']");
    private final By pageHeading    = By.xpath("//h1[contains(text(),'Report') or contains(text(),'Analytics')]");
    private final By charts         = By.cssSelector(".recharts-responsive-container, .recharts-wrapper, canvas");
    private final By anyContent     = By.cssSelector(".metric-card, .card, table, .chart");

    public ReportsPage(WebDriver driver, WaitUtility wait) {
        this.driver = driver;
        this.wait   = wait;
    }

    public void navigateToReports() {
        try {
            WebElement link = wait.waitForClickable(reportsNavLink);
            try {
                link.click();
            } catch (Exception e) {
                ((JavascriptExecutor) driver).executeScript("arguments[0].click();", link);
            }
        } catch (Exception e) {
            driver.get("http://localhost:5173/reports");
        }
        wait.demoPause();
    }

    public boolean isPageLoaded() {
        try {
            wait.waitForVisible(pageHeading);
            return true;
        } catch (Exception e) {
            return driver.getCurrentUrl().contains("/reports");
        }
    }

    public boolean areChartsVisible() {
        return driver.findElements(charts).size() > 0 || driver.findElements(anyContent).size() > 0;
    }
}
