package com.example.r3;

import android.view.View;
import android.view.ViewGroup;
import android.widget.AbsListView;
import android.widget.BaseAdapter;
import android.widget.Button;

import java.util.ArrayList;

public class CustomAdapter extends BaseAdapter {
    private ArrayList<Button> mButtons;
    private int mColumWidth, mColumnHeight;

    public CustomAdapter(ArrayList<Button> mButtons, int columnWidth, int columnHeight) {
        this.mButtons = mButtons;
        mColumWidth = 360;
        mColumnHeight = 550;
    }

    @Override
    public int getCount() {
        return mButtons.size();
    }

    @Override
    public Object getItem(int position) {
        return (Object) mButtons.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        Button button;

        if (convertView == null){
            button = mButtons.get(position);
        } else {
            button = (Button) convertView;
        }

        android.widget.AbsListView.LayoutParams params= new android.widget.AbsListView.LayoutParams(mColumWidth,mColumnHeight);
        button.setLayoutParams(params);

        return button;
    }
}
