package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import io.cucumber.datatable.DataTable;
import org.openqa.selenium.Alert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import pages.*;
import utils.DriverFactory;
import utils.WaitUtility;
import com.employee.automation.config.ConfigReader;
import java.time.Duration;
import java.util.Map;

public class EmployeeSteps {

    private final WebDriver driver = DriverFactory.getDriver();
    private final WaitUtility wait = new WaitUtility(driver);
    
    // Page Objects
    private final LoginPage loginPage = new LoginPage(driver, wait);
    private final DashboardPage dashboardPage = new DashboardPage(driver, wait);
    private final EmployeePage employeePage = new EmployeePage(driver, wait);
    private final DepartmentPage departmentPage = new DepartmentPage(driver, wait);
    private final AttendancePage attendancePage = new AttendancePage(driver, wait);
    private final PayrollPage payrollPage = new PayrollPage(driver, wait);
    private final ReportsPage reportsPage = new ReportsPage(driver, wait);
    private final SettingsPage settingsPage = new SettingsPage(driver, wait);
    private final LogoutPage logoutPage = new LogoutPage(driver, wait);

    // ==================== LOGIN / NAVIGATION ====================
    @Given("the user opens the application")
    public void the_user_opens_the_application() {
        if (!driver.getCurrentUrl().startsWith("http")) {
            driver.get(ConfigReader.BASE_URL);
        }
    }

    @When("the user logs in with valid credentials")
    public void the_user_logs_in_with_valid_credentials() {
        loginPage.login(ConfigReader.ADMIN_EMAIL, ConfigReader.ADMIN_PASSWORD);
    }

    @Then("the user should be on the Dashboard")
    public void the_user_should_be_on_the_dashboard() {
        Assert.assertTrue(dashboardPage.isPageLoaded(), "User should be redirected to the Dashboard page");
    }

    @Given("the user is logged in")
    public void the_user_is_logged_in() {
        the_user_opens_the_application();
        if (loginPage.isLoginPageDisplayed()) {
            loginPage.login(ConfigReader.ADMIN_EMAIL, ConfigReader.ADMIN_PASSWORD);
        }
    }

    @When("the user navigates to Dashboard")
    public void the_user_navigates_to_dashboard() {
        dashboardPage.navigateToDashboard();
    }

    @Then("the Dashboard page should be displayed")
    public void the_dashboard_page_should_be_displayed() {
        Assert.assertTrue(dashboardPage.isPageLoaded(), "Dashboard page should be visible");
    }

    @Then("the Dashboard should show metric cards")
    public void the_dashboard_should_show_metric_cards() {
        Assert.assertTrue(dashboardPage.getMetricCardCount() > 0, "Dashboard should have metric cards");
    }

    @Given("the user is on the Dashboard page")
    public void the_user_is_on_the_dashboard_page() {
        dashboardPage.navigateToDashboard();
        Assert.assertTrue(dashboardPage.isPageLoaded(), "User should be on Dashboard");
    }

    @Then("Total Employees card should be visible")
    public void total_employees_card_should_be_visible() {
        Assert.assertTrue(dashboardPage.isMetricCardVisible("Total Employees"), "Total Employees metric card should be visible");
    }

    @And("Active Employees card should be visible")
    public void active_employees_card_should_be_visible() {
        Assert.assertTrue(dashboardPage.isMetricCardVisible("Active Employees"), "Active Employees metric card should be visible");
    }

    @And("Departments card should be visible")
    public void departments_card_should_be_visible() {
        Assert.assertTrue(dashboardPage.isMetricCardVisible("Departments"), "Departments metric card should be visible");
    }

    @And("Monthly Salary card should be visible")
    public void monthly_salary_card_should_be_visible() {
        Assert.assertTrue(dashboardPage.isMetricCardVisible("Monthly Salary") || dashboardPage.isMetricCardVisible("Salary"), "Monthly Salary metric card should be visible");
    }

    // ==================== EMPLOYEES ====================
    @When("the user navigates to Employees page")
    public void the_user_navigates_to_employees_page() {
        employeePage.navigateToEmployees();
    }

    @Then("the Employee List page should load successfully")
    public void the_employee_list_page_should_load_successfully() {
        Assert.assertTrue(employeePage.isEmployeePageLoaded(), "Employee page heading should load");
    }

    @Given("the user is on the Employees page")
    public void the_user_is_on_the_employees_page() {
        employeePage.navigateToEmployees();
        Assert.assertTrue(employeePage.isEmployeePageLoaded(), "User must be on Employees page");
    }

    @Then("the employee table should have at least one record")
    public void the_employee_table_should_have_at_least_one_record() {
        Assert.assertTrue(employeePage.getVisibleEmployeeCount() > 0, "Employee list should not be empty");
    }

    @When("the user searches for employee {string}")
    public void the_user_searches_for_employee(String name) {
        employeePage.searchEmployee(name);
        wait.pause(1000); // wait for search API filtering
    }

    @Then("the employee {string} should appear in the table")
    public void the_employee_should_appear_in_the_table(String name) {
        Assert.assertTrue(employeePage.isEmployeeInList(name), "Employee " + name + " should be in the list");
    }

    @When("the user navigates to Add Employee page")
    public void the_user_navigates_to_add_employee_page() {
        employeePage.navigateToAddEmployee();
    }

    @When("the user fills the Add Employee form with:")
    public void the_user_fills_the_add_employee_form_with(DataTable dataTable) {
        Map<String, String> data = dataTable.asMap(String.class, String.class);
        employeePage.fillAddEmployeeForm(
                data.get("name"),
                data.get("email"),
                data.get("phone"),
                data.get("location"),
                data.get("department"),
                data.get("role"),
                data.get("manager"),
                data.get("salary"),
                data.get("skills")
        );
    }

    @When("the user submits the Add Employee form")
    public void the_user_submits_the_add_employee_form() {
        employeePage.submitAddEmployee();
    }

    @When("the user clicks Edit on the first matching employee")
    public void the_user_clicks_edit_on_the_first_matching_employee() {
        employeePage.clickEditFirstEmployee();
    }

    @When("the user closes the edit modal")
    public void the_user_closes_the_edit_modal() {
        employeePage.closeEditModal();
    }

    @When("the user clicks Delete on the first matching employee")
    public void the_user_clicks_delete_on_the_first_matching_employee() {
        employeePage.clickDeleteFirstEmployee();
    }

    @When("the user confirms the delete dialog")
    public void the_user_confirms_the_delete_dialog() {
        try {
            WebDriverWait alertWait = new WebDriverWait(driver, Duration.ofSeconds(4));
            Alert alert = alertWait.until(ExpectedConditions.alertIsPresent());
            alert.accept();
            wait.pause(1000);
        } catch (Exception e) {
            // No alert found
        }
    }

    @Then("the employee {string} should not appear in the table")
    public void the_employee_should_not_appear_in_the_table(String name) {
        Assert.assertFalse(employeePage.isEmployeeInList(name), "Employee " + name + " should not be displayed in the list");
        employeePage.clearSearch();
    }

    // ==================== DEPARTMENTS ====================
    @When("the user navigates to Departments page")
    public void the_user_navigates_to_departments_page() {
        departmentPage.navigateToDepartments();
    }

    @Then("the Departments page should load successfully")
    public void the_departments_page_should_load_successfully() {
        Assert.assertTrue(departmentPage.isPageLoaded(), "Departments page should be loaded");
    }

    @Given("the user is on the Departments page")
    public void the_user_is_on_the_departments_page() {
        departmentPage.navigateToDepartments();
        Assert.assertTrue(departmentPage.isPageLoaded(), "User must be on Departments page");
    }

    @Then("the Total Departments metric should be visible")
    public void the_total_departments_metric_should_be_visible() {
        Assert.assertTrue(departmentPage.isTotalDepartmentsVisible(), "Total Departments metric should be visible");
    }

    @Then("at least one department card should be displayed")
    public void at_least_one_department_card_should_be_displayed() {
        Assert.assertTrue(departmentPage.getDepartmentCardCount() > 0, "At least one department card should be visible");
    }

    // ==================== ATTENDANCE ====================
    @When("the user navigates to Attendance page")
    public void the_user_navigates_to_attendance_page() {
        attendancePage.navigateToAttendance();
    }

    @Then("the Attendance page should load successfully")
    public void the_attendance_page_should_load_successfully() {
        Assert.assertTrue(attendancePage.isPageLoaded(), "Attendance page should be loaded");
    }

    @Given("the user is on the Attendance page")
    public void the_user_is_on_the_attendance_page() {
        attendancePage.navigateToAttendance();
        Assert.assertTrue(attendancePage.isPageLoaded(), "User must be on Attendance page");
    }

    @Then("the Present metric should be visible")
    public void the_present_metric_should_be_visible() {
        Assert.assertTrue(attendancePage.isPresentMetricVisible(), "Present metric should be visible");
    }

    @And("the Absent metric should be visible")
    public void the_absent_metric_should_be_visible() {
        Assert.assertTrue(attendancePage.isAbsentMetricVisible(), "Absent metric should be visible");
    }

    @And("the Late metric should be visible")
    public void the_late_metric_should_be_visible() {
        Assert.assertTrue(attendancePage.isLateMetricVisible(), "Late metric should be visible");
    }

    @Then("the Daily Log section should be visible")
    public void the_daily_log_section_should_be_visible() {
        Assert.assertTrue(attendancePage.isDailyLogVisible(), "Daily Log section should be visible");
    }

    // ==================== PAYROLL ====================
    @When("the user navigates to Payroll page")
    public void the_user_navigates_to_payroll_page() {
        payrollPage.navigateToPayroll();
    }

    @Then("the Payroll page should load successfully")
    public void the_payroll_page_should_load_successfully() {
        Assert.assertTrue(payrollPage.isPageLoaded(), "Payroll page should be loaded");
    }

    @Given("the user is on the Payroll page")
    public void the_user_is_on_the_payroll_page() {
        payrollPage.navigateToPayroll();
        Assert.assertTrue(payrollPage.isPageLoaded(), "User must be on Payroll page");
    }

    @Then("the Total Payroll metric should be visible")
    public void the_total_payroll_metric_should_be_visible() {
        Assert.assertTrue(payrollPage.isTotalPayrollVisible(), "Total Payroll metric should be visible");
    }

    @Then("the payroll table should have at least one record")
    public void the_payroll_table_should_have_at_least_one_record() {
        Assert.assertTrue(payrollPage.getPayrollRowCount() > 0, "Payroll table should have records");
    }

    // ==================== REPORTS ====================
    @When("the user navigates to Reports page")
    public void the_user_navigates_to_reports_page() {
        reportsPage.navigateToReports();
    }

    @Then("the Reports page should load successfully")
    public void the_reports_page_should_load_successfully() {
        Assert.assertTrue(reportsPage.isPageLoaded(), "Reports page should be loaded");
    }

    @Given("the user is on the Reports page")
    public void the_user_is_on_the_reports_page() {
        reportsPage.navigateToReports();
        Assert.assertTrue(reportsPage.isPageLoaded(), "User must be on Reports page");
    }

    @Then("the reports charts should be visible")
    public void the_reports_charts_should_be_visible() {
        Assert.assertTrue(reportsPage.areChartsVisible(), "Reports charts should be visible");
    }

    // ==================== SETTINGS ====================
    @When("the user navigates to Settings page")
    public void the_user_navigates_to_settings_page() {
        settingsPage.navigateToSettings();
    }

    @Then("the Settings page should load successfully")
    public void the_settings_page_should_load_successfully() {
        Assert.assertTrue(settingsPage.isPageLoaded(), "Settings page should be loaded");
    }

    @Given("the user is on the Settings page")
    public void the_user_is_on_the_settings_page() {
        settingsPage.navigateToSettings();
        Assert.assertTrue(settingsPage.isPageLoaded(), "User must be on Settings page");
    }

    @Then("the profile section should be visible")
    public void the_profile_section_should_be_visible() {
        Assert.assertTrue(settingsPage.isProfileSectionVisible(), "Profile section should be visible");
    }

    // ==================== LOGOUT ====================
    @When("the user clicks the logout button")
    public void the_user_clicks_the_logout_button() {
        logoutPage.clickLogout();
    }

    @Then("the user should be redirected to the Login page")
    public void the_user_should_be_redirected_to_the_login_page() {
        Assert.assertTrue(logoutPage.isRedirectedToLoginPage(), "User should be redirected to Login page");
    }
}
