package Gio_A.SaS.Server.core;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HttpConnectionWorkerThread extends Thread{
	
	private Socket socket;
	
	private final static Logger LOGGER = LoggerFactory.getLogger(HttpConnectionWorkerThread.class);
	
	public HttpConnectionWorkerThread(Socket socket) {
		this.socket = socket;
	}
	
	@Override
	public void run() {
		
		InputStream inputStream = null;
		OutputStream outputStream = null;
		
		try {
			inputStream = socket.getInputStream();
			outputStream = socket.getOutputStream();
			String html = "<html><head><title>Java HTTP Server</title></head><body><p>Hello World</p></body></html>";
			final String CRLF = "\n\r"; //13, 10
			String response = "HTTP/1.1 200 OK" + CRLF + //Status_Line : HTTP_VERSION RESPONSE_CODE RESPONSE_MESSAGE
					"ContentLength: " + html.getBytes().length + CRLF + //HEADER
					CRLF + html + CRLF + CRLF;
			
			// TODO we would write
			outputStream.write(response.getBytes());
			
			
			
			LOGGER.info(" * Connection Prossessing Finished.");
			
		} catch (IOException e) {
			
			LOGGER.error("Problems with communication", e);
						
		} finally {
			try {
				if(outputStream!=null) {
					outputStream.close();
				}
			} catch (IOException e) {}
			try {
				if(inputStream!=null) {
					inputStream.close();
				}
			} catch (IOException e) {}
			try {
				if(socket!=null) {
					socket.close();
				}
			} catch (IOException e) {}
		}
	}
	
}
