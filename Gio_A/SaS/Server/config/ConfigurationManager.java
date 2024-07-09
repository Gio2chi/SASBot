package Gio_A.SaS.Server.config;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;

import Gio_A.SaS.Server.util.Json;

public class ConfigurationManager {
	
	private static ConfigurationManager myConfigurationManager;
	private static Configuration myCurrentConfiguration;
	
	private ConfigurationManager() {
	}
	
	public static ConfigurationManager getInstance() {
		if(myConfigurationManager==null) myConfigurationManager = new ConfigurationManager();
		return myConfigurationManager;
	}
	
	public void loadConfigurationFile(String filePath) {
		FileReader reader = null;
		
		try {
			reader = new FileReader(filePath);
		} catch(FileNotFoundException e) {
			throw new HttpConfigurationException(e);
		}
				
		StringBuffer sb = new StringBuffer();
		
		int i;
		try {
			while((i = reader.read())!= -1) {
				sb.append((char)i);
			}
		}catch(IOException e) {
			throw new HttpConfigurationException(e);
		}
		
		try {
			reader.close();
		}catch(IOException e) {
			
		}
		
		
		JsonNode conf = null;
		
		try {
			conf = Json.parse(sb.toString());
		}catch(IOException e) {
			throw new HttpConfigurationException("Error parsing the Configuration File", e);
		}
		
		try {
			myCurrentConfiguration = Json.fromJson(conf, Configuration.class);
		}catch(JsonProcessingException e) {
			throw new HttpConfigurationException("Error parsing the Configuration File, internal", e);
		}
		
		
		
	}
	
	public Configuration getCurrentConfiguration() {
		if(myCurrentConfiguration==null) {
			throw new HttpConfigurationException("No Current Configuration Set!");
		}
		return myCurrentConfiguration;
	}
	
}
