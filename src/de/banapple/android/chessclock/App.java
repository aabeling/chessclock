package de.banapple.android.chessclock;

import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.view.WindowManager;

public class App extends DroidGap 
{
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }
}