package edu.gatech.seclass.vaccinefinderapp.ui.home;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class CovidDashboardViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public CovidDashboardViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("Placeholder for Covid 19 cases dashboard");
    }

    public LiveData<String> getText() {
        return mText;
    }
}