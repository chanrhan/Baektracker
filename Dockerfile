# ---- runtime ----
FROM eclipse-temurin:17-jre

WORKDIR /app

# CI에서 만든 jar를 복사 (파일명은 workflow에서 app.jar로 맞출 예정)
COPY build/libs/baektracker-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
