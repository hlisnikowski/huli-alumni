package com.example.todoapp.utils;

import io.github.cdimascio.dotenv.Dotenv;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;

public class Util {

  private static Dotenv env = null;
  private final static HashMap<String, String> dotenv = new HashMap<>();

  static {
    try {
      env = Dotenv
          .configure()
          .directory("./sc/main/assets")
          .filename("env")
          .load();
    } catch (RuntimeException e){
      System.out.println("Couldn't found env file. Creating custom env.");
      try {
        List<String> lines = Files.readAllLines(Path.of("./src/main/assets/env"));
        for(String line : lines){
          String[] keyPair = line.split("=");
          dotenv.put(keyPair[0],keyPair[1]);
        }
      } catch (IOException ex) {
        throw new RuntimeException(ex);
      }
    }
  }

  private static Util singleton = null;
  public static Util Singleton()
  {
    if (singleton == null)
      singleton = new Util();
    return singleton;
  }

  public String env(String value){
    return env == null ? dotenv.getOrDefault(value,"") : env.get(value);
  }
}
