FROM openjdk:17-jdk-slim

# Install Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the pom.xml and install dependencies
COPY pom.xml /app/pom.xml
RUN mvn dependency:go-offline

# Copy the source code
COPY src /app/src

# Expose port 8080
EXPOSE 8080

#Run the Application
CMD ["mvn", "spring-boot:run"]
