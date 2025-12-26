# ---- runtime ----
FROM eclipse-temurin:17-jre

WORKDIR /app

# CI에서 만든 jar를 복사 (파일명은 workflow에서 app.jar로 맞출 예정)
COPY app.jar /app/app.jar

# 필요하면 타임존
ENV TZ=Asia/Seoul

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
