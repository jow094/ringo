package com.ringo.service;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.auth.FirebaseAuth;
import com.google.auth.oauth2.GoogleCredentials;

import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.stereotype.Service;

@Service
public class FirebaseService {
	
    public void initializeFirebase() throws IOException {
        // google-services.json ���� ��� ����
        FileInputStream serviceAccount =
            new FileInputStream("src/main/resources/ringo-8a740-firebase-adminsdk-9tgza-92abb8d4db.json");

        // Firebase �ʱ�ȭ �ɼ� ����
        FirebaseOptions options = FirebaseOptions.builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .setDatabaseUrl("https://ringo-8a740-default-rtdb.asia-southeast1.firebasedatabase.app/")  // Firebase DB URL �Է�
            .build();

        // Firebase �� �ʱ�ȭ
        if (FirebaseApp.getApps().isEmpty()) {  // ���� �ʱ�ȭ���� ���� ��쿡�� ����
            FirebaseApp.initializeApp(options);
        }

        // Firebase Realtime Database�� ����
        FirebaseDatabase firebase = FirebaseDatabase.getInstance();
        // FirebaseAuth auth = FirebaseAuth.getInstance(); // ���÷� Firebase ������ ����� ���� ����
    }
}
