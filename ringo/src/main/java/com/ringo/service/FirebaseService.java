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
        // google-services.json 파일 경로 지정
        FileInputStream serviceAccount =
            new FileInputStream("src/main/resources/ringo-8a740-firebase-adminsdk-9tgza-92abb8d4db.json");

        // Firebase 초기화 옵션 설정
        FirebaseOptions options = FirebaseOptions.builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .setDatabaseUrl("https://ringo-8a740-default-rtdb.asia-southeast1.firebasedatabase.app/")  // Firebase DB URL 입력
            .build();

        // Firebase 앱 초기화
        if (FirebaseApp.getApps().isEmpty()) {  // 앱이 초기화되지 않은 경우에만 실행
            FirebaseApp.initializeApp(options);
        }

        // Firebase Realtime Database에 접근
        FirebaseDatabase firebase = FirebaseDatabase.getInstance();
        // FirebaseAuth auth = FirebaseAuth.getInstance(); // 예시로 Firebase 인증을 사용할 수도 있음
    }
}
