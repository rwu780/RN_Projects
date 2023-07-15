package com.androidbridgedemoapp.util;

import android.app.Activity;
import android.content.Intent;

public class DeviceUtil {

    public static void openGallery(Activity activity) {
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        activity.startActivityForResult(intent, 1);
    }
}
