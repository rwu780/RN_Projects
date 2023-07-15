package com.androidbridgedemoapp.rn;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.androidbridgedemoapp.BuildConfig;
import com.androidbridgedemoapp.util.DeviceUtil;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class AppModule extends ReactContextBaseJavaModule {

    public AppModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        // 直接注入JS 层，不需要调用
        Map<String, Object> map = new HashMap<>();

        map.put("versionName", BuildConfig.VERSION_NAME);
        map.put("versionCode", BuildConfig.VERSION_CODE);

        return map;
    }

    @NonNull
    @Override
    public String getName() {
        return "App";
    }

    @ReactMethod
    public void openGallery() {
        if (getCurrentActivity() == null) {
            return;
        }

        DeviceUtil.openGallery(getCurrentActivity());
    }

    @ReactMethod
    public void getVersionName(Promise promise) {
        String versionName = BuildConfig.VERSION_NAME;
        if (versionName == null) {
            promise.reject(new Throwable("Failed to get version"));
        } else {
            promise.resolve(versionName);
        }
    }
}
