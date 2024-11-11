# Use an official Maven image as the builder
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
#Install Dependency
RUN mvn dependency:go-offline -B

# Copy the rest of the application files and build the application
COPY src /app/src

#Build the Project
RUN mvn package -DskipTests


# Use an official OpenJDK image to run the application
FROM openjdk:17-jdk-alpine

# Copy the built application from the builder
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port on which the app runs (usually 8080 for Spring Boot)
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]