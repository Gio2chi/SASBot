package Gio_A.SaS;

import java.io.IOException;

import javax.security.auth.login.LoginException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import Gio_A.SaS.Commands.Poem;
import Gio_A.SaS.Server.config.Configuration;
import Gio_A.SaS.Server.config.ConfigurationManager;
import Gio_A.SaS.Server.core.ServerListenerThread;
import net.dv8tion.jda.api.AccountType;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.OnlineStatus;
import net.dv8tion.jda.api.entities.Activity;


public class Main{
	public static JDA jda;
	public static String prefix = "/sas";
	
	private final static Logger LOGGER = LoggerFactory.getLogger(Main.class);
	
	@SuppressWarnings({ "deprecation", "static-access" })
	public static void main(String[] args) throws LoginException, InterruptedException{
		
		jda = new JDABuilder(AccountType.BOT).createDefault(TOKEN).build();
		jda.getPresence().setStatus(OnlineStatus.ONLINE);
		jda.getPresence().setActivity(Activity.listening(" poems"));
		
		jda.addEventListener(new Poem());
		//jda.addEventListener(new MakeMeAdmin());*/
		
		
		LOGGER.info("Server starting...");
		
		ConfigurationManager.getInstance().loadConfigurationFile("src/Gio_A/SaS/Server/http.json");
		Configuration conf = ConfigurationManager.getInstance().getCurrentConfiguration();
		
		
		LOGGER.info("Using Port: "+conf.getPort());
		LOGGER.info("Using Webroot: "+conf.getWebroot());
		
		ServerListenerThread sLT;
		try {
			sLT = new ServerListenerThread(conf.getPort(), conf.getWebroot());
			sLT.start();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
	}
}

