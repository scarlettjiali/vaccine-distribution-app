package edu.gatech.seclass.vaccinefinderapp.ui.notifications;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class NotificationsViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public NotificationsViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("Placeholder for notification/prediction");
    }

    public LiveData<String> getText() {
        return mText;
    }
}