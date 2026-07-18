package com.employee.automation.utils;

import com.employee.automation.config.ConfigReader;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ScreenshotUtility {

    public static String captureScreenshot(WebDriver driver, String testName) {
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String fileName = testName + "_" + timestamp + ".png";
        String filePath = ConfigReader.SCREENSHOTS_DIR + fileName;

        try {
            File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            File dest = new File(filePath);
            dest.getParentFile().mkdirs();
            FileUtils.copyFile(src, dest);
            System.out.println("[SCREENSHOT] Saved: " + filePath);
            return dest.getAbsolutePath();
        } catch (IOException e) {
            System.err.println("[SCREENSHOT] Failed to capture: " + e.getMessage());
            return null;
        }
    }
}
