package com.androidbridgedemoapp.rn;

import androidx.annotation.NonNull;

import com.androidbridgedemoapp.view.InfoView;
import com.androidbridgedemoapp.viewmanager.InfoViewGroupManager;
import com.androidbridgedemoapp.viewmanager.InfoViewManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.List;

public class DemoPackage implements ReactPackage {

    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext context) {
        List<NativeModule> modules = new ArrayList<>();

        // 原生模块注册
        modules.add(new AppModule(context));

        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {
        List<ViewManager> viewManagers = new ArrayList<>();

        viewManagers.add(new InfoViewManager());
        viewManagers.add(new InfoViewGroupManager());
        return viewManagers;
    }
}
