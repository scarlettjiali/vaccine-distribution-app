package edu.gatech.seclass.vaccinefinderapp.ui.dashboard;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class VaccineMapViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public VaccineMapViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("Placeholder for Vaccine Map");
    }

    public LiveData<String> getText() {
        return mText;
    }
}