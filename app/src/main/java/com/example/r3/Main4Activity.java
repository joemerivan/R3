package com.example.r3;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

public class Main4Activity extends AppCompatActivity {

    private static ImageView imgview;
    private int current_image;
    int[] images={R.drawable.chl1,R.drawable.chl2,R.drawable.chl3,R.drawable.finish};
    private static ImageView lastimage1;
    private int lastimage;

    ImageView img1,img2,img3;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main4);


        hideNavigationBar();
        imgGone1();





    }
    public void imgGone1(){
        img1 = findViewById(R.id.ch1);
        img1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                img1.setVisibility(View.GONE);
                img2.setVisibility(View.VISIBLE);
            }
        });
        img2 = findViewById(R.id.ch2);
        img2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                img2.setVisibility(View.GONE);
                img3.setVisibility(View.VISIBLE);
            }
        });
        img3 = findViewById(R.id.ch3);
        img3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Main4Activity.this, MainActivity.class);
                finish();
                startActivity(intent);
            }
        });

    }
    public void imgGone2(){

    }
    public void imgGone3(){

    }

    public void click1(){

        imgview = (ImageView) findViewById(R.id.ch1);
        imgview.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                    current_image++;
                    current_image=current_image % images.length;
                    imgview.setImageResource(images[current_image]);
            }
        });
    }
    private void hideNavigationBar(){
        this.getWindow().getDecorView()
                .setSystemUiVisibility(
                        View.SYSTEM_UI_FLAG_FULLSCREEN |
                                View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
                                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                                View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
                                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                );
    }


    public void nxt(){
        lastimage1 = findViewById(R.id.ch1);
        lastimage1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Main4Activity.this,MainActivity.class);
                finish();
                startActivity(intent);
            }
        });

    }

}
