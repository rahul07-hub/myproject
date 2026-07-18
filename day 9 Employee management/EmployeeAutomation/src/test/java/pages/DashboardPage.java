package pages;

import utils.WaitUtility;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import java.util.List;

public class DashboardPage {

    private final WebDriver driver;
    private final WaitUtility wait;

    private final By dashboardNavLink = By.cssSelector("a[href='/dashboard'], a[href='/']");
    private final By heroHeading      = By.xpath("//h2[contains(text(),'Hi')] | //h1[contains(text(),'Dashboard')]");
    private final By metricCards      = By.cssSelector(".metric-card");

    public DashboardPage(WebDriver driver, WaitUtility wait) {
        this.driver = driver;
        this.wait   = wait;
    }

    public void navigateToDashboard() {
        try {
            WebElement link = wait.waitForClickable(dashboardNavLink);
            link.click();
        } catch (Exception e) {
            driver.get("http://localhost:5173/");
        }
        wait.demoPause();
    }

    public boolean isPageLoaded() {
        try {
            wait.waitForVisible(heroHeading);
            return true;
        } catch (Exception e) {
            // Fallback: check URL
            return driver.getCurrentUrl().contains("localhost:5173");
        }
    }

    public int getMetricCardCount() {
        return driver.findElements(metricCards).size();
    }

    public boolean isMetricCardVisible(String label) {
        List<WebElement> cards = driver.findElements(metricCards);
        for (WebElement card : cards) {
            try {
                String cardText = card.getText();
                if (cardText.toLowerCase().contains(label.toLowerCase())) {
                    return true;
                }
            } catch (Exception ignored) {}
        }
        return false;
    }
}
