<<<<<<< HEAD
# Mixte Corporation Website

## Adding Downloadable APK Files

### Current Setup
- The App Manager app card now links to `app-manager.apk`
- A placeholder APK file has been created for demonstration

### To Add Your Real APK File:

1. **Replace the placeholder file:**
   ```bash
   # Remove the placeholder
   rm app-manager.apk
   
   # Add your real APK file
   cp /path/to/your/real-app.apk app-manager.apk
   ```

2. **Ensure proper file permissions:**
   ```bash
   chmod 644 app-manager.apk
   ```

3. **Server configuration (if needed):**
   - Make sure your web server serves `.apk` files with the correct MIME type
   - For Apache, add to `.htaccess`:
     ```
     AddType application/vnd.android.package-archive .apk
     ```
   - For Nginx, add to config:
     ```
     location ~* \.apk$ {
         add_header Content-Type application/vnd.android.package-archive;
     }
     ```

### Download Features:
- **Direct download:** The `download` attribute forces download instead of navigation
- **File name:** Specifies the downloaded file name
- **Security:** Consider adding authentication for paid apps

### Testing:
1. Open the website in a browser
2. Click "Download APK →" on the App Manager card
3. The file should download immediately

### For Multiple APK Versions:
Create a versioned folder structure:
```
apps/
├── app-manager/
│   ├── v1.0/
│   │   └── app-manager-v1.0.apk
│   ├── v1.1/
│   │   └── app-manager-v1.1.apk
│   └── latest -> v1.1/
```

Then update links to point to specific versions.
=======
# Mixte
>>>>>>> c2c1deaa553690f4118b2e9086aad871aef49812
