package com.androidbridgedemoapp.viewmanager;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.androidbridgedemoapp.view.InfoView;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class InfoViewManager extends SimpleViewManager<InfoView> {
    @NonNull
    @Override
    public String getName() {
        return "NativeInfoView";
    }

    @NonNull
    @Override
    protected InfoView createViewInstance(@NonNull ThemedReactContext context) {
        return new InfoView(context);
    }

    @ReactProp(name="avatar")
    public void setAvatar(InfoView view, String url) {
        view.setAvatar(url);
    }

    @ReactProp(name="name")
    public void setName(InfoView view, String name) {
        view.setNameTxt(name);
    }

    @ReactProp(name="desc")
    public void setDesc(InfoView view, String desc) {
        view.setDescTxt(desc);
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("setShape", SET_SHAPE_CODE);
    }

    @Override
    public void receiveCommand(@NonNull InfoView root, String commandId, @Nullable ReadableArray args) {
        int command = Integer.parseInt(commandId);
        if (command == SET_SHAPE_CODE) {
            if (args != null && args.size() > 0) {
                String shape = args.getString(0);
                root.setShape(shape);
            }


        } else {
            super.receiveCommand(root, commandId, args);
        }

    }

    public static final int SET_SHAPE_CODE = 100;

    //    @Nullable
//    @Override
//    public Map getExportedCustomBubblingEventTypeConstants() {
//        return MapBuilder.builder()
//                .put("onShapeChanged",
//                        MapBuilder.of(
//                                "phasedRegistrationNames",
//                                MapBuilder.of(
//                                        "bubbled",
//                                        "onShapeChanged"))).build();
//    }
}
