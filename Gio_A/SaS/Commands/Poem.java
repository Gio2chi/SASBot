package Gio_A.SaS.Commands;

import java.awt.Color;
import java.util.Random;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

public class Poem extends ListenerAdapter{
	
	public void onMessageReceived(MessageReceivedEvent event){
		String[] args = event.getMessage().getContentRaw().split("\\s+");
		
		Color[] colors = {new Color(0xa83232), new Color(0x32a836), new Color(0x32a875), new Color(0x329ea8), new Color(0x3263a8), new Color(0x3432a8), new Color(0x7332a8), new Color(0xe30b0b), new Color(0x7a0f0f), new Color(0xff9f05)};
		Random rand = new Random();
		
		if(args[0].equalsIgnoreCase(Gio_A.SaS.Main.prefix) && args[1].equalsIgnoreCase("p")) {
			String text = "";
			for(int i=3; i!=args.length; i++) {
				text+=args[i]+" ";
			}
			
			EmbedBuilder poem = new EmbedBuilder();
			poem.setColor(colors[(rand.nextInt(colors.length))]);
			poem.setFooter("by "+args[2]);
			poem.setDescription(text);
			
			event.getChannel().sendMessage(poem.build()).queue();
			poem.clear();
			
			event.getMessage().delete().queue();
		}
		
		
	}
	
}
