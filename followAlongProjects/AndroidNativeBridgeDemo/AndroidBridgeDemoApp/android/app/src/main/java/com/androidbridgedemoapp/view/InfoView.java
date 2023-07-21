package com.androidbridgedemoapp.view;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.androidbridgedemoapp.R;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.resource.bitmap.CircleCrop;
import com.bumptech.glide.load.resource.bitmap.RoundedCorners;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class InfoView extends LinearLayout implements View.OnClickListener {

    ImageView avatarImg;
    TextView nameTxt;
    TextView descTxt;
    TextView changeButton;

    private String shape = "circle"; // circle, round
    private String url = "";

    public InfoView(Context context) {
        super(context);
        initView();
    }

    private void initView() {
        View view = LayoutInflater.from(getContext()).inflate(R.layout.layout_info_view, null);
        LayoutParams lp = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);

        avatarImg = view.findViewById(R.id.img_avatar);
        nameTxt = view.findViewById(R.id.txt_name);
        descTxt = view.findViewById(R.id.txt_desc);
        changeButton = view.findViewById(R.id.changeButton);
        changeButton.setOnClickListener(this);

        this.addView(view, lp);
    }

    public void setAvatar(String url) {
        this.url = url;
        Glide.with(this)
                .load(url)
                .transform(new CircleCrop())
                .placeholder(R.drawable.avatar)
                .into(avatarImg);
    }

    public void setNameTxt(String name) {
        nameTxt.setText(name);
    }

    public void setDescTxt(String desc) {
        descTxt.setText(desc);
    }

    private void sendEvent(ReactContext reactContext, String eventName, WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);

    }

    @Override
    public void onClick(View v) {
        if (this.shape.equals("circle")) {
            this.shape = "round";
        } else {
            this.shape = "circle";
        }
        Glide.with(this)
                .load(url)
                .placeholder(R.drawable.avatar)
                .transform(this.shape.equals("circle") ? new CircleCrop() : new RoundedCorners(40))
                .into(avatarImg);

        WritableMap event = Arguments.createMap();
        event.putString("shape", this.shape);


        ReactContext cxt = (ReactContext) getContext();
        sendEvent(cxt, "onShapeChanged", event);
//        cxt.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "onShapeChanged:", event);
    }

    public void setShape(String shape) {
        this.shape = shape;
        Glide.with(this)
                .load(url)
                .transform(this.shape.equals("circle") ? new CircleCrop() : new RoundedCorners(40))
                .placeholder(R.drawable.avatar)
                .into(avatarImg);


    }
}
