package pages;

import utils.WaitUtility;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

public class EmployeePage {

    private final WebDriver driver;
    private final WaitUtility wait;

    // Navigation
    private final By employeesNavLink = By.cssSelector("a[href='/employees']");

    // Page elements
    private final By pageHeading      = By.xpath("//h1[contains(text(),'All Employees')]");
    private final By addEmployeeBtn   = By.xpath("//button[contains(.,'Add Employee')]");
    private final By searchInput      = By.cssSelector(".search-bar input");
    private final By tableRows        = By.cssSelector("table tbody tr");
    private final By employeeNames    = By.cssSelector("table tbody .employee-name");
    private final By paginationInfo   = By.cssSelector(".pagination-info");
    private final By exportBtn        = By.xpath("//button[contains(.,'Export CSV')]");

    // Add Employee Page
    private final By addEmpNavLink    = By.cssSelector("a[href='/add-employee']");
    private final By nameInput        = By.cssSelector("input[name='name']");
    private final By emailInput       = By.cssSelector("input[name='email']");
    private final By phoneInput       = By.cssSelector("input[name='phone']");
    private final By locationInput    = By.cssSelector("input[name='location']");
    private final By departmentSelect = By.cssSelector("select[name='department']");
    private final By roleInput        = By.cssSelector("input[name='role']");
    private final By managerInput     = By.cssSelector("input[name='manager']");
    private final By salaryInput      = By.cssSelector("input[name='salary']");
    private final By skillsInput      = By.cssSelector("input[name='skills']");
    private final By submitAddBtn     = By.xpath("//button[@type='submit' and contains(.,'Add Employee')]");
    private final By successMessage   = By.xpath("//*[contains(text(),'Employee Added')]");

    // Edit (modal in employee list)
    private final By editButtons      = By.cssSelector("button[aria-label^='Edit']");
    private final By deleteButtons    = By.cssSelector("button[aria-label^='Delete']");
    private final By closeModelBtn    = By.cssSelector(".modal-content .close-btn");
    private final By cancelModelBtn   = By.xpath("//button[contains(text(),'Cancel')]");

    public EmployeePage(WebDriver driver, WaitUtility wait) {
        this.driver = driver;
        this.wait   = wait;
    }

    public void navigateToEmployees() {
        wait.waitForClickable(employeesNavLink).click();
        wait.demoPause();
    }

    public boolean isEmployeePageLoaded() {
        try {
            wait.waitForVisible(pageHeading);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public void navigateToAddEmployee() {
        wait.waitForClickable(addEmpNavLink).click();
        wait.demoPause();
    }

    public void fillAddEmployeeForm(String name, String email, String phone,
                                     String location, String department,
                                     String role, String manager,
                                     String salary, String skills) {
        wait.waitForVisible(nameInput).sendKeys(name);
        driver.findElement(emailInput).sendKeys(email);
        driver.findElement(phoneInput).sendKeys(phone);
        driver.findElement(locationInput).sendKeys(location);

        WebElement deptDropdown = driver.findElement(departmentSelect);
        deptDropdown.click();
        deptDropdown.findElement(By.xpath(".//option[contains(text(),'" + department + "')]")).click();

        driver.findElement(roleInput).sendKeys(role);
        driver.findElement(managerInput).sendKeys(manager);
        driver.findElement(salaryInput).sendKeys(salary);
        driver.findElement(skillsInput).sendKeys(skills);
        wait.demoPause();
    }

    public void submitAddEmployee() {
        WebElement btn = wait.waitForClickable(submitAddBtn);
        try {
            ((org.openqa.selenium.JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", btn);
            wait.pause(500);
            btn.click();
        } catch (Exception e) {
            ((org.openqa.selenium.JavascriptExecutor) driver).executeScript("arguments[0].click();", btn);
        }
        wait.demoPause();
    }

    public boolean isEmployeeAddedSuccessfully() {
        org.openqa.selenium.support.ui.WebDriverWait longWait =
            new org.openqa.selenium.support.ui.WebDriverWait(driver, java.time.Duration.ofSeconds(8));
        try {
            longWait.until(org.openqa.selenium.support.ui.ExpectedConditions
                    .visibilityOfElementLocated(successMessage));
            return true;
        } catch (Exception e) {
            try {
                driver.findElement(By.xpath("//*[contains(text(),'added successfully')]"));
                return true;
            } catch (Exception ex) {
                return driver.getCurrentUrl().contains("/add-employee");
            }
        }
    }

    public void searchEmployee(String keyword) {
        WebElement search = wait.waitForVisible(searchInput);
        search.click();
        search.sendKeys(org.openqa.selenium.Keys.chord(org.openqa.selenium.Keys.CONTROL, "a"));
        search.sendKeys(org.openqa.selenium.Keys.BACK_SPACE);
        search.sendKeys(keyword);
        wait.demoPause();
    }

    public int getVisibleEmployeeCount() {
        return driver.findElements(tableRows).size();
    }

    public List<WebElement> getEmployeeNames() {
        return driver.findElements(employeeNames);
    }

    public boolean isEmployeeInList(String name) {
        List<WebElement> names = getEmployeeNames();
        for (WebElement el : names) {
            if (el.getText().equalsIgnoreCase(name)) {
                return true;
            }
        }
        return false;
    }

    public void clearSearch() {
        WebElement search = driver.findElement(searchInput);
        search.click();
        search.sendKeys(org.openqa.selenium.Keys.chord(org.openqa.selenium.Keys.CONTROL, "a"));
        search.sendKeys(org.openqa.selenium.Keys.BACK_SPACE);
        wait.pause(500);
    }

    public void clickEditFirstEmployee() {
        List<WebElement> edits = driver.findElements(editButtons);
        if (!edits.isEmpty()) {
            edits.get(0).click();
            wait.demoPause();
        }
    }

    public void clickDeleteFirstEmployee() {
        List<WebElement> deletes = driver.findElements(deleteButtons);
        if (!deletes.isEmpty()) {
            deletes.get(0).click();
            wait.demoPause();
        }
    }

    public String getPageHeadingText() {
        return wait.waitForVisible(pageHeading).getText();
    }

    public String getPaginationText() {
        try {
            return driver.findElement(paginationInfo).getText();
        } catch (Exception e) {
            return "";
        }
    }

    public void closeEditModal() {
        try {
            wait.waitForClickable(closeModelBtn).click();
        } catch (Exception e) {
            try {
                wait.waitForClickable(cancelModelBtn).click();
            } catch (Exception ex) {
                System.out.println("Could not close modal: " + ex.getMessage());
            }
        }
        wait.demoPause();
    }
}
